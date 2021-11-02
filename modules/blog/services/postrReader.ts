import { FileInfo, getFilesInDirectory, readFile } from "utils/file"
import frontMatter from "front-matter"
import showdown from "showdown"
import { IPost } from "../models/IPost"
import _ from "lodash"
import showdownHighlight from "showdown-highlight"
import { processAttributes, processContent } from "./postProcessor"

export async function readPost(file: FileInfo): Promise<IPost> {
    const fileContent = await readFile(file.fullPath)
    const frontParsed = frontMatter(fileContent)
    const postBody = frontParsed.body
    const attributes = processAttributes(frontParsed.attributes)

    const showdownConverter = new showdown.Converter({
        extensions: [showdownHighlight({})],
    })
    const parsedContent =  processContent(attributes, showdownConverter.makeHtml(postBody))

    return {
        ...file,
        ...attributes,
        fileContent,
        parsedContent,
    }
}

export async function readAllPosts() {
    const allPostFiles =  await getFilesInDirectory("modules/blog/posts")
    return Promise.all(allPostFiles.map(readPost))
}