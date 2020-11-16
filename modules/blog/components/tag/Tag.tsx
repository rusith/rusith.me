import Sidebar from "modules/app/components/sidebar"
import IPostLink from "modules/blog/models/IPostLink"
import styles from "./Tag.module.scss"
import React from "react"
import Link from "next/link"
import { url } from "consts"

type Props = {
    tag: string
    posts: IPostLink[]
    tags: string[],
    topTags: string[]
}

const Tag: React.FC<Props> = ({ tag, posts, topTags, tags }) => {
    return (
        <div className={styles.content}>
            <Sidebar topTags={topTags}/>
            <div>
                <h1>Tag: {tag}</h1>
                <ul>
                    {posts.map(post => (
                        <li>
                            <Link prefetch={false} href={post.fullUrl}>
                                <a>{post.title}</a>
                            </Link>
                            ({post.date}) <br/>
                            {post.description}
                        </li>
                    ))}
                </ul>
            </div>


            <h2>Archive</h2>
            <div className={styles.tagList}>
                {tags.map(t => (
                    <Link href={url + "/tag/" + t} prefetch={false} key={t}>
                        <a>
                            <code className="highligher-rouge">
                                {t}
                            </code>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Tag