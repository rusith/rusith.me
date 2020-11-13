import fs from "fs"
import { getFullPath } from "./path"
import * as path from "path"

export type FileInfo = {
    fileName: string
    fullPath: string
}

export async function getFilesInDirectory(directoryPath: string): Promise<FileInfo[]> {
    return new Promise<FileInfo[]>((resolve, reject) => {
        const folderFullPath = getFullPath(directoryPath)
        fs.readdir(folderFullPath, (err, files) => {
            if (err) {
                return reject(err)
            }
            return resolve(files.map(f => ({ fileName: f, fullPath: path.join(folderFullPath, f)}) ))
        })
    })
}

export async function readFile(filePath: string) {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return reject(err)
            }
            return resolve(data.toString())
        })
    })
}