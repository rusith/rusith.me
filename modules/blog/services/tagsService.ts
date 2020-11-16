import { getAllPosts, toPostLink } from "./postService"
import _ from "lodash"


function compareTag(tag: string, tag1: string) {
    return tag.toLowerCase() === tag1.toLowerCase()
}

async function rateTags() {
    const allPosts = await getAllPosts()
    const tags: { tag: string, count: number }[] = []
    allPosts.forEach(p => {
        p.tags.forEach(t => {
            const found = tags.find(tg => t === tg.tag)
            if (found) {
                found.count += 1
            } else {
                tags.push({ tag: t, count: 1})
            }
        })
    })

    return _.orderBy(tags, 'count', 'desc')
}

export async function getTopTags(top: number) {
    const tags = await rateTags()

    return _.take(tags, top).map(t => t.tag)
}

export async function getPostsForTag(tag: string) {
    const allPosts = await getAllPosts()
    return allPosts.filter(p => p.tags.some(t => compareTag(t, tag))).map(toPostLink)
}

export async function getAllTags(except: string) {
    const tags =  await rateTags()
    return tags.filter(t =>  !compareTag(t.tag, except)).map(t => t.tag)
}