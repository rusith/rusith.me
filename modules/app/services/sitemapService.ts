import { url } from "consts"
import { getAllPosts, getAvailablePageCount } from "modules/blog/services/postService"
import { SitemapStream, streamToPromise } from "sitemap"
import { Readable } from "stream"
import _ from "lodash"
import { writeFile } from "utils/file"

export async function createSitemap() {
  let paths = []
  const posts = await getAllPosts()
  const allPages = await getAvailablePageCount()

  posts.forEach((post) => {
    paths.push({ url: post.path + "/", lastmod: post.dateModified })
    if (post.oldPath) {
      paths.push({ url: post.oldPath + "/", lastmod: post.dateModified })
    }
  })

  paths = [...paths, ...["/", "/about/"].map((c) => ({ url: c } as any))]

  if (allPages > 1) {
    _.times(allPages, (n) => {
      if (n > 0) {
        paths.push({ url: `/page${n + 1}/` })
      }
    })
  }

  const stream = new SitemapStream({
    hostname: url
  })

  const sitemap = await streamToPromise(Readable.from(paths).pipe(stream))
  await writeFile("./sitemap.xml", sitemap.toString())
}
