import { profilePicture, url } from "consts"
import Sidebar from "modules/app/components/sidebar"
import React from "react"
import styles from "./About.module.scss"

const About: React.FC<{ topTags: string[] }> = ({ topTags }) => {
    return (
        <div className={styles.content}>
            <Sidebar topTags={topTags} />
            <h1>About</h1>
            <div className={styles.root}>
                <div className={styles.image}>
                    <img src={profilePicture} alt="Shanaka Rusith" />
                </div>
                <div className={styles.info}>
                    <p>
                    I am Shanaka Rusith. I like to learn new things and do experiments. I write some of them in this blog.
                    <br />
                    Professionally, I am a software engineer with 3+ years of experience. Currently working as a full-stack developer.
                    <br />
                    I like reading (<a href="http://goodreads.com/rusith" target="_blank">Goodreads</a>), watching movies (<a href="https://www.imdb.com/user/ur81064939/" target="_blank">Imdb</a>). I like to read non-fiction especially Business Philosophy and Psychology books. and enjoy watching good films especially old ones. 
                    </p>
                </div>
            </div>
        </div>
    )
}


export default About