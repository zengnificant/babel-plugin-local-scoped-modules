const babel = require('@babel/core');
const fs = require('fs')
const path = require('path')
var filename = process.cwd() + '/d/e/f/index.js'
const scriptSource = `var a='test'
var b='check'
var c=require('@abc/'+a+c)`

const relaPath = path.relative(process.cwd() + '/d/e/f/', process.cwd() + '/a/b/c')
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
    expect(code).toContain(relaPath);
});