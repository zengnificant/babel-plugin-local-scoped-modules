const babel = require('@babel/core');
const fs = require('fs')
const path = require('path')
var filename = process.cwd() + '/d/e/f/index.js'
const scriptSource = `const d=require('@abc')`
const moduleSource = `import d from   '@abc'`

const stringSource = `'@abc'`
const stringRet = '@abc'

const relaPath = path.relative(process.cwd() + '/d/e/f/', process.cwd() + '/a/b/c')
it('script source test: scope  @abc', () => {
    const { ast } = babel.transformSync(scriptSource, {
        filename,
        ast: true,
        code: false,
        plugins: [
            ['./lib/', { scopes: [{ name: '@abc', dir: '~/a/b/c' }] }]
        ]
    })
    let { code } = babel.transformFromAstSync(ast, scriptSource, {
        filename,
        ast: false,
        code: true,
    });
    expect(code).toContain(relaPath);
});
it('module source test: scope  @abc', () => {
    const { ast } = babel.transformSync(moduleSource, {
        filename,
        ast: true,
        code: false,
        presets: ['@babel/preset-env'],
        plugins: [
            ['./lib/', { scopes: [{ name: '@abc', dir: '~/a/b/c' }] }]
        ]
    })
    let { code } = babel.transformFromAstSync(ast, moduleSource, {
        filename,
        ast: false,
        code: true,
    });
    expect(code).toContain(relaPath);
});


it('string source test: scope  @abc', () => {
    const { ast } = babel.transformSync(stringSource, {
        filename,
        ast: true,
        code: false,
        plugins: [
            ['./lib/', { scopes: [{ name: '@abc', dir: '~/a/b/c' }] }]
        ]
    })
    let { code } = babel.transformFromAstSync(ast, stringSource, {
        filename,
        ast: false,
        code: true,
    });
    expect(code).toContain(stringRet);
});