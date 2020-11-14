const prod = process.env.NODE_ENV === 'production'

export const title = "Rusith"
export const description = "A blog from a tech and art enthusiast"
export const url = prod ? "https://next.rusith.me" : "http://localhost:3000"
export const links = {
    linkedIn: "https://www.linkedin.com/in/shanaka-rusith",
    facebook: "https://www.facebook.com/shanaka.rusith",
    twitter: "https://twitter.com/rusith_",
    github: "https://github.com/rusith",
    gitlab: "https://gitlab.com/rusith",
    goodReads: "http://goodreads.com/rusith",
    imdb: "https://www.imdb.com/user/ur81064939",
}
