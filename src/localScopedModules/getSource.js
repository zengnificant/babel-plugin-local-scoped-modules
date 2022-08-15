function getSource(path, methodname, opts) {
    let source;
    if (methodname === 'CallExpression') {
        if (!Array.isArray(opts.calleeNames)) {
            opts.calleeNames = []
        }
        if (!opts.calleeNames.includes('require')) {
            opts.calleeNames.push('require')
        }
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
    return source
}



export default getSource