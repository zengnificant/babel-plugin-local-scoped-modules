babel-plugin-local-scoped-modules
================
This plugin intends to avoid  typing  relative paths like `../../../../..` .  Use a project-root symbol to  represent the project-root and a scoped name(a scope symbol and a name) to represent a dirname/module under the project-root.Then , when transformed ,these symbols/names will be replaced by relative paths pointing to the exact paths .  Yes,they are still going to be the annoying relative paths for js engines to understand.


Install
---------------------------------

```shell
 yarn add  --dev  babel-plugin-local-scoped-modules 
```
**or**

```shell
 npm install --dev-save  babel-plugin-local-scoped-modules
```

Usage 
---------------------------------
Below is  a `.babelrc` config on what it is going to be like:
```js
  {
            presets: ['@babel/preset-env'],
            plugins: [
                ["babel-plugin-local-scoped-modules",{
                   //defautlt
                    rootPrefix:'~', 

                    //default 
                    scopePrefix: '@',

                    //local modules. Prefixes should be the same as set above.
                    scopes:[{
                        name:'@abc',
                        dir:'~/a/b/c'
                    },{          
                        name:'@def',
                        dir:'~/d/e/f'
                    }]
                }]
            ]
  }

```
Suppose this project hierarchy:

  `<projectRoot>/a/b/c/foo.js`

  `<projectRoot>/d/e/f/bar.js`

Now in `bar.js`, how do we suppose to quote `foo.js`?

With  the above  `.babelrc` settings,we just:
```js
 import foo from '~/a/b/c/foo' // var foo= require('~/a/b/c/foo')

```
  
 or 

```js
 import foo from '@abc/foo' //   var foo=require('@abc/foo') 

```

After transformed ,it'll work fine. These stringLiterals will turn to be a relative path.




Editor auto-completions:
---------------------------------
+ sublime plugin:
     - [LocalScopedModules](https://github.com/zengnificant/LocalScopedModules)

 Lisense
---------------------------------
  MIT
