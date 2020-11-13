import { FileInfo, getFilesInDirectory, readFile } from "utils/file"
import frontMatter from "front-matter"
import showdown from "showdown"
import { IPostAttributes } from "../models/IPostAttributes"
import { IPost } from "../models/IPost"

function processAttributes(attributes: any): IPostAttributes {
    const tags = attributes.tags as string

    return {
        ...attributes,
        tags:  tags.split(' ').map(a => a.trim()),
        dateCreated: attributes.dateCreated.toString(),
        dateModified: attributes.dateModified?.toString(),
        datePublished: attributes.datePublished?.toString(),
    }
}

async function readPost(file: FileInfo): Promise<IPost> {
    const fileContent = await readFile(file.fullPath)
    const frontParsed = frontMatter(fileContent)
    const postBody = frontParsed.body
    const attributes = processAttributes(frontParsed.attributes)

    const showdownConverter = new showdown.Converter()
    const parsedContent = showdownConverter.makeHtml(postBody)

    return {
        fileContent,
        parsedContent,
        ...file,
        ...attributes,
    }
}

async function readAllPosts() {
    const allPostFiles =  await getFilesInDirectory("modules/blog/posts")
    return await Promise.all(allPostFiles.map(readPost))
}

let allPosts: IPost[] = []
async function getAllPosts() {
    if (allPosts.length) {
        return allPosts
    }
    return allPosts = await readAllPosts()
}

export async function getAllPostPaths() {
    const allPosts = await getAllPosts()
    return allPosts.map(p => p.path)
}

export async function getPostForPath(path: string): Promise<IPost> {
    const posts = await getAllPosts()
    return posts.find(p => p.path.toLowerCase() === path.toLowerCase())
}


