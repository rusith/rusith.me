import React from "react"
import Sidebar from "modules/app/components/sidebar"
import styles from "./Home.module.scss"
import { IPost } from "modules/blog/models/IPost"
import Link from "next/link"
import { url } from "consts"

const Home: React.FC<{ topTags: string[], latestPosts: IPost[], hasNextPage: boolean, hasPreviousPage: boolean, pageNumber: number}> = ({ topTags, latestPosts, hasNextPage, hasPreviousPage, pageNumber }) => {

    const getPageLink = (pageNumber: number) => {
        if (pageNumber === 1) {
            return url
        }

        return `${url}/page${pageNumber}`
    }
    return (
        <>
            <Sidebar topTags={topTags} />
            <div className={styles.content}>
                <div>
                    {latestPosts.map(p => (
                        <div className={styles.post} key={p.path}>
                            <p className={styles.postTitle}>
                                <Link href={p.fullUrl}>
                                    <a>
                                        <span>{p.title}</span>
                                    </a>
                                </Link>
                            </p>
                            <div className={styles.tags}>
                                {p.tags.map(tag => (
                                    <Link href={url + "/tag/" + tag} key={tag}>
                                        <a className={styles.tag}>{tag}</a>
                                    </Link>
                                ))}
                            </div>
                            <span className={styles.postDate}>{p.dateCreatedFormatted}</span>
                            {p.description}
                        </div>
                    ))}
                </div>

                <div>
                    {hasPreviousPage && (
                        <Link href={getPageLink(pageNumber - 1)}>
                            <a className={styles.paginationItem}>Newer</a>
                        </Link>
                    )}

                    {!hasPreviousPage && (
                        <span className={styles.paginationItem}>Newer</span>
                    )}

                    {hasNextPage && (
                        <Link href={getPageLink(pageNumber + 1)}>
                            <a className={styles.paginationItem}>Older</a>
                        </Link>
                    )}
                    {!hasNextPage && (
                        <span className={styles.paginationItem}>Older</span>
                    )}

                </div>
            </div>
        </>
    )
}

export default Home