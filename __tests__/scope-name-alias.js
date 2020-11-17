const babel = require('@babel/core');
var filename = process.cwd() + '/d/e/f/index.js'
const aliasSource = `const d=require('@a/bc')`

const testStr = '@a'

it('test 0: scope  @abc alias @a/bc', () => {
    const { ast } = babel.transformSync(aliasSource, {
        filename,
        ast: true,
        code: false,
        plugins: [
            ['./lib/', { scopes: [{ name: '@abc', alias: '@a/bc', dir: '~/a/b/c' }] }]
        ]
    })
    let { code } = babel.transformFromAstSync(ast, aliasSource, {
        filename,
        ast: false,
        code: true,
    });
    expect(code).not.toContain(testStr);
});


it('test1: scope  @abc alias @a/bc', () => {
    const { ast } = babel.transformSync(aliasSource, {
        filename,
        ast: true,
        code: false,
        plugins: [
            ['./lib/', { scopes: [{ name: '@abc', alias: ['@a/bc'], dir: '~/a/b/c' }] }]
        ]
    })
    let { code } = babel.transformFromAstSync(ast, aliasSource, {
        filename,
        ast: false,
        code: true,
    });
    expect(code).not.toContain(testStr);
});