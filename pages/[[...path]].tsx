import React from "react"
import Home from "modules/home/components/home"
import { getAllPostPaths, getAvailablePageCount, getLatestPosts, getPostForPath } from "modules/blog/services/postService"
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
    return {
        props: {
            post,
            page: "Post"
        }
    }
}

async function getHomeProps() {
  const top3Tags = await getTopTags(3)
  const latestPosts = await getLatestPosts()

  return {
    props: {
      topTags: top3Tags,
      latestPosts,
      page: "Home"
    }
  }
}

export async function getStaticProps(a) {
  const path = coalesce(() => (a.params.path as string[]).join('/'), '/')

  if(path === '/') {
    return getHomeProps()
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
      pages.push(`/page${n}`)
    })
  }

  return {
    paths: pages,
    fallback: false
  }
}

export default HomePage

