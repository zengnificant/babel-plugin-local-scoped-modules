import config from './config'
import dealWithSource from './dealWithSource.js'
import getSource from './getSource.js'
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
    let source = getSource(path, methodname, opts)
    if (!source) return;
    return dealWithSource(source)(state, opts)
}