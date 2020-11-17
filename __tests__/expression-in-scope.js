const babel = require('@babel/core');
var filename = process.cwd() + '/d/e/f/index.js'
const scriptSource = `var a='test1'
var b='check.js'
var c=require('@abc/v/'+a+b)`

const testStr = '@abc/v/'

it('script source test: expression in scope', () => {
    const { ast } = babel.transformSync(scriptSource, {
        filename,
        ast: true,
        code: false,
        presets: ['@babel/preset-env'],
        plugins: [
            ['./lib/', { scopes: [{ name: '@abc', dir: '~/a/b/c' }] }]
        ]
    })

    let { code } = babel.transformFromAstSync(ast, scriptSource, {
        filename,
        ast: false,
        code: true,
    });
    expect(code).not.toContain(testStr);
});