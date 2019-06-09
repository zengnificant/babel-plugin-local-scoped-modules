//@flow
import sysPath from 'path'
import getPathType from './getPathType.js'

type scopeType = { name: string, dir: string };
type stateType = { filename: string, cwd: string };
type Options = { rootPrefix: string, scopePrefix: string, scopes: Array < ? scopeType > };

export default function getRelativePath(targetPath: string, state: stateType, opts: Options): ? string {
    const absolutePath: ? string = getAbsolutePath(targetPath, state, opts)
    if (!absolutePath) return;
    const absolutePathType: ? string = getPathType(absolutePath)
    if (!absolutePathType) return;
    let targetDirname: string = absolutePath
    if (absolutePathType === 'file') targetDirname = sysPath.dirname(absolutePath)
    const { filename } = state
    let curDirname: string = sysPath.dirname(filename),
        relativePath: string = sysPath.relative(curDirname, targetDirname)

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
    let regex = new RegExp(`^${scopePrefix}\\w+`)
    return regex.test(scopePath) && scopePath.split(scopePrefix).length == 2
}

function isZeroScope(scopes: Array < ? scopeType > ): boolean {
    return scopes.length === 0
}

function getStretchedScopePrefixPath(scopePrefixPath: string, state: stateType, opts: Options): ? string {
    let stretchedScopePrefixPath: ? string;
    const { cwd } = state
    const { rootPrefix, scopePrefix, scopes } = opts

    scopes.some(scope => {
        const { name, dir } = scope
        if (!name || !dir) return false
        if (name.startsWith(scopePrefix) && scopePrefixPath.startsWith(name)) {
            const stretchedDir = dir.replace(rootPrefix, cwd)
            stretchedScopePrefixPath = scopePrefixPath.replace(name, stretchedDir)
            return true
        }
        return false
    })
    return stretchedScopePrefixPath
}