//@flow
import { pathRelative } from './pathUtils.js'
import escapeStringRegexp from './escape-string-regexp'
import { resolve, eject, resolveItem, ejectItem } from './pathStoreManager.js'
import flatScopes from './flatScopes.js'
import { sep } from 'path'
type scopeType = { name: string, dir: string };
type stateType = { filename: string, cwd: string };
type Options = { rootPrefix: string, scopePrefix: string, scopes: Array < ? scopeType > };
export default function getRelativePath(targetPath: string, state: stateType, opts: Options): ? string {

    const { cwd, filename } = state
    const { rootPrefix, scopePrefix } = opts
    const cacheTargetPath = targetPath
    if (cacheTargetPath in eject) {
        return;
    }
    let scopes = flatScopes(opts.scopes);
    const rootScope = { name: rootPrefix, dir: cwd }
    scopes.unshift(rootScope)
    let scopeName = getScopeName(targetPath)
    if (!scopeName) {
        ejectItem(cacheTargetPath);
        return;
    }
    let relativeString = getRelativeString(),
        scopeDict = transformScopesToDict(),
        restPath1 = scopeName === rootPrefix ? '' : scopeDict[scopeName].slice(rootPrefix.length),
        restPath2 = targetPath.slice(scopeName.length),
        wholePath = relativeString + restPath1 + restPath2
    return wholePath.replace(sep + sep, sep)



    function getRelativeString() {
        return pathRelative(filename, cwd)
    }
    //don't allow to use more than one scoped namespace in a path.
    function getScopeName(targetPath): ? string {
        if (!isValidScopeName(targetPath)) return;
        let scopeName;
        scopes.some(scope => {
            let curScopeName = scope.name
            if (targetPath === curScopeName || (targetPath.startsWith(`${curScopeName+sep}`) && targetPath.split(curScopeName).length === 2)) {
                scopeName = curScopeName
                return true
            }
            return false;
        });
        return scopeName;
    }

    function isValidScopeName(targetPath: string) : boolean {
        let regex = new RegExp(`^${escapeStringRegexp(scopePrefix)}[\-_0-9A-z/]+`)
        return (targetPath.startsWith(`${rootPrefix+sep}`) && targetPath.split(rootPrefix).length === 2) ||
            (regex.test(targetPath) && targetPath.split(scopePrefix).length === 2)
    }

    function transformScopesToDict() {
        return scopes.reduce((ac, el) => {
            ac[el['name']] = el['dir']
            return ac
        }, {})
    }
}