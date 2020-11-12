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

function dealWithBinaryExpression(bi, path) {

    var str = '';
    if (bi.left.type === 'StringLiteral') {
        str += bi.left.value;
    }
    if (bi.left.type === 'BinaryExpression') {
        str += dealWithBinaryExpression(source.left)
    }
    if (bi.left.type === "Identifier") {
        path.traverse({
            Identifier(path3) {
                console.log(path3)
            }
        });

    }

}

function getFilePath(path) {
    return path.hub.file.path
}


function getIdentifierValue(node, curPath) {
    if (node.type === 'StringLiteral') return node.value;
    if (node.type !== "Identifier") return;
    var path = getFilePath(curPath)
    var values = []

    path.traverse({
        VariableDeclarator(path2) {
            if (path2.scope != curPath.scope) return;
            if (path2.node.id.name != node.name) return;
            if (path2.node.end > curPath.node.start) return;
            if (path2.node.init.type !== 'StringLiteral') return;
            let value = path2.node.init.value
            values.unshift(value)
            return;
        }
    });
    return values[0]
}

function getIdentifierValue(node, curPath) {

    curPath.traverse({
        ReferencedIdentifier(innerPath, state) {
            console.log(state)
        }
    });
    return values[0]
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
        var val1 = getIdentifierValue(source.left, path)
        var val2 = getIdentifierValue(source.left, path)
    }

}