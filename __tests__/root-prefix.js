const babel = require('@babel/core');
const fs = require('fs')
const path = require('path')
var filename = process.cwd() + '/d/e/f/index.js'
const scriptSource = `const foo=require('~/a/b/c')`
const moduleSource = `import foo from   '~/a/b/c'`
const stringSource = `'~/a/b/c'`
const stringRet = '~/a/b/c'


const relaPath = path.relative(process.cwd() + '/d/e/f', process.cwd() + '/a/b/c')


it(`script source test: project-root`, () => {
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
    expect(code).toContain(relaPath);
});


it('module source  test: project root', () => {
    const { ast } = babel.transformSync(moduleSource, {
        filename,
        ast: true,
        code: false,
        presets: ['@babel/preset-env'],
        plugins: [
            ['./lib/']
        ]
    })
    let { code } = babel.transformFromAstSync(ast, moduleSource, {
        filename,
        code: true,
    });
    expect(code).toContain(relaPath);
});



it('string source  test: project root', () => {
    const { ast } = babel.transformSync(stringSource, {
        filename,
        ast: true,
        code: false,
        presets: ['@babel/preset-env'],
        plugins: [
            ['./lib/']
        ]
    })
    let { code } = babel.transformFromAstSync(ast, stringSource, {
        filename,
        code: true,
    });
    expect(code).toContain(stringRet);
});