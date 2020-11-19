import React from "react"
import Sidebar from "modules/app/components/sidebar"
import styles from "./Home.module.scss"
import { IPost } from "modules/blog/models/IPost"
import Link from "next/link"
import { url } from "consts"
import comp from "styles/comp.module.scss"

type Props = {
 topTags: string[],
 latestPosts: IPost[],
 hasNextPage: boolean,
 hasPreviousPage: boolean,
 pageNumber: number
}

const Home: React.FC<Props> = ({ topTags, latestPosts, hasNextPage, hasPreviousPage, pageNumber }) => {

    const getPageLink = (pageNumber: number) => {
        if (pageNumber === 1) {
            return url
        }

        return `${url}/page${pageNumber}`
    }
    return (
        <>
            <Sidebar topTags={topTags} />
            <div className={comp.content}>
                <div>
                    {latestPosts.map(p => (
                        <div className={styles.post} key={p.fullUrl}>
                            <p className={styles.postTitle}>
                                <Link href={p.fullUrl}>
                                    <a>
                                        <span>{p.title}</span>
                                    </a>
                                </Link>
                            </p>
                            <div className={styles.tags}>
                                {p.tags.map(tag => (
                                    <Link href={url + "/tag/" + tag} key={tag} prefetch={false}>
                                        <a className={styles.tag}>{tag}</a>
                                    </Link>
                                ))}
                            </div>
                            <span className={styles.postDate}>{p.dateCreatedFormatted}</span>

                            {p.banner && (
                                <img src={p.banner} className={styles.postBanner}></img>
                            )}
                            {p.description}
                        </div>
                    ))}
                </div>

                <div>
                    {hasPreviousPage && (
                        <Link href={getPageLink(pageNumber - 1)} prefetch={false}>
                            <a className={styles.paginationItem}>Newer</a>
                        </Link>
                    )}

                    {!hasPreviousPage && (
                        <span className={styles.paginationItem}>Newer</span>
                    )}

                    {hasNextPage && (
                        <Link href={getPageLink(pageNumber + 1)} prefetch={false}>
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