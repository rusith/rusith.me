import React from "react"
import Home from "modules/home/components/home"
import { getTopTags } from "modules/blog/services/tagsService"
import { getLatestPosts } from "modules/blog/services/postService"

const HomePage: React.FC = (props: any) => {
  return (
      <Home {...props} />
  )
}

export async function getStaticProps() {
  const top3Tags = await getTopTags(3)
  const latestPosts = await getLatestPosts()
  return {
    props: {
      topTags: top3Tags,
      latestPosts
    }
  }
}

export default HomePage

