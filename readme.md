#babel-plugin-local-scoped-modules

&emsp;&emsp;这个插件用来避免输入相对路径，比如：`../../../../..`。利用项目根目录符号来代表项目根目录，同时利用具名的字符串来代表项目根目录下的子目录或模块。代码被转译后，这些符号字符串将会被指向正确路径的相对路径替换。因此还是会生成令人讨厌的相对路径，因为这些路径js引擎才能正确识别。


## English edition  readme:

##创建方法


##使用方法 
下面是一段使用在 `gulpfile.js`中的代码片段：
```js
    .transform(babelify, {
            plugins: [
                ["babel-plugin-local-scoped-modules",{
                    /**
                    1. 初始值 . 
                    2. require('~/a/b/c') 等价于 require(process.cwd()+'/a/b/c') 但是会被转译成相对路径
                    
                    3. process.cwd() 代表这个gulpfile.js所在的项目根目录
                     **/
                    rootPrefix:'~', 

                    //初始值
                    scopePrefix: '@',

                    // 初始值. 设置成false后，仅能使用根目录功能。
                    enableScope:true,

                    //本地模块. 这些前缀符号应该和上面保持一致。
                    scopes:[{
                        /**
                        1. require('@abc')  等价于 require(process.cwd()+'/a/b/c') 但是会被转译成相对路径。
                        2. process.cwd()  代表这个gulpfile.js所在的项目根目录。
                        **/
                        name:'@abc',
                        dir:'~/a/b/c'
                    },{
                       /**
                       1. require('@def/g') 等价于 require(process.cwd()+'/d/e/f/g') 但是会被转译成相对路径。
                       2. process.cwd() 代表这个gulpfile.js所在的项目根目录。
                       **/
                        name:'@def',
                        dir:'~/d/e/f'
                    }]
                }]
            ]
        })

```

##为此准备的 Sublime Text 3相关自动路径填充插件
敬请期待
 

## 授权方式
MIT
