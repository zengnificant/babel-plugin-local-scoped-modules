const babel = require('@babel/core');
var filename = process.cwd() + '/d/e/f/index.js'
const scriptSource = `var a='test.js'
var c=require('@abc/v/'.concat(a))`

const scriptSource2 = `
var c=require(\`@abc/v/test.js\`)`


const scriptSource3 = `var a='test.js'
const c=require(\`@abc/v/\$\{a\}\`)`

const scriptSource4 = `var a='test.js'
var c=require('@abc/v/'+a)`

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


it('script source test: expression in scope 2', () => {
    const { ast } = babel.transformSync(scriptSource2, {
        filename,
        ast: true,
        code: false,
        presets: ['@babel/preset-env'],
        plugins: [
            ['./lib/', { scopes: [{ name: '@abc', dir: '~/a/b/c' }] }]
        ]
    })

    let { code } = babel.transformFromAstSync(ast, scriptSource2, {
        filename,
        ast: false,
        code: true,
    });
    expect(code).not.toContain(testStr);
});

it('script source test: expression in scope 3', () => {
    const { ast } = babel.transformSync(scriptSource3, {
        filename,
        ast: true,
        code: false,
        presets: ['@babel/preset-env'],
        plugins: [
            ['./lib/', { scopes: [{ name: '@abc', dir: '~/a/b/c' }] }]
        ]
    })

    let { code } = babel.transformFromAstSync(ast, scriptSource3, {
        filename,
        ast: false,
        code: true,
    });
    console.log(code)
    expect(code).not.toContain(testStr);
});

it('script source test: expression in scope 4', () => {
    const { ast } = babel.transformSync(scriptSource4, {
        filename,
        ast: true,
        code: false,
        presets: ['@babel/preset-env'],
        plugins: [
            ['./lib/', { scopes: [{ name: '@abc', dir: '~/a/b/c' }] }]
        ]
    })

    let { code } = babel.transformFromAstSync(ast, scriptSource4, {
        filename,
        ast: false,
        code: true,
    });
    expect(code).not.toContain(testStr);
});