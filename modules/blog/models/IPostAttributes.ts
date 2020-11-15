export interface IPostAttributes {
    path: string
    oldPath?: string
    title: string
    tags: string[]
    comments: boolean
    description: string
    dateCreated: string
    dateCreatedFormatted: string
    dateModified?: string
    datePublished?: string
    banner?: string
    fullUrl: string
}