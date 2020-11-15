import { getAllPosts } from "./postService"
import _ from "lodash"



export async function getTopTags(top: number) {
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

    return _.take(_.orderBy(tags, 'count', 'desc'), top).map(t => t.tag)
}