import config from './config'
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

    if (!Array.isArray(opts.calleeNames)) {
        opts.calleeNames = []
    }
    if (!opts.calleeNames.includes('require')) {
        opts.calleeNames.push('require')
    }
    let source = getSource(path, methodname, opts)
    if (!source) return;
    let targetPath = source.value
    let relativePath = getRelativePath(targetPath, state, opts)
    if (!relativePath) return;
    source.value = relativePath
}

function getSource(path, methodname, opts) {
    let source;
    if (methodname === 'CallExpression') {
        let calleeName = path.node.callee.name
        const { calleeNames } = opts
        if (!calleeNames.includes(calleeName)) return;
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
    while (source.type === "BinaryExpression") {
        let left = source.left
        if (left.type === "BinaryExpression") {
            source = source.left;
            continue;
        }
        if (left.type === 'StringLiteral' && source.operator === '+' && left.value.indexOf('/') > -1) {
            return left
        } else {
            break;
        }
    }
    return;
}