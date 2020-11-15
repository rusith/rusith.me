import { FileInfo, getFilesInDirectory, readFile } from "utils/file"
import frontMatter from "front-matter"
import showdown from "showdown"
import { IPostAttributes } from "../models/IPostAttributes"
import { IPost } from "../models/IPost"
import _ from "lodash"
import { coalesce } from "utils/common"
import showdownHighlight from "showdown-highlight"
import { url } from "consts"
import {DateTime} from "luxon"

function processAttributes(attributes: any): IPostAttributes {
    const tags = attributes.tags as string
    const path = "/blog" + attributes.path

    const dateCreated = DateTime.fromJSDate(attributes.dateCreated)

    return {
        ...attributes,
        tags:  tags.split(' ').map(a => a.trim()),
        dateCreated: attributes.dateCreated.toString(),
        dateCreatedFormatted: dateCreated.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY),
        dateModified: attributes.dateModified?.toString(),
        datePublished: attributes.datePublished?.toString(),
        fullUrl: new URL(path, url).href,
        path
    }
}

function processContent(attr: IPostAttributes, content: string): string {
    const values = {
        "page_banner_full_path": attr.banner ? new URL(attr.banner, url).href : '',
        "base_url": url,
    }

    let result = content

    for (const key of Object.keys(values)) {
        result = result.split(`$$${key}`).join(values[key])
    }

    return result
}

async function readPost(file: FileInfo): Promise<IPost> {
    const fileContent = await readFile(file.fullPath)
    const frontParsed = frontMatter(fileContent)
    const postBody = frontParsed.body
    const attributes = processAttributes(frontParsed.attributes)

    const showdownConverter = new showdown.Converter({
        extensions: [showdownHighlight],
    })
    const parsedContent =  showdownConverter.makeHtml(processContent(attributes, postBody))

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
    const ap = _.orderBy(await readAllPosts(), (post: IPost) => {
        return new Date(post.dateCreated)
    }, ['desc'])

    allPosts = ap
    return allPosts

}

export async function getAllPostPaths() {
    const allPosts = await getAllPosts()
    const paths = []
    allPosts.forEach(p => {
        paths.push(p.path)
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


