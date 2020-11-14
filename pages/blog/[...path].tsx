import { IPost } from "modules/blog/models/IPost"
import { getAllPostPaths, getPostForPath } from "modules/blog/services/postService"
import React from "react"

const PostPage: React.FC<{ post: IPost}> = ({ post }) => {
    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: post.parsedContent }}/>
        </div>
    )
}

export async function getStaticProps(data: any) {
    const post = await getPostForPath("/" + data.params.path[0])
    return {
        props: {
            post
        }
    }
}

export async function getStaticPaths() {
    const paths = await getAllPostPaths()

    return {
        paths: paths.map(p => "/blog" + p),
        fallback: false
    }
}

export default PostPage