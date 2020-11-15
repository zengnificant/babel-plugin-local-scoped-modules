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

                    //local modules. Prefixes should be the 
                    //same as set above.
                    scopes:[{
                        name:'@abc',
                        alias:'@ab/c',
                        dir:'~/a/b/c'
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

or 

```js
 import foo from '@ab/c/foo' //   var foo=require('@ab/c/foo') 

```

The last one could be very useful in some cases.

After transformed ,it'll work fine. These stringLiterals will turn to be a relative path.




Editor auto-completions:
---------------------------------
+ sublime plugin:
     - [LocalScopedModules](https://github.com/zengnificant/LocalScopedModules)



 Lisense
---------------------------------
  MIT

Change Log
--------------------------------
**"0.100.1" - 2020-11-15**

+  add `calleeNames:Array` option (used in configure file  `.babelrc`) to support for some functions to transform scoped string  when these functions are called. (always include `require`)。
+  fix a bug:  if a transformed relativePath should start with './', in version of '0.99' , it will be deleted. now it is ok.


**"0.3.3" - 2020-11-14**

+  add partial support for binaryExpression like:
  ```js
    var a='k'
    var b=requre('@test/'+a)
  ```

**"0.2.1" - 2019-06-15**

+ fix a typing mistake.
 
**"0.2.0" - 2019-06-15**

+ fix 2 bugs:
    + left out the  basename if `sourcePath` is file
    + caused an unexpected result if `sourceDir` string includes `curDir`  string


**"0.1.4" - 2019-06-13**

  + add feature alias for scopeName 
  +  also update  sublime plugin [LocalScopedModules](https://github.com/zengnificant/LocalScopedModules) 

