import fs from 'fs'
import path from 'path'

const sep = path.sep

function existsSync(path) {
    return fs.existsSync(path)
}


export default function getPathType(absPath) {
    absPath = path.normalize(absPath)
    if (existsSync(absPath + '.js') || existsSync(absPath + '.json')) {
        return 'file'
    }
    const exists = existsSync(absPath)
    if (exists) {
        const stats = fs.statSync(absPath)
        if (stats.isFile()) return 'file'
        if (stats.isDirectory()) {
            return 'dir'
        }
    }
    return

}