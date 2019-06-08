(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$75008639_120b_448d_bb4f_00b25d0e25e6 = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
  scopePrefix: '@',
  treatPathNotExistsAsDir: false
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

  var basename = _path["default"].basename(absPath);

  if (basename.indexOf('.') > -1) {
    return 'file';
  }

  return 'dir';
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RTcHJlYWQuanMiLCJzcmMvUGx1Z2luQ2xhc3MuanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL2NvbmZpZy5qcyIsInNyYy9sb2NhbFNjb3BlZE1vZHVsZXMvaW5kZXguanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL3V0aWxzL2dldFBhdGhUeXBlLmpzIiwic3JjL2xvY2FsU2NvcGVkTW9kdWxlcy91dGlscy9nZXRSZWxhdGl2ZVBhdGguanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QixFQUE4QixZQUE5QixDQUEzQjtBQUNBLGFBQU8sSUFBUDtBQUNIOztBQUNELFdBQU8sS0FBUDtBQUNILEdBVEQ7QUFVQSxTQUFPLHdCQUFQO0FBQ0g7Ozs7Ozs7Ozs7OztBQ3ZFRDs7QUFDQTs7QUFFZSx3QkFBdUI7QUFBQSxNQUFMLENBQUssUUFBWixLQUFZO0FBQ2xDLE1BQUksY0FBYyxHQUFHLElBQUksdUJBQUosRUFBckI7O0FBQ0EsaUNBQVksT0FBWixDQUFvQixVQUFBLE1BQU0sRUFBSTtBQUFBLFFBQ3BCLElBRG9CLEdBQ1AsTUFETyxDQUNwQixJQURvQjtBQUFBLFFBQ2QsRUFEYyxHQUNQLE1BRE8sQ0FDZCxFQURjO0FBRTFCLElBQUEsY0FBYyxDQUFDLFNBQWYsQ0FBeUIsSUFBekIsRUFBK0IsRUFBL0I7QUFDSCxHQUhEOztBQUlBLE1BQUksT0FBTyxHQUFHLGNBQWMsQ0FBQyxVQUFmLEVBQWQ7QUFDQSxTQUFPO0FBQUUsSUFBQSxPQUFPLEVBQVA7QUFBRixHQUFQO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0OyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhY2hlZE1ldGhvZE5hbWVzID0gW11cbiAgICAgICAgdGhpcy52aXNpdG9yID0ge31cbiAgICB9XG4gICAgYWRkTWV0aG9kKG5hbWUsIGZuKSB7XG4gICAgICAgIGxldCBtZXRob2RuYW1lID0gbmFtZVxuICAgICAgICBpZiAobmFtZSBpbiB0aGlzLmNhY2hlZE1ldGhvZE5hbWVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWNoZWRNZXRob2ROYW1lcy5wdXNoKG5hbWUpXG4gICAgICAgIHRoaXMudmlzaXRvcltuYW1lXSA9IChwYXRoLCBzdGF0ZSkgPT4gZm4ocGF0aCwgc3RhdGUsIG1ldGhvZG5hbWUpXG4gICAgfVxuICAgIGdldFZpc2l0b3IoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhY2hlZE1ldGhvZE5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRvclxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgZW5hYmxlU2NvcGU6IHRydWUsXG4gICAgc2NvcGVzOiBbXSxcbiAgICByb290UHJlZml4OiAnficsXG4gICAgc2NvcGVQcmVmaXg6ICdAJyxcbiAgICB0cmVhdFBhdGhOb3RFeGlzdHNBc0RpcjogZmFsc2Vcbn0iLCJpbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IGdldFJlbGF0aXZlUGF0aCBmcm9tICcuL3V0aWxzL2dldFJlbGF0aXZlUGF0aC5qcydcbmNvbnN0IG1ldGhvZE5hbWVzID0gW1xuICAgIFwiQ2FsbEV4cHJlc3Npb25cIixcbiAgICBcIkltcG9ydERlY2xhcmF0aW9uXCIsXG4gICAgXCJFeHBvcnROYW1lZERlY2xhcmF0aW9uXCIsXG4gICAgXCJFeHBvcnRBbGxEZWNsYXJhdGlvblwiLFxuXVxubGV0IG1ldGhvZFBhaXJzID0gbWV0aG9kTmFtZXMubWFwKG5hbWUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGZuOiBteUZuXG4gICAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQgbWV0aG9kUGFpcnNcblxuZnVuY3Rpb24gbXlGbihwYXRoLCBzdGF0ZSwgbWV0aG9kbmFtZSkge1xuICAgIGxldCBvcHRzID0geyAuLi5jb25maWcsIC4uLnN0YXRlLm9wdHMgfVxuICAgIGxldCBzb3VyY2UgPSBnZXRTb3VyY2UocGF0aCwgbWV0aG9kbmFtZSlcbiAgICBpZiAoIXNvdXJjZSkgcmV0dXJuO1xuICAgIGxldCB0YXJnZXRQYXRoID0gc291cmNlLnZhbHVlXG5cbiAgICBsZXQgcmVsYXRpdmVQYXRoID0gZ2V0UmVsYXRpdmVQYXRoKHRhcmdldFBhdGgsIHN0YXRlLCBvcHRzKVxuICAgIGlmICghcmVsYXRpdmVQYXRoKSByZXR1cm47XG4gICAgc291cmNlLnZhbHVlID0gcmVsYXRpdmVQYXRoXG5cbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlKHBhdGgsIG1ldGhvZG5hbWUpIHtcbiAgICBsZXQgc291cmNlO1xuICAgIGlmIChtZXRob2RuYW1lID09PSAnQ2FsbEV4cHJlc3Npb24nKSB7XG4gICAgICAgIGlmIChwYXRoLm5vZGUuY2FsbGVlLm5hbWUgIT09ICdyZXF1aXJlJykgcmV0dXJuO1xuICAgICAgICBjb25zdCBhcmdzID0gcGF0aC5ub2RlLmFyZ3VtZW50cztcbiAgICAgICAgaWYgKCFhcmdzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBzb3VyY2UgPSBwYXRoLm5vZGUuYXJndW1lbnRzWzBdXG4gICAgfVxuICAgIGlmIChwYXRoLm5vZGUuc291cmNlKSB7XG4gICAgICAgIHNvdXJjZSA9IHBhdGgubm9kZS5zb3VyY2VcbiAgICB9XG4gICAgaWYgKCFzb3VyY2UpIHJldHVyblxuICAgIGlmICghc291cmNlLnZhbHVlKSByZXR1cm5cbiAgICByZXR1cm4gc291cmNlXG59IiwiaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuY29uc3Qgc2VwID0gcGF0aC5zZXBcblxuZnVuY3Rpb24gZXhpc3RzU3luYyhwYXRoKSB7XG4gICAgcmV0dXJuIGZzLmV4aXN0c1N5bmMocGF0aClcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRQYXRoVHlwZShhYnNQYXRoKSB7XG4gICAgYWJzUGF0aCA9IHBhdGgubm9ybWFsaXplKGFic1BhdGgpXG4gICAgaWYgKGV4aXN0c1N5bmMoYWJzUGF0aCArICcuanMnKSB8fCBleGlzdHNTeW5jKGFic1BhdGggKyAnLmpzb24nKSkge1xuICAgICAgICByZXR1cm4gJ2ZpbGUnXG4gICAgfVxuICAgIGNvbnN0IGJhc2VuYW1lID0gcGF0aC5iYXNlbmFtZShhYnNQYXRoKVxuICAgIGlmIChiYXNlbmFtZS5pbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gJ2ZpbGUnXG4gICAgfVxuXG4gICAgcmV0dXJuICdkaXInXG5cblxufSIsIi8vQGZsb3dcbmltcG9ydCBzeXNQYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZ2V0UGF0aFR5cGUgZnJvbSAnLi9nZXRQYXRoVHlwZS5qcydcblxudHlwZSBzY29wZVR5cGUgPSB7IG5hbWU6IHN0cmluZywgZGlyOiBzdHJpbmcgfTtcbnR5cGUgc3RhdGVUeXBlID0geyBmaWxlbmFtZTogc3RyaW5nLCBjd2Q6IHN0cmluZyB9O1xudHlwZSBPcHRpb25zID0geyByb290UHJlZml4OiBzdHJpbmcsIHNjb3BlUHJlZml4OiBzdHJpbmcsIGVuYWJsZVNjb3BlOiBib29sZWFuLCBzY29wZXM6IEFycmF5IDwgPyBzY29wZVR5cGUgPiB9O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRSZWxhdGl2ZVBhdGgodGFyZ2V0UGF0aDogc3RyaW5nLCBzdGF0ZTogc3RhdGVUeXBlLCBvcHRzOiBPcHRpb25zKTogPyBzdHJpbmcge1xuICAgIGNvbnN0IGFic29sdXRlUGF0aDogPyBzdHJpbmcgPSBnZXRBYnNvbHV0ZVBhdGgodGFyZ2V0UGF0aCwgc3RhdGUsIG9wdHMpXG4gICAgaWYgKCFhYnNvbHV0ZVBhdGgpIHJldHVybjtcbiAgICBjb25zdCBhYnNvbHV0ZVBhdGhUeXBlOiA/IHN0cmluZyA9IGdldFBhdGhUeXBlKGFic29sdXRlUGF0aClcbiAgICBpZiAoIWFic29sdXRlUGF0aFR5cGUpIHJldHVybjtcbiAgICBsZXQgdGFyZ2V0RGlybmFtZTogc3RyaW5nID0gYWJzb2x1dGVQYXRoXG4gICAgaWYgKGFic29sdXRlUGF0aFR5cGUgPT09ICdmaWxlJykgdGFyZ2V0RGlybmFtZSA9IHN5c1BhdGguZGlybmFtZShhYnNvbHV0ZVBhdGgpXG4gICAgY29uc3QgeyBmaWxlbmFtZSB9ID0gc3RhdGVcbiAgICBsZXQgY3VyRGlybmFtZTogc3RyaW5nID0gc3lzUGF0aC5kaXJuYW1lKGZpbGVuYW1lKSxcbiAgICAgICAgcmVsYXRpdmVQYXRoOiBzdHJpbmcgPSBzeXNQYXRoLnJlbGF0aXZlKGN1ckRpcm5hbWUsIHRhcmdldERpcm5hbWUpXG5cbiAgICByZXR1cm4gcmVsYXRpdmVQYXRoXG59XG5cblxuZnVuY3Rpb24gZ2V0QWJzb2x1dGVQYXRoKHRhcmdldFBhdGg6IHN0cmluZywgc3RhdGU6IHN0YXRlVHlwZSwgb3B0czogT3B0aW9ucykgOiA/IHN0cmluZyB7XG4gICAgY29uc3QgeyBjd2QgfSA9IHN0YXRlXG4gICAgY29uc3QgeyByb290UHJlZml4LCBzY29wZVByZWZpeCwgZW5hYmxlU2NvcGUsIHNjb3BlcyB9ID0gb3B0c1xuICAgIGlmIChpc1ZhbGlkUm9vdFByZWZpeFBhdGgodGFyZ2V0UGF0aCwgcm9vdFByZWZpeCkpIHtcbiAgICAgICAgcmV0dXJuIGdldFN0cmV0Y2hlZFJvb3RQcmVmaXhQYXRoKHRhcmdldFBhdGgsIHN0YXRlLCBvcHRzKVxuICAgIH1cbiAgICBpZiAoIWVuYWJsZVNjb3BlKSByZXR1cm47XG4gICAgaWYgKGlzWmVyb1Njb3BlKHNjb3BlcykpIHJldHVybjtcbiAgICBpZiAoIWlzVmFsaWRTY29wZVBhdGgodGFyZ2V0UGF0aCwgc2NvcGVQcmVmaXgpKSByZXR1cm47XG4gICAgcmV0dXJuIGdldFN0cmV0Y2hlZFNjb3BlUHJlZml4UGF0aCh0YXJnZXRQYXRoLCBzdGF0ZSwgb3B0cylcbn1cblxuZnVuY3Rpb24gaXNWYWxpZFJvb3RQcmVmaXhQYXRoKHNjb3BlUGF0aDogc3RyaW5nLCByb290UHJlZml4OiBzdHJpbmcpIDogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHNjb3BlUGF0aC5zdGFydHNXaXRoKGAke3Jvb3RQcmVmaXh9L2ApICYmIHNjb3BlUGF0aC5zcGxpdChyb290UHJlZml4KS5sZW5ndGggPT09IDJcbn1cblxuZnVuY3Rpb24gZ2V0U3RyZXRjaGVkUm9vdFByZWZpeFBhdGgodGFyZ2V0UGF0aDogc3RyaW5nLCBzdGF0ZTogc3RhdGVUeXBlLCBvcHRzOiBPcHRpb25zKTogc3RyaW5nIHtcbiAgICBjb25zdCB7IGN3ZCB9ID0gc3RhdGVcbiAgICBjb25zdCB7IHJvb3RQcmVmaXggfSA9IG9wdHNcbiAgICByZXR1cm4gdGFyZ2V0UGF0aC5yZXBsYWNlKHJvb3RQcmVmaXgsIGN3ZClcbn1cblxuLy9kb24ndCBhbGxvdyB0byB1c2UgbW9yZSB0aGFuIG9uZSBzY29wZWQgbmFtZXNwYWNlIGluIGEgcGF0aC5cbmZ1bmN0aW9uIGlzVmFsaWRTY29wZVBhdGgoc2NvcGVQYXRoOiBzdHJpbmcsIHNjb3BlUHJlZml4OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKGBeJHtzY29wZVByZWZpeH1cXFxcdytgKVxuICAgIHJldHVybiByZWdleC50ZXN0KHNjb3BlUGF0aCkgJiYgc2NvcGVQYXRoLnNwbGl0KHNjb3BlUHJlZml4KS5sZW5ndGggPT0gMlxufVxuXG5mdW5jdGlvbiBpc1plcm9TY29wZShzY29wZXM6IEFycmF5IDwgPyBzY29wZVR5cGUgPiApOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2NvcGVzLmxlbmd0aCA9PT0gMFxufVxuXG5mdW5jdGlvbiBnZXRTdHJldGNoZWRTY29wZVByZWZpeFBhdGgoc2NvcGVQcmVmaXhQYXRoOiBzdHJpbmcsIHN0YXRlOiBzdGF0ZVR5cGUsIG9wdHM6IE9wdGlvbnMpOiA/IHN0cmluZyB7XG4gICAgbGV0IHN0cmV0Y2hlZFNjb3BlUHJlZml4UGF0aDogPyBzdHJpbmc7XG4gICAgY29uc3QgeyBjd2QgfSA9IHN0YXRlXG4gICAgY29uc3QgeyByb290UHJlZml4LCBzY29wZVByZWZpeCwgc2NvcGVzIH0gPSBvcHRzXG5cbiAgICBzY29wZXMuc29tZShzY29wZSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbmFtZSwgZGlyIH0gPSBzY29wZVxuICAgICAgICBpZiAoIW5hbWUgfHwgIWRpcikgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoc2NvcGVQcmVmaXgpICYmIHNjb3BlUHJlZml4UGF0aC5zdGFydHNXaXRoKG5hbWUpKSB7XG4gICAgICAgICAgICBjb25zdCBzdHJldGNoZWREaXIgPSBkaXIucmVwbGFjZShyb290UHJlZml4LCBjd2QpXG4gICAgICAgICAgICBzdHJldGNoZWRTY29wZVByZWZpeFBhdGggPSBzY29wZVByZWZpeFBhdGgucmVwbGFjZShuYW1lLCBzdHJldGNoZWREaXIpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0pXG4gICAgcmV0dXJuIHN0cmV0Y2hlZFNjb3BlUHJlZml4UGF0aFxufSIsImltcG9ydCBQbHVnaW4gZnJvbSAnLi9QbHVnaW5DbGFzcy5qcydcbmltcG9ydCBtZXRob2RQYWlycyBmcm9tICcuL2xvY2FsU2NvcGVkTW9kdWxlcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeyB0eXBlczogdCB9KSB7XG4gICAgbGV0IHBsdWdpbkluc3RhbmNlID0gbmV3IFBsdWdpbigpO1xuICAgIG1ldGhvZFBhaXJzLmZvckVhY2gobWV0aG9kID0+IHtcbiAgICAgICAgbGV0IHsgbmFtZSwgZm4gfSA9IG1ldGhvZFxuICAgICAgICBwbHVnaW5JbnN0YW5jZS5hZGRNZXRob2QobmFtZSwgZm4pXG4gICAgfSlcbiAgICBsZXQgdmlzaXRvciA9IHBsdWdpbkluc3RhbmNlLmdldFZpc2l0b3IoKVxuICAgIHJldHVybiB7IHZpc2l0b3IgfVxufSJdfQ==
