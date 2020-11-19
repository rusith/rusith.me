import Sidebar from "modules/app/components/sidebar"
import { IPost } from "modules/blog/models/IPost"
import styles from "./Post.module.scss"
import comp from "styles/comp.module.scss"
import React from "react"
import Link from "next/link"
import { defaultBanner, rusithFullName, url } from "consts"
import IPostLink from "modules/blog/models/IPostLink"
import { DiscussionEmbed } from 'disqus-react'
import Head from "next/head"
import ShareButtons from "modules/app/components/shareButtons"

type Props = {
 post: IPost,
 topTags: string[],
 relatedPosts: IPostLink[]
}

export function getSchema(post) {
    const schema = {
        "@context": "https://schema.org",
        headline: post.title,
        author: {
            "@type": "Person",
            name: rusithFullName,
            url: `${url}/about`
        },
        keywords: post.tags.join(","),
        url: post.fullUrl,
        description: post.description,
        copyrightHolder: {
            "@type": "Person",
            name: rusithFullName,
            url: `${url}/about`
        },
        copyrightYear: "2021"
    } as any

    schema["@type"] = post.isNonTech ? "Article" : "TechArticle"
    schema.image = post.banner ? post.banner : defaultBanner

    if (post.about) {
        schema.about = post.about
    }

    if (post.datePublished) {
        schema.datePublished = post.datePublished
    }

    if (post.dateCreated) {
        schema.datePublished = post.dateCreated
    }

    if (post.dateModified) {
        schema.dateModified = post.dateModified
    }

    return schema
}

const Post: React.FC<Props> = ({ post, topTags, relatedPosts }) => {


    return (
        <>
            <Sidebar topTags={topTags} />
            <div className={comp.content}>
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
                {!!relatedPosts.length && (
                    <div className={styles.related}>
                        <h2>Related Posts</h2>
                        <ul className={styles.relatedPosts}>
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


            <Head>
                <title>
                    {post.title}
                </title>
                <meta name="description" content={post.description} key="description" />
                <link rel="canonical" href={post.fullUrl} key="canonical" />
                <meta property="og:title" content={post.title} key="og_title" />
                <meta property="og:url" content={post.fullUrl} key="og_url" />
                <meta property="og:description" content={post.description} key="og_description" />
                <meta property="twitter:description" content={post.about} key="twitter_description" />

                {(!!post.banner) && (
                    <>
                        <meta property="og:image" content={post.banner} key="og_image" />
                        <meta name="twitter:card" content="summary_large_image" key="twitter_card" />
                    </>
                )}
                {(!post.banner) && (
                    <meta name="twitter:card" content="summary" key="twitter_card" />
                )}
                {post.math && (
                    <script async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_CHTML"></script>
                )}

                <script key="schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getSchema(post))}}>
                </script>
            </Head>
            <ShareButtons url={post.fullUrl} />
        </>
    )
}



export default Post