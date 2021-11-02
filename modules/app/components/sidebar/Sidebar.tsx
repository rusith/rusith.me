import React from "react"
import styles from "./Sidebar.module.scss"
import comp from "styles/comp.module.scss"
import cn from "classnames"
import * as consts from "consts"
import LinkedIn from "icons/linkedin.svg"
import Facebook from "icons/facebook-square.svg"
import Twitter from "icons/twitter-square.svg"
import Github from "icons/github-square.svg"
import Gitlab from "icons/gitlab.svg"
import GoodReads from "icons/goodreads.svg"
import Imdb from "icons/imdb.svg"
import Link from "next/link"

const Sidebar: React.FC<{ topTags: string[]; post?: boolean }> = ({ topTags, post }) => {
  const socialButtons = [
    { icon: LinkedIn, url: consts.links.linkedIn, name: "LinkedIn" },
    { icon: Facebook, url: consts.links.facebook, name: "Facebook" },
    { icon: Twitter, url: consts.links.facebook, name: "Twitter" },
    { icon: Github, url: consts.links.github, name: "Github" },
    { icon: Gitlab, url: consts.links.gitlab, name: "Gitlab" },
    { icon: GoodReads, url: consts.links.goodReads, name: "GoodReads" },
    { icon: Imdb, url: consts.links.imdb, name: "IMDB" }
  ]

  return (
    <div className={styles.r}>
      <div className={cn(comp.container, styles.sticky)}>
        <div className={styles.about}>
          {post && (
            <h2>
              <Link href="/" prefetch={false}>
                <a>{consts.mainHeading}</a>
              </Link>
            </h2>
          )}
          {!post && (
            <h1>
              <Link href="/" prefetch={false}>
                <a>{consts.mainHeading}</a>
              </Link>
            </h1>
          )}
          <div className={styles.socialButtons}>
            {socialButtons.map((sb) => (
              <a href={sb.url} className={styles.socialButton} target="_blank" key={sb.name} rel="noreferrer">
                <img alt={sb.name + " icon"} src={sb.icon} />
              </a>
            ))}
          </div>
          <p className={comp.lead}>{consts.description}</p>
        </div>
        <div className={styles.nav}>
          <div className={styles.tagWrapper}>
            {topTags.map((t) => (
              <Link href={"/tag/" + t} key={t} prefetch={false}>
                <a>
                  <span className={cn(styles.tag)}>{t}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
