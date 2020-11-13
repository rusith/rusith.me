import { IPostAttributes } from "./IPostAttributes"

export interface IPost extends IPostAttributes {
    fileContent: string
    parsedContent: string
    fullPath: string
    fileName: string
}