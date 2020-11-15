const babel = require('@babel/core');
const fs = require('fs')
const path = require('path')
var filename = process.cwd() + '/d/e/f/index.js'
const scriptSource = `const foo=require('~/a/b/c/d.js')`

const testStr = '~/a/b/c/d.js'



it(`if-source-is-file test: project-root`, () => {
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
    expect(code).not.toContain(testStr);
});