const babel = require('@babel/core');
const fs = require('fs')
const path = require('path')
var filename = process.cwd() + '/a/b/c/index.js'
const scriptSource = `var a='test1'
var b='check.js'
var c=require('@abc/v'+a+b)`

const relaPath = path.relative(process.cwd() + '/a/b/c', process.cwd() + '/a/b')
it('script source test: expression in scope', () => {
    const { ast } = babel.transformSync(scriptSource, {
        filename,
        ast: true,
        code: false,
        presets: ['@babel/preset-env'],
        plugins: [
            ['./lib/', { scopes: [{ name: '@abc', dir: '~/a/b' }] }]
        ]
    })

    let { code } = babel.transformFromAstSync(ast, scriptSource, {
        filename,
        ast: false,
        code: true,
    });
    expect(code).toContain(relaPath);
});