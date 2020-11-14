import { getAllPosts } from "./postService"



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

    tags.sort((a, b) => {
        return a.count - b.count
    })

    return tags.slice(0, top).map(t => t.tag)
}