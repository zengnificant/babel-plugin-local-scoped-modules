const babel = require('@babel/core');
const fs = require('fs')
const path = require('path')
var filename = process.cwd() + '/d/e/f/index.js'
const relaPath = path.relative(process.cwd() + '/d/e/f/', process.cwd() + '/a/b/c')
const aliasSource = `const d=require('@a/bc')`

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
    expect(code).toContain(relaPath);
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
    expect(code).toContain(relaPath);
});