import React from "react"
import Sidebar from "modules/app/components/sidebar"
import styles from "./Home.module.scss"
import { IPost } from "modules/blog/models/IPost"

const Home: React.FC<{ topTags: string[], latestPosts: IPost[]}> = ({ topTags }) => {
    return (
        <>
            <Sidebar topTags={topTags} />
            <div className={styles.content}>
                <div>
                    
                </div>
            </div>
        </>
    )
}

export default Home