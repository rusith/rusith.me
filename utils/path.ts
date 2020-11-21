import { resolve, join } from "path"

export function getFullPath(path: string) {
    return resolve(path)
}


export function removeEndingSlash(path: string) {
    if (path && path.endsWith("/")) {
        path.substr(0, path.length -1)
    }

    return path
}