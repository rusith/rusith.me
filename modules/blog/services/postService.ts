import { IPost } from "../models/IPost"
import _ from "lodash"
import { coalesce } from "utils/common"
import { isPord } from "consts"
import { readAllPosts, readPost } from "./postrReader"
import { fileExists, readFile, writeFile } from "utils/file"
import IPostLink from "../models/IPostLink"
import { removeEndingSlash } from "utils/path"

export async function getAllPosts(): Promise<IPost[]> {
  const cache = "./all_posts_cache.json"
  let allPosts = []
  if (fileExists(cache)) {
    allPosts = JSON.parse(await readFile(cache)) as IPost[]
    if (allPosts.length) {
      return allPosts
    }
  }
  const ap = _.orderBy(
    await readAllPosts(),
    (post: IPost) => {
      return new Date(post.dateCreated)
    },
    ["desc"]
  )

  await writeFile(cache, JSON.stringify(ap))
  return ap
}

export async function getAllPostPaths() {
  const allPosts = await getAllPosts()
  const paths = []
  allPosts.forEach((p) => {
    paths.push(p.path)
    if (p.oldPath) {
      paths.push(p.oldPath)
    }
  })

  return paths
}

export async function getPostForPath(p: string): Promise<IPost> {
  const posts = await getAllPosts()
  let path = removeEndingSlash(p)

  if (!path.startsWith("/")) {
    path = "/" + p
  }

  const post = posts.find(
    (p) =>
      p.path.toLowerCase() === path.toLowerCase() ||
      coalesce(() => p.oldPath.toLowerCase() === path.toLowerCase(), false)
  )
  if (post && !isPord) {
    return readPost(post)
  }

  return post
}

export async function getLatestPosts(page = 1, pageSize = 10) {
  const posts = await getAllPosts()
  const skip = page === 1 ? 0 : (page - 1) * pageSize

  const postToReturn = _.take(_.drop(posts, skip), pageSize).map(toPostLink)
  return postToReturn
}

export async function getAvailablePageCount(pageSize = 10) {
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

export async function getRelatedPosts(post: IPost): Promise<IPostLink[]> {
  const tags = post.tags
  const allPosts = await getAllPosts()
  const posts = []
  allPosts
    .filter((p) => p.path !== post.path)
    .forEach((p) => {
      const info = { post: p, count: 0 }
      p.tags.forEach((t) => {
        tags.forEach((tt) => {
          if (tt.toLowerCase() === t.toLowerCase()) {
            info.count++
          }
        })
      })

      if (info.count > 0) {
        posts.push(info)
      }
    })

  return _.take(_.orderBy(posts, ["count"], ["desc"]), 3).map((p) => toPostLink(p.post))
}

export async function getAllPostsForHomePage() {
  const all = await getAllPosts()
  return all.map((p) => {
    return {
      ...toPostLink(p),
      about: p.about,
      isNonTech: p.isNonTech || false,
      banner: p.banner || null,
      datePublished: p.datePublished || null,
      dateCreated: p.dateCreated || null,
      dateModified: p.dateModified || null
    }
  })
}

export function toPostLink(post: IPost): IPostLink {
  return {
    title: post.title,
    tags: post.tags,
    fullUrl: post.fullUrl,
    date: post.dateCreatedFormatted,
    description: post.description,
    banner: post.banner || null
  }
}
