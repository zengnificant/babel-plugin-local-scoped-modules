import { existsSync } from 'fs'
import { basename, normalize, dirname, join, sep, relative as sysRelative } from 'path'

const curPrefix = '.' + sep

function getPathType(absPath) {
    absPath = normalize(absPath)
    if (existsSync(absPath + '.js') || existsSync(absPath + '.json')) {
        return 'file'
    }
    const dir = basename(absPath)
    if (dir.indexOf('.') > -1) {
        return 'file'
    }
    return 'dir'
}

export function pathRelative(cur, target) {
    cur = normalize(cur)
    target = normalize(target)

    let curDirname, targetDirname, targetBasename, relativePath

    const curType = getPathType(cur)
    const targetType = getPathType(target)

    curDirname = cur
    if (curType === 'file') {
        curDirname = dirname(cur)
    }
    targetDirname = target

    if (targetType === 'file') {
        targetDirname = dirname(target)
        targetBasename = basename(target)
    }
    relativePath = sysRelative(curDirname, targetDirname)
    if (targetDirname.endsWith(sep)) {
        relativePath += sep
    }
    if (targetBasename) relativePath = join(relativePath, targetBasename)

    if (targetDirname.indexOf(curDirname) > -1) {
        relativePath = curPrefix + relativePath
    }
    if (relativePath.endsWith('..')) {
        relativePath += sep
    }
    return relativePath
}