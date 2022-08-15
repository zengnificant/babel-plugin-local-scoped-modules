import getRelativePath from './utils/getRelativePath.js'


const getSourceFromBinaryExpression = (source) => {
    while (source.type === "BinaryExpression") {
        let left = source.left
        if (left.type === "BinaryExpression") {
            source = source.left;
            continue;
        }
        if (left.type === 'StringLiteral' && source.operator === '+') {
            return left
        } else if (left.type === 'TemplateLiteral' && source.operator === '+') {
            return left;
        } else {
            break;
        }
    }
    return;
}


const dealWithSource = source => (state, opts) => {
    if (source.type === "BinaryExpression") {
        source = getSourceFromBinaryExpression(source)
    }
    if (source.type === 'CallExpression') {
        source = source.callee.object;
    }

    if (!source) return;
    if (source.type === 'StringLiteral') {
        return dealWithSourceOfStringLiteral(source, state, opts)
    }
    if (source.type === 'TemplateLiteral') {
        return dealWithSourceOfTemplateLiteral(source, state, opts)
    }

}


const dealWithSourceOfStringLiteral = (source, state, opts) => {
    let targetPath = source.value
    let relativePath = getRelativePath(targetPath, state, opts);
    if (!relativePath) return;
    source.value = relativePath;
}
const dealWithSourceOfTemplateLiteral = (source, state, opts) => {
    source = source.quasis[0];
    const { raw, cooked } = source.value;
    let targetPath = raw;
    let relativePath = getRelativePath(targetPath, state, opts)
    if (!relativePath) return;
    source.value = { raw: relativePath, cooked: relativePath };
}


export default dealWithSource;