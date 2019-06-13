//@flow
import sysPath from 'path'
import getPathType from './getPathType.js'
import escapeStringRegexp from './escape-string-regexp'
import { resolve, eject, resolveItem, ejectItem } from './pathStoreManager.js'
type scopeType = { name: string, dir: string};
type stateType = { filename: string, cwd: string };
type Options = { rootPrefix: string, scopePrefix: string, scopes: Array < ? scopeType > };
export default function getRelativePath(targetPath: string, state: stateType, opts: Options): ? string {
    let targetDirname: string, relativePath: string;
    const cacheTargetPath = targetPath
    if (cacheTargetPath in eject) {
        return;
    }
    const { filename } = state
    let curDirname: string = sysPath.dirname(filename)
    if (cacheTargetPath in resolve) {
        targetDirname = resolve[cacheTargetPath]
        relativePath = sysPath.relative(curDirname, targetDirname)
        return relativePath
    }
    const absolutePath: ? string = getAbsolutePath(targetPath, state, opts)
    if (!absolutePath) { ejectItem(cacheTargetPath); return; }
    // absolutePathType  is ether 'dir' or 'file'.  Needn't eject.
    const absolutePathType: string = getPathType(absolutePath)
    targetDirname = absolutePath
    if (absolutePathType === 'file') targetDirname = sysPath.dirname(absolutePath)
    resolveItem(cacheTargetPath, targetDirname)
    relativePath = sysPath.relative(curDirname, targetDirname)
    return relativePath
}

function getAbsolutePath(targetPath: string, state: stateType, opts: Options) : ? string {
    const { cwd } = state
    const { rootPrefix, scopePrefix, scopes } = opts
    if (isValidRootPrefixPath(targetPath, rootPrefix)) {
        return getStretchedRootPrefixPath(targetPath, state, opts)
    }
    if (isZeroScope(scopes)) return;
    if (!isValidScopePath(targetPath, scopePrefix)) return;
    return getStretchedScopePrefixPath(targetPath, state, opts)
}

function isValidRootPrefixPath(scopePath: string, rootPrefix: string) : boolean {
    return scopePath.startsWith(`${rootPrefix}/`) && scopePath.split(rootPrefix).length === 2
}

function getStretchedRootPrefixPath(targetPath: string, state: stateType, opts: Options): string {
    const { cwd } = state
    const { rootPrefix } = opts
    return targetPath.replace(rootPrefix, cwd)
}

//don't allow to use more than one scoped namespace in a path.
function isValidScopePath(scopePath: string, scopePrefix: string): boolean {
    let regex = new RegExp(`^${escapeStringRegexp(scopePrefix)}[\-_0-9A-z/]+`)
    return regex.test(scopePath) && scopePath.split(scopePrefix).length == 2
}

function isZeroScope(scopes: Array < ? scopeType > ): boolean {
    return scopes.length === 0
}


function isValidScopeName(scopeName:string,scopePrefix:string):boolean{
    let regex = new RegExp(`^${escapeStringRegexp(scopePrefix)}[\-_0-9A-z/]+$`)

    return  regex.test(scopeName)
}

function getStretchedScopePrefixPath(scopePrefixPath: string, state: stateType, opts: Options): ? string {
    let stretchedScopePrefixPath: ? string;
    const { cwd} = state
    const { rootPrefix, scopePrefix, scopes } = opts
    console.log(scopePrefixPath,scopes)
    scopes.some(scope => {
        if (!scope) return false
        const { name, dir} = scope        
        if (!name || !dir) return false
        if (isValidScopeName(name,scopePrefix) && scopePrefixPath.startsWith(name)) {
            const stretchedDir = dir.replace(rootPrefix, cwd)
            stretchedScopePrefixPath = scopePrefixPath.replace(name, stretchedDir)
            return true
        }
        return false
    })

    return stretchedScopePrefixPath
}