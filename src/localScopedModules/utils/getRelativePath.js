//@flow
import { pathRelative } from './pathUtils.js'
import escapeStringRegexp from './escape-string-regexp'
import { resolve, eject, resolveItem, ejectItem } from './pathStoreManager.js'
import flatScopes from './flatScopes2.js'
import { sep } from 'path'
type scopeType = { name: string, dir: string };
type stateType = { filename: string, cwd: string };
type Options = { rootPrefix: string, scopePrefix: string, scopes: Array < ? scopeType > };
export default function getRelativePath(targetPath: string, state: stateType, opts: Options): ? string {

    const { cwd, filename } = state
    const { rootPrefix, scopePrefix } = opts
    const scopes = flatScopes(state, opts)

    let stretchedPath: ? string, relativePath : string, partRelativePath: string;
    const cacheTargetPath = targetPath
    if (cacheTargetPath in eject) {
        return;
    }
    if (!isValidScopePath(targetPath)) {
        ejectItem(cacheTargetPath);
        return;
    }
    const dividedPaths = divideTargetScopePathToTwo(targetPath)

    let theScopeName = dividedPaths[0],
        restPath = dividedPaths[1]

    stretchedPath = getStretchedScopePath(theScopeName)
    partRelativePath = pathRelative(filename, stretchedPath, { isDir: true })
    let wholePath = partRelativePath + restPath
    return wholePath.replace(sep + sep, sep)

    //don't allow to use more than one scoped namespace in a path.

    function isValidScopeName(scopePath: string): boolean {
        let regex = new RegExp(`^${escapeStringRegexp(scopePrefix)}[\-_0-9A-z/]+`)
        return (scopePath.startsWith(`${rootPrefix}/`) && scopePath.split(rootPrefix).length === 2) ||
            (regex.test(scopePath) && scopePath.split(scopePrefix).length == 2)

    }

    function isValidScopePath(scopePath: string): boolean {
        if (!isValidScopeName(scopePath)) return false;
        return scopes.some(scope => {
            let scopeName = scope.name
            return scopePath === scopeName || (scopePath.startsWith(`${scopeName}/`) && scopePath.split(scopeName).length === 2)
        })
    }

    function transformScopesToDict() {
        return scopes.reduce((ac, el) => {
            ac[el['name']] = el['dir']
            return ac
        }, {})
    }

    function getStretchedScopePath(scopePath: string): ? string {
        const scopeDict = transformScopesToDict()
        return scopeDict[scopePath]
    }

    function getAllScopeNames() {
        return scopes.map(scope => scope.name)
    }

    function divideTargetScopePathToTwo(targetPath: string) {
        const allScopeNames = getAllScopeNames();
        let theScopeName;
        allScopeNames.some(scopeName => {
            if (targetPath.startsWith(scopeName)) {
                theScopeName = scopeName
                return true
            }
            return false
        })
        if (!theScopeName) {
            return [targetPath, '']
        }
        let restPath = targetPath.split(theScopeName)[1]
        return [theScopeName, restPath]
    }



}