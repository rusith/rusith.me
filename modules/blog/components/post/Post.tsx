import Sidebar from "modules/app/components/sidebar"
import { IPost } from "modules/blog/models/IPost"
import styles from "./Post.module.scss"
import React from "react"
import Link from "next/link"
import { url } from "consts"

const Post: React.FC<{ post: IPost, topTags: string[]}> = ({ post, topTags }) => {
    return (
        <>
            <Sidebar topTags={topTags} />
            <div className={styles.content}>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.tags}>
                    {post.tags.map(tag => (
                        <Link href={url + "/tag/" + tag} key={tag} prefetch={false}>
                            <a className={styles.tag}>{tag}</a>
                        </Link>
                    ))}
                </div>
                <span className={styles.date}>{post.dateCreatedFormatted}</span>
                <div dangerouslySetInnerHTML={{__html: post.parsedContent }}/>
            </div>
        </>
    )
}



export default Post