import fs from 'fs'
import path from 'path'

function existsSync(path) {
    return fs.existsSync(path)
}


export default function getPathType(absPath) {
    absPath = path.normalize(absPath)
    if (existsSync(absPath + '.js') || existsSync(absPath + '.json')) {
        return 'file'
    }
    const basename = path.basename(absPath)
    if (basename.indexOf('.') > -1) {
        return 'file'
    }

    return 'dir'


}