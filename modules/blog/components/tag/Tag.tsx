import Sidebar from "modules/app/components/sidebar"
import IPostLink from "modules/blog/models/IPostLink"
import styles from "./Tag.module.scss"
import React from "react"
import Link from "next/link"
import { url } from "consts"
import comp from "styles/comp.module.scss"
import Head from "next/head"

type Props = {
  tag: string;
  posts: IPostLink[];
  tags: string[];
  topTags: string[];
}

const Tag: React.FC<Props> = ({ tag, posts, topTags, tags }) => {
  return (
    <>
      <Sidebar topTags={topTags} />
      <div className={comp.content}>
        <div>
          <h1>Tag: {tag}</h1>
          <ul>
            {posts.map((post) => (
              <li key={post.fullUrl}>
                <Link prefetch={false} href={post.fullUrl}>
                  <a>{post.title}</a>
                </Link>
                ({post.date}) <br />
                {post.description}
              </li>
            ))}
          </ul>
        </div>

        <h2>Archive</h2>
        <div className={styles.tagList}>
          {tags.map((t) => (
            <Link href={url + "/tag/" + t} prefetch={false} key={t}>
              <a>
                <code className="highligher-rouge">{t}</code>
              </a>
            </Link>
          ))}
        </div>

        <Head>
          <title>Tag - {tag}</title>
          <meta name="robots" content="noindex,follow" key="robots" />
          <meta property="og:url" content={url + "/tag/" + tag} key="og_url" />
          <meta
            property="canonical"
            content={url + "/tag/" + tag}
            key="canonical"
          />
        </Head>
      </div>
    </>
  )
}

export default Tag
