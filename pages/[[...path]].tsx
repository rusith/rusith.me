import React from "react"
import Home from "modules/home/components/home"
import { getAllPostPaths, getAvailablePageCount, getLatestPosts, getPostForPath, getRelatedPosts } from "modules/blog/services/postService"
import _ from "lodash"
import { coalesce } from "utils/common"
import { getTopTags } from "modules/blog/services/tagsService"
import { IPost } from "modules/blog/models/IPost"
import Post from "modules/blog/components/post"

const HomePage: React.FC = (props: any) => {
  if (props.page === "Home") {
    return (<Home {...props} />)
  } else if (props.page === "Post") {
    return (<Post {...props} />)
  } else {
    return null
  }
}

async function getPostProps(post: IPost) {
    const top3Tags = await getTopTags(3)
    const relatedPosts = await getRelatedPosts(post)
    return {
        props: {
            post,
            page: "Post",
            topTags: top3Tags,
            relatedPosts
        }
    }
}

async function getHomeProps(page = 1) {
  const top3Tags = await getTopTags(3)
  const latestPosts = await getLatestPosts(page)
  const pageCount = await getAvailablePageCount()

  let hasNextPage = false
  let hasPreviousPage = false

  if (page < pageCount) {
    hasNextPage = true
  }

  if (page > 1) {
    hasPreviousPage = true
  }

  return {
    props: {
      topTags: top3Tags,
      latestPosts,
      page: "Home",
      hasNextPage,
      hasPreviousPage,
      pageNumber: page
    }
  }
}

export async function getStaticProps(a) {
  const path = coalesce(() => (a.params.path as string[]).join('/'), '/')

  if(path === '/') {
    return getHomeProps()
  }

  if (path.toLowerCase().match(/page\d/)) {
    const pageNumber = path.substr(4)
    return getHomeProps(parseInt(pageNumber, 10))
  }

  const post = await getPostForPath(path)
  if (post) {
    return getPostProps(post)
  }
}


export async function getStaticPaths() {
  const postPaths = await getAllPostPaths()
  const allPages = await getAvailablePageCount()
  const pages = ['/']

  postPaths.forEach(pp => {
    pages.push(pp)
  })

  if (allPages > 1) {
    _.times(allPages, n => {
      if (n > 0) {
        pages.push(`/page${n + 1}`)
      }
    })
  }

  return {
    paths: pages,
    fallback: false
  }
}

export default HomePage

