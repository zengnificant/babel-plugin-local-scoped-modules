const babel = require('@babel/core');
var filename = process.cwd() + '/d/e/f/index.js'
const scriptSource = `var a=MyCalleeName('@abc/v/');
var b=require('@abc/v/test/d.js')
`
const testStr = '@abc/v/'

it('calleeNames test', () => {
    const { ast } = babel.transformSync(scriptSource, {
        filename,
        ast: true,
        code: false,
        presets: ['@babel/preset-env'],
        plugins: [
            ['./lib/', {
                scopes: [{ name: '@abc', dir: '~/a/b/c' }],
                calleeNames: ['MyCalleeName']
            }]
        ]
    })
    let { code } = babel.transformFromAstSync(ast, scriptSource, {
        filename,
        ast: false,
        code: true,
    });
    expect(code).not.toContain(testStr);
});