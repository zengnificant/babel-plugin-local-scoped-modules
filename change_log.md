Change Log
--------------------------------
**"0.120.1" - 2022-08-15**

+   surport for 'TemplateLiteral';optimize(优化) code。

**"0.100.2" - 2020-11-18**

+   use rootDir to compare  with filename, code becomes cleaner.

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

+ a stable version.