import { FileInfo, getFilesInDirectory, readFile } from "utils/file"
import frontMatter from "front-matter"
import showdown from "showdown"
import { IPostAttributes } from "../models/IPostAttributes"
import { IPost } from "../models/IPost"
import _ from "lodash"
import { coalesce } from "utils/common"

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
export async function getAllPosts() {
    if (allPosts.length) {
        return allPosts
    }
    return allPosts = _.orderBy(await readAllPosts(), 'dateCreated', 'desc')
}

export async function getAllPostPaths() {
    const allPosts = await getAllPosts()
    const paths = []
    allPosts.forEach(p => {
        paths.push("/blog" + p.path)
        if (p.oldPath) {
            paths.push(p.oldPath)
        }
    })

    return paths
}

export async function getPostForPath(p: string): Promise<IPost> {
    const posts = await getAllPosts()
    let path = p

    if (!path.startsWith("/")) {
        path = "/" + p
    }

    if (path.startsWith("/blog/")) {
        path = p.substr(4)
    }

    console.log("SP", path)

    return posts.find(p => p.path.toLowerCase() === path.toLowerCase() || coalesce(() => p.oldPath.toLowerCase() === path.toLowerCase(), false))
}

export async function getLatestPosts(page = 1, pageSize = 10) {
    const posts = await getAllPosts()
    const skip = page === 1 ? 0 : (page - 1) * pageSize

    return _.take(_.drop(posts, skip), pageSize)
}

export async function getAvailablePageCount(pageSize =  10) {
    const posts = await getAllPosts()
    const count = posts.length
    if (count <= pageSize) {
        return 1
    }
    const base = parseInt(`${posts.length / pageSize}`, 10)
    if (posts.length % pageSize > 0) {
        return base + 1
    }
    return base
}


