import flatScopes from './flatScopes.js'
import config from '../config.js'

export default function(state, opts) {
    const { cwd } = state
    const { rootPrefix, scopes } = opts
    const rootScope = { name: rootPrefix, dir: cwd }
    let newScopes = flatScopes(scopes)
        .map(scope => {
            let dir = scope.dir
            if (dir.startsWith(rootPrefix) && dir.split(rootPrefix).length === 2) {
                scope.dir = dir.replace(rootPrefix, cwd)
            }
            return scope
        })
    newScopes.unshift(rootScope)
    return newScopes

}