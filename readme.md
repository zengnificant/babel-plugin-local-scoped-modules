babel-plugin-local-scoped-modules
================
This plugin intends to avoid  typing  relative paths like `../../../../..` .  Instead, use project-root symbol to  represent the project-root and a scoped name(a scope symbol and a name) to represent a dirname/module under the project-root.Then , when transformed ,these symbols/names will be replaced by relative paths pointing to the exact paths .  Yes,they are still going to be the annoying relative paths for js engines to understand.


Install
---------------------------------

```shell
 yarn add  --dev  babel-plugin-local-scoped-modules 
```
or 
---------------------------------
```shell
 npm install --dev-save  babel-plugin-local-scoped-modules
```

Use 
---------------------------------
Below is the snippet in a `gulpfile.js` on what it is going to be like:
```js
    .transform(babelify, {
            plugins: [
                ["babel-plugin-local-scoped-modules",{
                    /**
                    1. default one . 
                    2. require('~/a/b/c') will be like require(process.cwd()+'/a/b/c') 
                     but   transformed to a relative path to the current file.
                    3. process.cwd()  means your project-root where this gulpfile.js is .
                     **/
                    rootPrefix:'~', 

                    //default one
                    scopePrefix: '@',

                    // default one. Set false to use just  project-root related paths.
                    enableScope:true,

                    //local modules. Prefixs should be the same as set above.
                    scopes:[{
                        /**
                        1. require('@abc') will be like require(process.cwd()+'/a/b/c') 
                        but transformed to a relative path to the current file.
                        2. process.cwd()  means your project-root where this gulpfile.js is .
                        **/
                        name:'@abc',
                        dir:'~/a/b/c'
                    },{
                       /**
                       1. require('@def/g') will be like require(process.cwd()+'/d/e/f/g') 
                       but transformed to a relative path to the current file.
                       2. process.cwd()  means your project-root where this gulpfile.js is .
                       **/
                        name:'@def',
                        dir:'~/d/e/f'
                    }]
                }]
            ]
        })

```

  Prepared related auto_complete plugin for sublime text 3.
---------------------------------
to be present soon

 Lisense
---------------------------------
  MIT
