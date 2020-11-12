import config from './config'
import flatScopes from './flatScopes.js'
import getRelativePath from './utils/getRelativePath.js'
const methodNames = [
    "CallExpression",
    "ImportDeclaration",
    "ExportNamedDeclaration",
    "ExportAllDeclaration",
]
let methodPairs = methodNames.map(name => {
    return {
        name,
        fn: myFn
    }
})

export default methodPairs

function myFn(path, state, methodname) {
    let opts = { ...config, ...state.opts }
    opts.scopes = flatScopes(opts.scopes)
    let source = getSource(path, methodname, state)
    if (!source) return;
    let targetPath = source.value
    let relativePath = getRelativePath(targetPath, state, opts)
    if (!relativePath) return;
    source.value = relativePath
}

function getSource(path, methodname, state) {
    let source;
    if (methodname === 'CallExpression') {
        if (path.node.callee.name !== 'require') return;
        const args = path.node.arguments;
        if (!args.length) return;
        source = path.node.arguments[0]
    }
    if (path.node.source) {
        source = path.node.source
    }
    if (!source) return
    if (source.type === 'StringLiteral') {
        return source
    }

    if (source.type === "BinaryExpression") {
        let left = source.left,
            value = left.value
        if (left.type === 'StringLiteral' && source.operator === '+' && value.indexOf('/') > -1) {
            return left
        }
    }
    return;
}