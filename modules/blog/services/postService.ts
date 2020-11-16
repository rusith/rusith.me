import { IPost } from "../models/IPost"
import _ from "lodash"
import { coalesce } from "utils/common"
import { isPord } from "consts"
import { readAllPosts, readPost } from "./postrReader"
import { fileExists, readFile, writeFile } from "utils/file"


export async function getAllPosts() {
    const cache = "./all_posts_cache.json"
    let allPosts = []
    if (fileExists(cache)) {
        allPosts = JSON.parse(await readFile(cache))
        if (allPosts.length) {
            return allPosts
        }
    }
    const ap = _.orderBy(await readAllPosts(), (post: IPost) => {
        return new Date(post.dateCreated)
    }, ['desc'])

    await writeFile(cache, JSON.stringify(ap))
    return ap
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

    const post = posts.find(p => p.path.toLowerCase() === path.toLowerCase() || coalesce(() => p.oldPath.toLowerCase() === path.toLowerCase(), false))
    if (post && !isPord) {
        return readPost(post)
    }

    return post
}

export async function getLatestPosts(page = 1, pageSize = 10) {
    const posts = await getAllPosts()
    const skip = page === 1 ? 0 : (page - 1) * pageSize

    const postToReturn = _.take(_.drop(posts, skip), pageSize)
    return postToReturn
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


