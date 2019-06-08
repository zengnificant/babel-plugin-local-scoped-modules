(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$2694ddeb_c600_4f29_bfd0_5a2557694eed = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
  enableScope: true,
  scopes: [],
  rootPrefix: '~',
  scopePrefix: '@'
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
  var source = getSource(path, methodname);
  if (!source) return;
  var targetPath = source.value;
  var relativePath = (0, _getRelativePath["default"])(targetPath, state, opts);
  if (!relativePath) return;
  source.value = relativePath;
}

function getSource(path, methodname) {
  var source;

  if (methodname === 'CallExpression') {
    if (path.node.callee.name !== 'require') return;
    var args = path.node.arguments;
    if (!args.length) return;
    source = path.node.arguments[0];
  }

  if (path.node.source) {
    source = path.node.source;
  }

  if (!source) return;
  if (!source.value) return;
  return source;
}

},{"./config":7,"./utils/getRelativePath.js":10,"@babel/runtime/helpers/interopRequireDefault":4,"@babel/runtime/helpers/objectSpread":5}],9:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getPathType;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var sep = _path["default"].sep;

function existsSync(path) {
  return _fs["default"].existsSync(path);
}

function getPathType(absPath) {
  absPath = _path["default"].normalize(absPath);

  if (existsSync(absPath + '.js') || existsSync(absPath + '.json')) {
    return 'file';
  }

  var exists = existsSync(absPath);

  if (exists) {
    var stats = _fs["default"].statSync(absPath);

    if (stats.isFile()) return 'file';

    if (stats.isDirectory()) {
      return 'dir';
    }
  }

  return;
}

},{"@babel/runtime/helpers/interopRequireDefault":4,"fs":"fs","path":"path"}],10:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getRelativePath;

var _path = _interopRequireDefault(require("path"));

var _getPathType = _interopRequireDefault(require("./getPathType.js"));

function getRelativePath(targetPath, state, opts) {
  var absolutePath = getAbsolutePath(targetPath, state, opts);
  if (!absolutePath) return;
  var absolutePathType = (0, _getPathType["default"])(absolutePath);
  if (!absolutePathType) return;
  var targetDirname = absolutePath;
  if (absolutePathType === 'file') targetDirname = _path["default"].dirname(absolutePath);
  var filename = state.filename;

  var curDirname = _path["default"].dirname(filename),
      relativePath = _path["default"].relative(curDirname, targetDirname);

  return relativePath;
}

function getAbsolutePath(targetPath, state, opts) {
  var cwd = state.cwd;
  var rootPrefix = opts.rootPrefix,
      scopePrefix = opts.scopePrefix,
      enableScope = opts.enableScope,
      scopes = opts.scopes;

  if (isValidRootPrefixPath(targetPath, rootPrefix)) {
    return getStretchedRootPrefixPath(targetPath, state, opts);
  }

  if (!enableScope) return;
  if (isZeroScope(scopes)) return;
  if (!isValidScopePath(targetPath, scopePrefix)) return;
  return getStretchedScopePrefixPath(targetPath, state, opts);
}

function isValidRootPrefixPath(scopePath, rootPrefix) {
  return scopePath.startsWith("".concat(rootPrefix, "/")) && scopePath.split(rootPrefix).length === 2;
}

function getStretchedRootPrefixPath(targetPath, state, opts) {
  var cwd = state.cwd;
  var rootPrefix = opts.rootPrefix;
  return targetPath.replace(rootPrefix, cwd);
} //don't allow to use more than one scoped namespace in a path.


function isValidScopePath(scopePath, scopePrefix) {
  var regex = new RegExp("^".concat(scopePrefix, "\\w+"));
  return regex.test(scopePath) && scopePath.split(scopePrefix).length == 2;
}

function isZeroScope(scopes) {
  return scopes.length === 0;
}

function getStretchedScopePrefixPath(scopePrefixPath, state, opts) {
  var stretchedScopePrefixPath;
  var cwd = state.cwd;
  var rootPrefix = opts.rootPrefix,
      scopePrefix = opts.scopePrefix,
      scopes = opts.scopes;
  scopes.some(function (scope) {
    var name = scope.name,
        dir = scope.dir;
    if (!name || !dir) return false;

    if (name.startsWith(scopePrefix) && scopePrefixPath.startsWith(name)) {
      var stretchedDir = dir.replace(rootPrefix, cwd);
      stretchedScopePrefixPath = scopePrefixPath.replace(name, stretchedDir);
      return true;
    }

    return false;
  });
  return stretchedScopePrefixPath;
}

},{"./getPathType.js":9,"@babel/runtime/helpers/interopRequireDefault":4,"path":"path"}],11:[function(require,module,exports){
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

},{"./PluginClass.js":6,"./localScopedModules":8,"@babel/runtime/helpers/interopRequireDefault":4}]},{},[11])(11)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RTcHJlYWQuanMiLCJzcmMvUGx1Z2luQ2xhc3MuanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL2NvbmZpZy5qcyIsInNyYy9sb2NhbFNjb3BlZE1vZHVsZXMvaW5kZXguanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL3V0aWxzL2dldFBhdGhUeXBlLmpzIiwic3JjL2xvY2FsU2NvcGVkTW9kdWxlcy91dGlscy9nZXRSZWxhdGl2ZVBhdGguanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QXJCO0FBQ0EsTUFBQSx3QkFBd0IsR0FBRyxlQUFlLENBQUMsT0FBaEIsQ0FBd0IsSUFBeEIsRUFBOEIsWUFBOUIsQ0FBM0I7QUFDQSxhQUFPLElBQVA7QUFDSDs7QUFDRCxXQUFPLEtBQVA7QUFDSCxHQVREO0FBVUEsU0FBTyx3QkFBUDtBQUNIOzs7Ozs7Ozs7Ozs7QUN2RUQ7O0FBQ0E7O0FBRWUsd0JBQXVCO0FBQUEsTUFBTCxDQUFLLFFBQVosS0FBWTtBQUNsQyxNQUFJLGNBQWMsR0FBRyxJQUFJLHVCQUFKLEVBQXJCOztBQUNBLGlDQUFZLE9BQVosQ0FBb0IsVUFBQSxNQUFNLEVBQUk7QUFBQSxRQUNwQixJQURvQixHQUNQLE1BRE8sQ0FDcEIsSUFEb0I7QUFBQSxRQUNkLEVBRGMsR0FDUCxNQURPLENBQ2QsRUFEYztBQUUxQixJQUFBLGNBQWMsQ0FBQyxTQUFmLENBQXlCLElBQXpCLEVBQStCLEVBQS9CO0FBQ0gsR0FIRDs7QUFJQSxNQUFJLE9BQU8sR0FBRyxjQUFjLENBQUMsVUFBZixFQUFkO0FBQ0EsU0FBTztBQUFFLElBQUEsT0FBTyxFQUFQO0FBQUYsR0FBUDtBQUNIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDsiLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi9kZWZpbmVQcm9wZXJ0eVwiKTtcblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcbiAgICB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RTcHJlYWQ7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGx1Z2luIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYWNoZWRNZXRob2ROYW1lcyA9IFtdXG4gICAgICAgIHRoaXMudmlzaXRvciA9IHt9XG4gICAgfVxuICAgIGFkZE1ldGhvZChuYW1lLCBmbikge1xuICAgICAgICBsZXQgbWV0aG9kbmFtZSA9IG5hbWVcbiAgICAgICAgaWYgKG5hbWUgaW4gdGhpcy5jYWNoZWRNZXRob2ROYW1lcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FjaGVkTWV0aG9kTmFtZXMucHVzaChuYW1lKVxuICAgICAgICB0aGlzLnZpc2l0b3JbbmFtZV0gPSAocGF0aCwgc3RhdGUpID0+IGZuKHBhdGgsIHN0YXRlLCBtZXRob2RuYW1lKVxuICAgIH1cbiAgICBnZXRWaXNpdG9yKCkge1xuICAgICAgICBpZiAodGhpcy5jYWNoZWRNZXRob2ROYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7fVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0b3JcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGVuYWJsZVNjb3BlOiB0cnVlLFxuICAgIHNjb3BlczogW10sXG4gICAgcm9vdFByZWZpeDogJ34nLFxuICAgIHNjb3BlUHJlZml4OiAnQCdcbn0iLCJpbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IGdldFJlbGF0aXZlUGF0aCBmcm9tICcuL3V0aWxzL2dldFJlbGF0aXZlUGF0aC5qcydcbmNvbnN0IG1ldGhvZE5hbWVzID0gW1xuICAgIFwiQ2FsbEV4cHJlc3Npb25cIixcbiAgICBcIkltcG9ydERlY2xhcmF0aW9uXCIsXG4gICAgXCJFeHBvcnROYW1lZERlY2xhcmF0aW9uXCIsXG4gICAgXCJFeHBvcnRBbGxEZWNsYXJhdGlvblwiLFxuXVxubGV0IG1ldGhvZFBhaXJzID0gbWV0aG9kTmFtZXMubWFwKG5hbWUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGZuOiBteUZuXG4gICAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQgbWV0aG9kUGFpcnNcblxuZnVuY3Rpb24gbXlGbihwYXRoLCBzdGF0ZSwgbWV0aG9kbmFtZSkge1xuICAgIGxldCBvcHRzID0geyAuLi5jb25maWcsIC4uLnN0YXRlLm9wdHMgfVxuICAgIGxldCBzb3VyY2UgPSBnZXRTb3VyY2UocGF0aCwgbWV0aG9kbmFtZSlcbiAgICBpZiAoIXNvdXJjZSkgcmV0dXJuO1xuICAgIGxldCB0YXJnZXRQYXRoID0gc291cmNlLnZhbHVlXG5cbiAgICBsZXQgcmVsYXRpdmVQYXRoID0gZ2V0UmVsYXRpdmVQYXRoKHRhcmdldFBhdGgsIHN0YXRlLCBvcHRzKVxuICAgIGlmICghcmVsYXRpdmVQYXRoKSByZXR1cm47XG4gICAgc291cmNlLnZhbHVlID0gcmVsYXRpdmVQYXRoXG5cbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlKHBhdGgsIG1ldGhvZG5hbWUpIHtcbiAgICBsZXQgc291cmNlO1xuICAgIGlmIChtZXRob2RuYW1lID09PSAnQ2FsbEV4cHJlc3Npb24nKSB7XG4gICAgICAgIGlmIChwYXRoLm5vZGUuY2FsbGVlLm5hbWUgIT09ICdyZXF1aXJlJykgcmV0dXJuO1xuICAgICAgICBjb25zdCBhcmdzID0gcGF0aC5ub2RlLmFyZ3VtZW50cztcbiAgICAgICAgaWYgKCFhcmdzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBzb3VyY2UgPSBwYXRoLm5vZGUuYXJndW1lbnRzWzBdXG4gICAgfVxuICAgIGlmIChwYXRoLm5vZGUuc291cmNlKSB7XG4gICAgICAgIHNvdXJjZSA9IHBhdGgubm9kZS5zb3VyY2VcbiAgICB9XG4gICAgaWYgKCFzb3VyY2UpIHJldHVyblxuICAgIGlmICghc291cmNlLnZhbHVlKSByZXR1cm5cbiAgICByZXR1cm4gc291cmNlXG59IiwiaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuY29uc3Qgc2VwID0gcGF0aC5zZXBcblxuZnVuY3Rpb24gZXhpc3RzU3luYyhwYXRoKSB7XG4gICAgcmV0dXJuIGZzLmV4aXN0c1N5bmMocGF0aClcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRQYXRoVHlwZShhYnNQYXRoKSB7XG4gICAgYWJzUGF0aCA9IHBhdGgubm9ybWFsaXplKGFic1BhdGgpXG4gICAgaWYgKGV4aXN0c1N5bmMoYWJzUGF0aCArICcuanMnKSB8fCBleGlzdHNTeW5jKGFic1BhdGggKyAnLmpzb24nKSkge1xuICAgICAgICByZXR1cm4gJ2ZpbGUnXG4gICAgfVxuICAgIGNvbnN0IGV4aXN0cyA9IGV4aXN0c1N5bmMoYWJzUGF0aClcbiAgICBpZiAoZXhpc3RzKSB7XG4gICAgICAgIGNvbnN0IHN0YXRzID0gZnMuc3RhdFN5bmMoYWJzUGF0aClcbiAgICAgICAgaWYgKHN0YXRzLmlzRmlsZSgpKSByZXR1cm4gJ2ZpbGUnXG4gICAgICAgIGlmIChzdGF0cy5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2RpcidcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm5cblxufSIsIi8vQGZsb3dcbmltcG9ydCBzeXNQYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZ2V0UGF0aFR5cGUgZnJvbSAnLi9nZXRQYXRoVHlwZS5qcydcblxudHlwZSBzY29wZVR5cGUgPSB7IG5hbWU6IHN0cmluZywgZGlyOiBzdHJpbmcgfTtcbnR5cGUgc3RhdGVUeXBlID0geyBmaWxlbmFtZTogc3RyaW5nLCBjd2Q6IHN0cmluZyB9O1xudHlwZSBPcHRpb25zID0geyByb290UHJlZml4OiBzdHJpbmcsIHNjb3BlUHJlZml4OiBzdHJpbmcsIGVuYWJsZVNjb3BlOiBib29sZWFuLCBzY29wZXM6IEFycmF5IDwgPyBzY29wZVR5cGUgPiB9O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRSZWxhdGl2ZVBhdGgodGFyZ2V0UGF0aDogc3RyaW5nLCBzdGF0ZTogc3RhdGVUeXBlLCBvcHRzOiBPcHRpb25zKTogPyBzdHJpbmcge1xuICAgIGNvbnN0IGFic29sdXRlUGF0aDogPyBzdHJpbmcgPSBnZXRBYnNvbHV0ZVBhdGgodGFyZ2V0UGF0aCwgc3RhdGUsIG9wdHMpXG4gICAgaWYgKCFhYnNvbHV0ZVBhdGgpIHJldHVybjtcbiAgICBjb25zdCBhYnNvbHV0ZVBhdGhUeXBlOiA/IHN0cmluZyA9IGdldFBhdGhUeXBlKGFic29sdXRlUGF0aClcbiAgICBpZiAoIWFic29sdXRlUGF0aFR5cGUpIHJldHVybjtcbiAgICBsZXQgdGFyZ2V0RGlybmFtZTogc3RyaW5nID0gYWJzb2x1dGVQYXRoXG4gICAgaWYgKGFic29sdXRlUGF0aFR5cGUgPT09ICdmaWxlJykgdGFyZ2V0RGlybmFtZSA9IHN5c1BhdGguZGlybmFtZShhYnNvbHV0ZVBhdGgpXG4gICAgY29uc3QgeyBmaWxlbmFtZSB9ID0gc3RhdGVcbiAgICBsZXQgY3VyRGlybmFtZTogc3RyaW5nID0gc3lzUGF0aC5kaXJuYW1lKGZpbGVuYW1lKSxcbiAgICAgICAgcmVsYXRpdmVQYXRoOiBzdHJpbmcgPSBzeXNQYXRoLnJlbGF0aXZlKGN1ckRpcm5hbWUsIHRhcmdldERpcm5hbWUpXG5cbiAgICByZXR1cm4gcmVsYXRpdmVQYXRoXG59XG5cblxuZnVuY3Rpb24gZ2V0QWJzb2x1dGVQYXRoKHRhcmdldFBhdGg6IHN0cmluZywgc3RhdGU6IHN0YXRlVHlwZSwgb3B0czogT3B0aW9ucykgOiA/IHN0cmluZyB7XG4gICAgY29uc3QgeyBjd2QgfSA9IHN0YXRlXG4gICAgY29uc3QgeyByb290UHJlZml4LCBzY29wZVByZWZpeCwgZW5hYmxlU2NvcGUsIHNjb3BlcyB9ID0gb3B0c1xuICAgIGlmIChpc1ZhbGlkUm9vdFByZWZpeFBhdGgodGFyZ2V0UGF0aCwgcm9vdFByZWZpeCkpIHtcbiAgICAgICAgcmV0dXJuIGdldFN0cmV0Y2hlZFJvb3RQcmVmaXhQYXRoKHRhcmdldFBhdGgsIHN0YXRlLCBvcHRzKVxuICAgIH1cbiAgICBpZiAoIWVuYWJsZVNjb3BlKSByZXR1cm47XG4gICAgaWYgKGlzWmVyb1Njb3BlKHNjb3BlcykpIHJldHVybjtcbiAgICBpZiAoIWlzVmFsaWRTY29wZVBhdGgodGFyZ2V0UGF0aCwgc2NvcGVQcmVmaXgpKSByZXR1cm47XG4gICAgcmV0dXJuIGdldFN0cmV0Y2hlZFNjb3BlUHJlZml4UGF0aCh0YXJnZXRQYXRoLCBzdGF0ZSwgb3B0cylcbn1cblxuZnVuY3Rpb24gaXNWYWxpZFJvb3RQcmVmaXhQYXRoKHNjb3BlUGF0aDogc3RyaW5nLCByb290UHJlZml4OiBzdHJpbmcpIDogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHNjb3BlUGF0aC5zdGFydHNXaXRoKGAke3Jvb3RQcmVmaXh9L2ApICYmIHNjb3BlUGF0aC5zcGxpdChyb290UHJlZml4KS5sZW5ndGggPT09IDJcbn1cblxuZnVuY3Rpb24gZ2V0U3RyZXRjaGVkUm9vdFByZWZpeFBhdGgodGFyZ2V0UGF0aDogc3RyaW5nLCBzdGF0ZTogc3RhdGVUeXBlLCBvcHRzOiBPcHRpb25zKTogc3RyaW5nIHtcbiAgICBjb25zdCB7IGN3ZCB9ID0gc3RhdGVcbiAgICBjb25zdCB7IHJvb3RQcmVmaXggfSA9IG9wdHNcbiAgICByZXR1cm4gdGFyZ2V0UGF0aC5yZXBsYWNlKHJvb3RQcmVmaXgsIGN3ZClcbn1cblxuLy9kb24ndCBhbGxvdyB0byB1c2UgbW9yZSB0aGFuIG9uZSBzY29wZWQgbmFtZXNwYWNlIGluIGEgcGF0aC5cbmZ1bmN0aW9uIGlzVmFsaWRTY29wZVBhdGgoc2NvcGVQYXRoOiBzdHJpbmcsIHNjb3BlUHJlZml4OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKGBeJHtzY29wZVByZWZpeH1cXFxcdytgKVxuICAgIHJldHVybiByZWdleC50ZXN0KHNjb3BlUGF0aCkgJiYgc2NvcGVQYXRoLnNwbGl0KHNjb3BlUHJlZml4KS5sZW5ndGggPT0gMlxufVxuXG5mdW5jdGlvbiBpc1plcm9TY29wZShzY29wZXM6IEFycmF5IDwgPyBzY29wZVR5cGUgPiApOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2NvcGVzLmxlbmd0aCA9PT0gMFxufVxuXG5mdW5jdGlvbiBnZXRTdHJldGNoZWRTY29wZVByZWZpeFBhdGgoc2NvcGVQcmVmaXhQYXRoOiBzdHJpbmcsIHN0YXRlOiBzdGF0ZVR5cGUsIG9wdHM6IE9wdGlvbnMpOiA/IHN0cmluZyB7XG4gICAgbGV0IHN0cmV0Y2hlZFNjb3BlUHJlZml4UGF0aDogPyBzdHJpbmc7XG4gICAgY29uc3QgeyBjd2QgfSA9IHN0YXRlXG4gICAgY29uc3QgeyByb290UHJlZml4LCBzY29wZVByZWZpeCwgc2NvcGVzIH0gPSBvcHRzXG5cbiAgICBzY29wZXMuc29tZShzY29wZSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbmFtZSwgZGlyIH0gPSBzY29wZVxuICAgICAgICBpZiAoIW5hbWUgfHwgIWRpcikgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoc2NvcGVQcmVmaXgpICYmIHNjb3BlUHJlZml4UGF0aC5zdGFydHNXaXRoKG5hbWUpKSB7XG4gICAgICAgICAgICBjb25zdCBzdHJldGNoZWREaXIgPSBkaXIucmVwbGFjZShyb290UHJlZml4LCBjd2QpXG4gICAgICAgICAgICBzdHJldGNoZWRTY29wZVByZWZpeFBhdGggPSBzY29wZVByZWZpeFBhdGgucmVwbGFjZShuYW1lLCBzdHJldGNoZWREaXIpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0pXG4gICAgcmV0dXJuIHN0cmV0Y2hlZFNjb3BlUHJlZml4UGF0aFxufSIsImltcG9ydCBQbHVnaW4gZnJvbSAnLi9QbHVnaW5DbGFzcy5qcydcbmltcG9ydCBtZXRob2RQYWlycyBmcm9tICcuL2xvY2FsU2NvcGVkTW9kdWxlcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeyB0eXBlczogdCB9KSB7XG4gICAgbGV0IHBsdWdpbkluc3RhbmNlID0gbmV3IFBsdWdpbigpO1xuICAgIG1ldGhvZFBhaXJzLmZvckVhY2gobWV0aG9kID0+IHtcbiAgICAgICAgbGV0IHsgbmFtZSwgZm4gfSA9IG1ldGhvZFxuICAgICAgICBwbHVnaW5JbnN0YW5jZS5hZGRNZXRob2QobmFtZSwgZm4pXG4gICAgfSlcbiAgICBsZXQgdmlzaXRvciA9IHBsdWdpbkluc3RhbmNlLmdldFZpc2l0b3IoKVxuICAgIHJldHVybiB7IHZpc2l0b3IgfVxufSJdfQ==
