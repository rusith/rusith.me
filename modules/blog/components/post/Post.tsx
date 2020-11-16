import Sidebar from "modules/app/components/sidebar"
import { IPost } from "modules/blog/models/IPost"
import styles from "./Post.module.scss"
import React from "react"
import Link from "next/link"
import { url } from "consts"
import IPostLink from "modules/blog/models/IPostLink"
import { DiscussionEmbed } from 'disqus-react'

type Props = {
 post: IPost,
 topTags: string[],
 relatedPosts: IPostLink[]
}

const Post: React.FC<Props> = ({ post, topTags, relatedPosts }) => {
    return (
        <>
            <script async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_CHTML"></script>
            <Sidebar topTags={topTags} />
            <div className={styles.content}>
                <div>
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
                {relatedPosts.length && (
                    <div className="related">
                        <h2>Related Posts</h2>
                        <ul className="related-posts">
                            {relatedPosts.map(rp => (
                                <li key={rp.fullUrl}>
                                    <h3>
                                        <Link href={rp.fullUrl}>
                                            <a href="{{ site.url }}{{ post.url }}">
                                                {rp.title}
                                                <small>{rp.date}</small>
                                            </a>
                                        </Link>
                                    </h3>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <DiscussionEmbed
                    shortname='rusithme'
                    config={
                        {
                            url: post.fullUrl,
                            identifier: post.path,
                            title: post.title,
                            language: 'en-US'
                        }
                    }
                />
            </div>
        </>
    )
}



export default Post