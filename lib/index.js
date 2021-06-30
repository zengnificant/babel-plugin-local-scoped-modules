(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$1f46521b_44f9_4196_a2e7_9f99c8c39821 = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],2:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],3:[function(require,module,exports){
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
},{}],4:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],5:[function(require,module,exports){
var defineProperty = require("./defineProperty");

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;
},{"./defineProperty":3}],6:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Plugin =
/*#__PURE__*/
function () {
  function Plugin() {
    (0, _classCallCheck2["default"])(this, Plugin);
    this.cachedMethodNames = [];
    this.visitor = {};
  }

  (0, _createClass2["default"])(Plugin, [{
    key: "addMethod",
    value: function addMethod(name, fn) {
      var methodname = name;

      if (name in this.cachedMethodNames) {
        return;
      }

      this.cachedMethodNames.push(name);

      this.visitor[name] = function (path, state) {
        return fn(path, state, methodname);
      };
    }
  }, {
    key: "getVisitor",
    value: function getVisitor() {
      if (this.cachedMethodNames.length === 0) {
        return {};
      }

      return this.visitor;
    }
  }]);
  return Plugin;
}();

exports["default"] = Plugin;

},{"@babel/runtime/helpers/classCallCheck":1,"@babel/runtime/helpers/createClass":2,"@babel/runtime/helpers/interopRequireDefault":4}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  rootPrefix: '~',
  scopePrefix: '@',
  scopes: [],
  calleeNames: ['require']
};
exports["default"] = _default;

},{}],8:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _config = _interopRequireDefault(require("./config"));

var _getRelativePath = _interopRequireDefault(require("./utils/getRelativePath.js"));

var methodNames = ["CallExpression", "ImportDeclaration", "ExportNamedDeclaration", "ExportAllDeclaration"];
var methodPairs = methodNames.map(function (name) {
  return {
    name: name,
    fn: myFn
  };
});
var _default = methodPairs;
exports["default"] = _default;

function myFn(path, state, methodname) {
  var opts = (0, _objectSpread2["default"])({}, _config["default"], state.opts);

  if (!Array.isArray(opts.calleeNames)) {
    opts.calleeNames = [];
  }

  if (!opts.calleeNames.includes('require')) {
    opts.calleeNames.push('require');
  }

  var source = getSource(path, methodname, opts);
  if (!source) return;
  var targetPath = source.value;
  var relativePath = (0, _getRelativePath["default"])(targetPath, state, opts);
  if (!relativePath) return;
  source.value = relativePath;
}

function getSource(path, methodname, opts) {
  var source;

  if (methodname === 'CallExpression') {
    var calleeName = path.node.callee.name;
    var calleeNames = opts.calleeNames;
    if (!calleeNames.includes(calleeName)) return;
    var args = path.node.arguments;
    if (!args.length) return;
    source = path.node.arguments[0];
  }

  if (path.node.source) {
    source = path.node.source;
  }

  if (!source) return;

  if (source.type === 'StringLiteral') {
    return source;
  }

  while (source.type === "BinaryExpression") {
    var left = source.left;

    if (left.type === "BinaryExpression") {
      source = source.left;
      continue;
    }

    if (left.type === 'StringLiteral' && source.operator === '+' && left.value.indexOf('/') > -1) {
      return left;
    } else {
      break;
    }
  }

  return;
}

},{"./config":7,"./utils/getRelativePath.js":11,"@babel/runtime/helpers/interopRequireDefault":4,"@babel/runtime/helpers/objectSpread":5}],9:[function(require,module,exports){
//Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
'use strict';

var matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;

module.exports = function (string) {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string');
  }

  return string.replace(matchOperatorsRegex, '\\$&');
};

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(scopes) {
  var flatScopes = [];
  scopes.forEach(function (scope, index) {
    var name = scope.name,
        alias = scope.alias,
        dir = scope.dir;
    flatScopes.push({
      name: name,
      dir: dir
    });
    if (!alias) return;

    if (Array.isArray(alias)) {
      alias.forEach(function (name) {
        return flatScopes.push({
          name: name,
          dir: dir
        });
      });
    } else {
      flatScopes.push({
        name: alias,
        dir: dir
      });
    }
  });
  return flatScopes;
}

},{}],11:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getRelativePath;

var _pathUtils = require("./pathUtils.js");

var _escapeStringRegexp = _interopRequireDefault(require("./escape-string-regexp"));

var _pathStoreManager = require("./pathStoreManager.js");

var _flatScopes = _interopRequireDefault(require("./flatScopes.js"));

var _path = require("path");

function getRelativePath(targetPath, state, opts) {
  var cwd = state.cwd,
      filename = state.filename;
  var rootPrefix = opts.rootPrefix,
      scopePrefix = opts.scopePrefix;
  var cacheTargetPath = targetPath;

  if (cacheTargetPath in _pathStoreManager.eject) {
    return;
  }

  var scopes = (0, _flatScopes["default"])(opts.scopes);
  var rootScope = {
    name: rootPrefix,
    dir: cwd
  };
  scopes.unshift(rootScope);
  var scopeName = getScopeName(targetPath);

  if (!scopeName) {
    (0, _pathStoreManager.ejectItem)(cacheTargetPath);
    return;
  }

  var relativeString = getRelativeString(),
      scopeDict = transformScopesToDict(),
      restPath1 = scopeName === rootPrefix ? '' : scopeDict[scopeName].slice(rootPrefix.length),
      restPath2 = targetPath.slice(scopeName.length),
      wholePath = relativeString + (0, _path.normalize)(restPath1 + restPath2);
  return wholePath.replace(_path.sep + _path.sep, _path.sep);

  function getRelativeString() {
    return (0, _pathUtils.pathRelative)(filename, cwd);
  } //don't allow to use more than one scoped namespace in a path.


  function getScopeName(targetPath) {
    if (!isValidScopeName(targetPath)) return;
    var scopeName;
    scopes.some(function (scope) {
      var curScopeName = scope.name;

      if (targetPath === curScopeName || targetPath.startsWith("".concat(curScopeName, "/")) && targetPath.split(curScopeName).length === 2) {
        scopeName = curScopeName;
        return true;
      }

      return false;
    });
    return scopeName;
  }

  function isValidScopeName(targetPath) {
    var regex = new RegExp("^".concat((0, _escapeStringRegexp["default"])(scopePrefix), "[-_0-9A-z/]+"));
    return targetPath = rootPrefix || targetPath.startsWith("".concat(rootPrefix, "/")) && targetPath.split(rootPrefix).length === 2 || regex.test(targetPath) && targetPath.split(scopePrefix).length === 2;
  }

  function transformScopesToDict() {
    return scopes.reduce(function (ac, el) {
      ac[el['name']] = el['dir'];
      return ac;
    }, {});
  }
}

},{"./escape-string-regexp":9,"./flatScopes.js":10,"./pathStoreManager.js":12,"./pathUtils.js":13,"@babel/runtime/helpers/interopRequireDefault":4,"path":"path"}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ejectItem = exports.resolveItem = exports.eject = exports.resolve = void 0;
var Store = {
  resolve: {},
  eject: {}
};
var ejectValue = '__THE_ITEM_WAS_EJECTED__';
var resolve = Store.resolve,
    eject = Store.eject;
exports.eject = eject;
exports.resolve = resolve;

var resolveItem = function resolveItem(name, value) {
  if (name in resolve) return;
  resolve[name] = value;
};

exports.resolveItem = resolveItem;

var ejectItem = function ejectItem(name) {
  if (name in eject) return;
  eject[name] = ejectValue;
};

exports.ejectItem = ejectItem;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pathRelative = pathRelative;

var _fs = require("fs");

var _path = require("path");

var curPrefix = '.' + _path.sep;

function getPathType(absPath) {
  absPath = (0, _path.normalize)(absPath);

  if ((0, _fs.existsSync)(absPath + '.js') || (0, _fs.existsSync)(absPath + '.json')) {
    return 'file';
  }

  var dir = (0, _path.basename)(absPath);

  if (dir.indexOf('.') > -1) {
    return 'file';
  }

  return 'dir';
}

function pathRelative(cur, target) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  cur = (0, _path.normalize)(cur);
  target = (0, _path.normalize)(target);
  var curDirname, targetDirname, targetBasename, relativePath;
  var isDir = opts.isDir;
  var curType = getPathType(cur);
  var targetType = isDir == true ? "dir" : getPathType(target);
  curDirname = cur;

  if (curType === 'file') {
    curDirname = (0, _path.dirname)(cur);
  }

  targetDirname = target;

  if (targetType === 'file') {
    targetDirname = (0, _path.dirname)(target);
    targetBasename = (0, _path.basename)(target);
  }

  relativePath = (0, _path.relative)(curDirname, targetDirname);

  if (targetDirname.endsWith(_path.sep)) {
    relativePath += _path.sep;
  }

  if (targetBasename) relativePath = (0, _path.join)(relativePath, targetBasename);

  if (targetDirname.indexOf(curDirname) > -1) {
    relativePath = curPrefix + relativePath;
  }

  if (relativePath.endsWith('..')) {
    relativePath += _path.sep;
  }

  return relativePath;
}

},{"fs":"fs","path":"path"}],14:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _PluginClass = _interopRequireDefault(require("./PluginClass.js"));

var _localScopedModules = _interopRequireDefault(require("./localScopedModules"));

function _default(_ref) {
  var t = _ref.types;
  var pluginInstance = new _PluginClass["default"]();

  _localScopedModules["default"].forEach(function (method) {
    var name = method.name,
        fn = method.fn;
    pluginInstance.addMethod(name, fn);
  });

  var visitor = pluginInstance.getVisitor();
  return {
    visitor: visitor
  };
}

},{"./PluginClass.js":6,"./localScopedModules":8,"@babel/runtime/helpers/interopRequireDefault":4}]},{},[14])(14)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RTcHJlYWQuanMiLCJzcmMvUGx1Z2luQ2xhc3MuanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL2NvbmZpZy5qcyIsInNyYy9sb2NhbFNjb3BlZE1vZHVsZXMvaW5kZXguanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL3V0aWxzL2VzY2FwZS1zdHJpbmctcmVnZXhwLmpzIiwic3JjL2xvY2FsU2NvcGVkTW9kdWxlcy91dGlscy9mbGF0U2NvcGVzLmpzIiwic3JjL2xvY2FsU2NvcGVkTW9kdWxlcy91dGlscy9nZXRSZWxhdGl2ZVBhdGguanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL3V0aWxzL3BhdGhTdG9yZU1hbmFnZXIuanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL3V0aWxzL3BhdGhVdGlscy5qcyIsImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBRWUsd0JBQXVCO0FBQUEsTUFBTCxDQUFLLFFBQVosS0FBWTtBQUNsQyxNQUFJLGNBQWMsR0FBRyxJQUFJLHVCQUFKLEVBQXJCOztBQUNBLGlDQUFZLE9BQVosQ0FBb0IsVUFBQSxNQUFNLEVBQUk7QUFBQSxRQUNwQixJQURvQixHQUNQLE1BRE8sQ0FDcEIsSUFEb0I7QUFBQSxRQUNkLEVBRGMsR0FDUCxNQURPLENBQ2QsRUFEYztBQUUxQixJQUFBLGNBQWMsQ0FBQyxTQUFmLENBQXlCLElBQXpCLEVBQStCLEVBQS9CO0FBQ0gsR0FIRDs7QUFJQSxNQUFJLE9BQU8sR0FBRyxjQUFjLENBQUMsVUFBZixFQUFkO0FBQ0EsU0FBTztBQUFFLElBQUEsT0FBTyxFQUFQO0FBQUYsR0FBUDtBQUNIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDsiLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi9kZWZpbmVQcm9wZXJ0eVwiKTtcblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcbiAgICB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RTcHJlYWQ7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGx1Z2luIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYWNoZWRNZXRob2ROYW1lcyA9IFtdXG4gICAgICAgIHRoaXMudmlzaXRvciA9IHt9XG4gICAgfVxuICAgIGFkZE1ldGhvZChuYW1lLCBmbikge1xuICAgICAgICBsZXQgbWV0aG9kbmFtZSA9IG5hbWVcbiAgICAgICAgaWYgKG5hbWUgaW4gdGhpcy5jYWNoZWRNZXRob2ROYW1lcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FjaGVkTWV0aG9kTmFtZXMucHVzaChuYW1lKVxuICAgICAgICB0aGlzLnZpc2l0b3JbbmFtZV0gPSAocGF0aCwgc3RhdGUpID0+IGZuKHBhdGgsIHN0YXRlLCBtZXRob2RuYW1lKVxuICAgIH1cbiAgICBnZXRWaXNpdG9yKCkge1xuICAgICAgICBpZiAodGhpcy5jYWNoZWRNZXRob2ROYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7fVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0b3JcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIHJvb3RQcmVmaXg6ICd+JyxcbiAgICBzY29wZVByZWZpeDogJ0AnLFxuICAgIHNjb3BlczogW10sXG4gICAgY2FsbGVlTmFtZXM6IFsncmVxdWlyZSddXG59IiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZydcbmltcG9ydCBnZXRSZWxhdGl2ZVBhdGggZnJvbSAnLi91dGlscy9nZXRSZWxhdGl2ZVBhdGguanMnXG5jb25zdCBtZXRob2ROYW1lcyA9IFtcbiAgICBcIkNhbGxFeHByZXNzaW9uXCIsXG4gICAgXCJJbXBvcnREZWNsYXJhdGlvblwiLFxuICAgIFwiRXhwb3J0TmFtZWREZWNsYXJhdGlvblwiLFxuICAgIFwiRXhwb3J0QWxsRGVjbGFyYXRpb25cIixcbl1cbmxldCBtZXRob2RQYWlycyA9IG1ldGhvZE5hbWVzLm1hcChuYW1lID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lLFxuICAgICAgICBmbjogbXlGblxuICAgIH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IG1ldGhvZFBhaXJzXG5cbmZ1bmN0aW9uIG15Rm4ocGF0aCwgc3RhdGUsIG1ldGhvZG5hbWUpIHtcblxuICAgIGxldCBvcHRzID0geyAuLi5jb25maWcsIC4uLnN0YXRlLm9wdHMgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9wdHMuY2FsbGVlTmFtZXMpKSB7XG4gICAgICAgIG9wdHMuY2FsbGVlTmFtZXMgPSBbXVxuICAgIH1cbiAgICBpZiAoIW9wdHMuY2FsbGVlTmFtZXMuaW5jbHVkZXMoJ3JlcXVpcmUnKSkge1xuICAgICAgICBvcHRzLmNhbGxlZU5hbWVzLnB1c2goJ3JlcXVpcmUnKVxuICAgIH1cbiAgICBsZXQgc291cmNlID0gZ2V0U291cmNlKHBhdGgsIG1ldGhvZG5hbWUsIG9wdHMpXG4gICAgaWYgKCFzb3VyY2UpIHJldHVybjtcbiAgICBsZXQgdGFyZ2V0UGF0aCA9IHNvdXJjZS52YWx1ZVxuXG4gICAgbGV0IHJlbGF0aXZlUGF0aCA9IGdldFJlbGF0aXZlUGF0aCh0YXJnZXRQYXRoLCBzdGF0ZSwgb3B0cylcbiAgICBpZiAoIXJlbGF0aXZlUGF0aCkgcmV0dXJuO1xuICAgIHNvdXJjZS52YWx1ZSA9IHJlbGF0aXZlUGF0aFxufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2UocGF0aCwgbWV0aG9kbmFtZSwgb3B0cykge1xuICAgIGxldCBzb3VyY2U7XG4gICAgaWYgKG1ldGhvZG5hbWUgPT09ICdDYWxsRXhwcmVzc2lvbicpIHtcbiAgICAgICAgbGV0IGNhbGxlZU5hbWUgPSBwYXRoLm5vZGUuY2FsbGVlLm5hbWVcbiAgICAgICAgY29uc3QgeyBjYWxsZWVOYW1lcyB9ID0gb3B0c1xuICAgICAgICBpZiAoIWNhbGxlZU5hbWVzLmluY2x1ZGVzKGNhbGxlZU5hbWUpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBwYXRoLm5vZGUuYXJndW1lbnRzO1xuICAgICAgICBpZiAoIWFyZ3MubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIHNvdXJjZSA9IHBhdGgubm9kZS5hcmd1bWVudHNbMF1cbiAgICB9XG4gICAgaWYgKHBhdGgubm9kZS5zb3VyY2UpIHtcbiAgICAgICAgc291cmNlID0gcGF0aC5ub2RlLnNvdXJjZVxuICAgIH1cbiAgICBpZiAoIXNvdXJjZSkgcmV0dXJuXG4gICAgaWYgKHNvdXJjZS50eXBlID09PSAnU3RyaW5nTGl0ZXJhbCcpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZVxuICAgIH1cbiAgICB3aGlsZSAoc291cmNlLnR5cGUgPT09IFwiQmluYXJ5RXhwcmVzc2lvblwiKSB7XG4gICAgICAgIGxldCBsZWZ0ID0gc291cmNlLmxlZnRcbiAgICAgICAgaWYgKGxlZnQudHlwZSA9PT0gXCJCaW5hcnlFeHByZXNzaW9uXCIpIHtcbiAgICAgICAgICAgIHNvdXJjZSA9IHNvdXJjZS5sZWZ0O1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxlZnQudHlwZSA9PT0gJ1N0cmluZ0xpdGVyYWwnICYmIHNvdXJjZS5vcGVyYXRvciA9PT0gJysnICYmIGxlZnQudmFsdWUuaW5kZXhPZignLycpID4gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBsZWZ0XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm47XG59IiwiLy9Db3B5cmlnaHQgKGMpIFNpbmRyZSBTb3JodXMgPHNpbmRyZXNvcmh1c0BnbWFpbC5jb20+IChzaW5kcmVzb3JodXMuY29tKVxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBtYXRjaE9wZXJhdG9yc1JlZ2V4ID0gL1t8XFxcXHt9KClbXFxdXiQrKj8uLV0vZztcblxubW9kdWxlLmV4cG9ydHMgPSBzdHJpbmcgPT4ge1xuICAgIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShtYXRjaE9wZXJhdG9yc1JlZ2V4LCAnXFxcXCQmJyk7XG59OyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNjb3Blcykge1xuICAgIGxldCBmbGF0U2NvcGVzID0gW11cbiAgICBzY29wZXMuZm9yRWFjaCgoc2NvcGUsIGluZGV4KSA9PiB7XG4gICAgICAgIGxldCB7IG5hbWUsIGFsaWFzLCBkaXIgfSA9IHNjb3BlXG4gICAgICAgIGZsYXRTY29wZXMucHVzaCh7IG5hbWUsIGRpciB9KVxuICAgICAgICBpZiAoIWFsaWFzKSByZXR1cm47XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFsaWFzKSkge1xuICAgICAgICAgICAgYWxpYXMuZm9yRWFjaChuYW1lID0+IGZsYXRTY29wZXMucHVzaCh7IG5hbWUsIGRpciB9KSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZsYXRTY29wZXMucHVzaCh7IG5hbWU6IGFsaWFzLCBkaXIgfSlcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gZmxhdFNjb3Blc1xufSIsIi8vQGZsb3dcbmltcG9ydCB7IHBhdGhSZWxhdGl2ZSB9IGZyb20gJy4vcGF0aFV0aWxzLmpzJ1xuaW1wb3J0IGVzY2FwZVN0cmluZ1JlZ2V4cCBmcm9tICcuL2VzY2FwZS1zdHJpbmctcmVnZXhwJ1xuaW1wb3J0IHsgcmVzb2x2ZSwgZWplY3QsIHJlc29sdmVJdGVtLCBlamVjdEl0ZW0gfSBmcm9tICcuL3BhdGhTdG9yZU1hbmFnZXIuanMnXG5pbXBvcnQgZmxhdFNjb3BlcyBmcm9tICcuL2ZsYXRTY29wZXMuanMnXG5pbXBvcnQgeyBub3JtYWxpemUsc2VwIH0gZnJvbSAncGF0aCdcbnR5cGUgc2NvcGVUeXBlID0geyBuYW1lOiBzdHJpbmcsIGRpcjogc3RyaW5nIH07XG50eXBlIHN0YXRlVHlwZSA9IHsgZmlsZW5hbWU6IHN0cmluZywgY3dkOiBzdHJpbmcgfTtcbnR5cGUgT3B0aW9ucyA9IHsgcm9vdFByZWZpeDogc3RyaW5nLCBzY29wZVByZWZpeDogc3RyaW5nLCBzY29wZXM6IEFycmF5IDwgPyBzY29wZVR5cGUgPiB9O1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UmVsYXRpdmVQYXRoKHRhcmdldFBhdGg6IHN0cmluZywgc3RhdGU6IHN0YXRlVHlwZSwgb3B0czogT3B0aW9ucyk6ID8gc3RyaW5nIHtcblxuICAgIGNvbnN0IHsgY3dkLCBmaWxlbmFtZSB9ID0gc3RhdGVcbiAgICBjb25zdCB7IHJvb3RQcmVmaXgsIHNjb3BlUHJlZml4IH0gPSBvcHRzXG4gICAgY29uc3QgY2FjaGVUYXJnZXRQYXRoID0gdGFyZ2V0UGF0aFxuICAgIGlmIChjYWNoZVRhcmdldFBhdGggaW4gZWplY3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgc2NvcGVzID0gZmxhdFNjb3BlcyhvcHRzLnNjb3Blcyk7XG4gICAgY29uc3Qgcm9vdFNjb3BlID0geyBuYW1lOiByb290UHJlZml4LCBkaXI6IGN3ZCB9XG4gICAgc2NvcGVzLnVuc2hpZnQocm9vdFNjb3BlKVxuICAgIGxldCBzY29wZU5hbWUgPSBnZXRTY29wZU5hbWUodGFyZ2V0UGF0aClcbiAgICBpZiAoIXNjb3BlTmFtZSkge1xuICAgICAgICBlamVjdEl0ZW0oY2FjaGVUYXJnZXRQYXRoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcmVsYXRpdmVTdHJpbmcgPSBnZXRSZWxhdGl2ZVN0cmluZygpLFxuICAgICAgICBzY29wZURpY3QgPSB0cmFuc2Zvcm1TY29wZXNUb0RpY3QoKSxcbiAgICAgICAgcmVzdFBhdGgxID0gc2NvcGVOYW1lID09PSByb290UHJlZml4ID8gJycgOiBzY29wZURpY3Rbc2NvcGVOYW1lXS5zbGljZShyb290UHJlZml4Lmxlbmd0aCksXG4gICAgICAgIHJlc3RQYXRoMiA9IHRhcmdldFBhdGguc2xpY2Uoc2NvcGVOYW1lLmxlbmd0aCksXG4gICAgICAgIHdob2xlUGF0aCA9IHJlbGF0aXZlU3RyaW5nICsgbm9ybWFsaXplKHJlc3RQYXRoMSArIHJlc3RQYXRoMilcbiAgICByZXR1cm4gd2hvbGVQYXRoLnJlcGxhY2Uoc2VwICsgc2VwLCBzZXApXG5cblxuICAgIGZ1bmN0aW9uIGdldFJlbGF0aXZlU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gcGF0aFJlbGF0aXZlKGZpbGVuYW1lLCBjd2QpXG4gICAgfVxuICAgIC8vZG9uJ3QgYWxsb3cgdG8gdXNlIG1vcmUgdGhhbiBvbmUgc2NvcGVkIG5hbWVzcGFjZSBpbiBhIHBhdGguXG4gICAgZnVuY3Rpb24gZ2V0U2NvcGVOYW1lKHRhcmdldFBhdGgpOiA/IHN0cmluZyB7XG4gICAgICAgIGlmICghaXNWYWxpZFNjb3BlTmFtZSh0YXJnZXRQYXRoKSkgcmV0dXJuO1xuICAgICAgICBsZXQgc2NvcGVOYW1lO1xuICAgICAgICBzY29wZXMuc29tZShzY29wZSA9PiB7XG4gICAgICAgICAgICBsZXQgY3VyU2NvcGVOYW1lID0gc2NvcGUubmFtZVxuICAgICAgICAgICAgaWYgKHRhcmdldFBhdGggPT09IGN1clNjb3BlTmFtZSB8fCAodGFyZ2V0UGF0aC5zdGFydHNXaXRoKGAke2N1clNjb3BlTmFtZX0vYCkgJiYgdGFyZ2V0UGF0aC5zcGxpdChjdXJTY29wZU5hbWUpLmxlbmd0aCA9PT0gMikpIHtcbiAgICAgICAgICAgICAgICBzY29wZU5hbWUgPSBjdXJTY29wZU5hbWVcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNjb3BlTmFtZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1ZhbGlkU2NvcGVOYW1lKHRhcmdldFBhdGg6IHN0cmluZykgOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgXiR7ZXNjYXBlU3RyaW5nUmVnZXhwKHNjb3BlUHJlZml4KX1bXFwtXzAtOUEtei9dK2ApXG4gICAgICAgIHJldHVybiB0YXJnZXRQYXRoPXJvb3RQcmVmaXh8fFxuICAgICAgICAodGFyZ2V0UGF0aC5zdGFydHNXaXRoKGAke3Jvb3RQcmVmaXh9L2ApICYmIHRhcmdldFBhdGguc3BsaXQocm9vdFByZWZpeCkubGVuZ3RoID09PSAyKSB8fFxuICAgICAgICAgICAgKHJlZ2V4LnRlc3QodGFyZ2V0UGF0aCkgJiYgdGFyZ2V0UGF0aC5zcGxpdChzY29wZVByZWZpeCkubGVuZ3RoID09PSAyKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybVNjb3Blc1RvRGljdCgpIHtcbiAgICAgICAgcmV0dXJuIHNjb3Blcy5yZWR1Y2UoKGFjLCBlbCkgPT4ge1xuICAgICAgICAgICAgYWNbZWxbJ25hbWUnXV0gPSBlbFsnZGlyJ11cbiAgICAgICAgICAgIHJldHVybiBhY1xuICAgICAgICB9LCB7fSlcbiAgICB9XG59IiwiY29uc3QgU3RvcmUgPSB7IHJlc29sdmU6IHt9LCBlamVjdDoge30gfVxuY29uc3QgZWplY3RWYWx1ZSA9ICdfX1RIRV9JVEVNX1dBU19FSkVDVEVEX18nXG5cbmNvbnN0IHsgcmVzb2x2ZSwgZWplY3QgfSA9IFN0b3JlXG5jb25zdCByZXNvbHZlSXRlbSA9IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgIGlmIChuYW1lIGluIHJlc29sdmUpIHJldHVyblxuICAgIHJlc29sdmVbbmFtZV0gPSB2YWx1ZVxufVxuY29uc3QgZWplY3RJdGVtID0gKG5hbWUpID0+IHtcbiAgICBpZiAobmFtZSBpbiBlamVjdCkgcmV0dXJuXG4gICAgZWplY3RbbmFtZV0gPSBlamVjdFZhbHVlXG59XG5leHBvcnQge1xuICAgIHJlc29sdmUsXG4gICAgZWplY3QsXG4gICAgcmVzb2x2ZUl0ZW0sXG4gICAgZWplY3RJdGVtXG59IiwiaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gJ2ZzJ1xuaW1wb3J0IHsgYmFzZW5hbWUsIG5vcm1hbGl6ZSwgZGlybmFtZSwgam9pbiwgc2VwLCByZWxhdGl2ZSBhcyBzeXNSZWxhdGl2ZSB9IGZyb20gJ3BhdGgnXG5cbmNvbnN0IGN1clByZWZpeCA9ICcuJyArIHNlcFxuXG5mdW5jdGlvbiBnZXRQYXRoVHlwZShhYnNQYXRoKSB7XG4gICAgYWJzUGF0aCA9IG5vcm1hbGl6ZShhYnNQYXRoKVxuICAgIGlmIChleGlzdHNTeW5jKGFic1BhdGggKyAnLmpzJykgfHwgZXhpc3RzU3luYyhhYnNQYXRoICsgJy5qc29uJykpIHtcbiAgICAgICAgcmV0dXJuICdmaWxlJ1xuICAgIH1cbiAgICBjb25zdCBkaXIgPSBiYXNlbmFtZShhYnNQYXRoKVxuICAgIGlmIChkaXIuaW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuICdmaWxlJ1xuICAgIH1cbiAgICByZXR1cm4gJ2Rpcidcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGhSZWxhdGl2ZShjdXIsIHRhcmdldCwgb3B0cyA9IHt9KSB7XG4gICAgY3VyID0gbm9ybWFsaXplKGN1cilcbiAgICB0YXJnZXQgPSBub3JtYWxpemUodGFyZ2V0KVxuXG4gICAgbGV0IGN1ckRpcm5hbWUsIHRhcmdldERpcm5hbWUsIHRhcmdldEJhc2VuYW1lLCByZWxhdGl2ZVBhdGhcbiAgICBsZXQgeyBpc0RpciB9ID0gb3B0c1xuXG4gICAgY29uc3QgY3VyVHlwZSA9IGdldFBhdGhUeXBlKGN1cilcbiAgICBjb25zdCB0YXJnZXRUeXBlID0gaXNEaXIgPT0gdHJ1ZSA/IFwiZGlyXCIgOiBnZXRQYXRoVHlwZSh0YXJnZXQpXG4gICAgY3VyRGlybmFtZSA9IGN1clxuICAgIGlmIChjdXJUeXBlID09PSAnZmlsZScpIHtcbiAgICAgICAgY3VyRGlybmFtZSA9IGRpcm5hbWUoY3VyKVxuICAgIH1cbiAgICB0YXJnZXREaXJuYW1lID0gdGFyZ2V0XG5cbiAgICBpZiAodGFyZ2V0VHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgIHRhcmdldERpcm5hbWUgPSBkaXJuYW1lKHRhcmdldClcbiAgICAgICAgdGFyZ2V0QmFzZW5hbWUgPSBiYXNlbmFtZSh0YXJnZXQpXG4gICAgfVxuICAgIHJlbGF0aXZlUGF0aCA9IHN5c1JlbGF0aXZlKGN1ckRpcm5hbWUsIHRhcmdldERpcm5hbWUpXG4gICAgaWYgKHRhcmdldERpcm5hbWUuZW5kc1dpdGgoc2VwKSkge1xuICAgICAgICByZWxhdGl2ZVBhdGggKz0gc2VwXG4gICAgfVxuICAgIGlmICh0YXJnZXRCYXNlbmFtZSkgcmVsYXRpdmVQYXRoID0gam9pbihyZWxhdGl2ZVBhdGgsIHRhcmdldEJhc2VuYW1lKVxuXG4gICAgaWYgKHRhcmdldERpcm5hbWUuaW5kZXhPZihjdXJEaXJuYW1lKSA+IC0xKSB7XG4gICAgICAgIHJlbGF0aXZlUGF0aCA9IGN1clByZWZpeCArIHJlbGF0aXZlUGF0aFxuICAgIH1cbiAgICBpZiAocmVsYXRpdmVQYXRoLmVuZHNXaXRoKCcuLicpKSB7XG4gICAgICAgIHJlbGF0aXZlUGF0aCArPSBzZXBcbiAgICB9XG4gICAgcmV0dXJuIHJlbGF0aXZlUGF0aFxufSIsImltcG9ydCBQbHVnaW4gZnJvbSAnLi9QbHVnaW5DbGFzcy5qcydcbmltcG9ydCBtZXRob2RQYWlycyBmcm9tICcuL2xvY2FsU2NvcGVkTW9kdWxlcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeyB0eXBlczogdCB9KSB7XG4gICAgbGV0IHBsdWdpbkluc3RhbmNlID0gbmV3IFBsdWdpbigpO1xuICAgIG1ldGhvZFBhaXJzLmZvckVhY2gobWV0aG9kID0+IHtcbiAgICAgICAgbGV0IHsgbmFtZSwgZm4gfSA9IG1ldGhvZFxuICAgICAgICBwbHVnaW5JbnN0YW5jZS5hZGRNZXRob2QobmFtZSwgZm4pXG4gICAgfSlcbiAgICBsZXQgdmlzaXRvciA9IHBsdWdpbkluc3RhbmNlLmdldFZpc2l0b3IoKVxuICAgIHJldHVybiB7IHZpc2l0b3IgfVxufSJdfQ==
