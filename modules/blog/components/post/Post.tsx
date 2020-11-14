import { IPost } from "modules/blog/models/IPost"
import React from "react"

const Post: React.FC<{ post: IPost}> = ({ post }) => {
    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: post.parsedContent }}/>
        </div>
    )
}



export default Post