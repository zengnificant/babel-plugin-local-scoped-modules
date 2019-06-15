const babel = require('@babel/core');
const fs = require('fs')
const path = require('path')
var filename = process.cwd() + '/a/index.js'
const scriptSource = `const foo=require('~/a/b/c/d.js')`

const relaPath = './' + path.relative(process.cwd() + '/a', process.cwd() + '/a/b/c') + '/d.js'


it(`if-sourceDir-IndexOf-curDir-to-be-true test: project-root`, () => {
    const { ast } = babel.transformSync(scriptSource, {
        filename,
        ast: true,
        code: false,
        plugins: [
            ['./lib/']
        ]
    })
    let { code } = babel.transformFromAstSync(ast, scriptSource, {
        filename,
        code: true,

    });
    console.log(code, relaPath)
    expect(code).toContain(relaPath);
});