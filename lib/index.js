(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$3c7e7b4c_7a13_4a88_9697_d2eac50c82b0 = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
  scopes: []
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
      scopes = opts.scopes;

  if (isValidRootPrefixPath(targetPath, rootPrefix)) {
    return getStretchedRootPrefixPath(targetPath, state, opts);
  }

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RTcHJlYWQuanMiLCJzcmMvUGx1Z2luQ2xhc3MuanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL2NvbmZpZy5qcyIsInNyYy9sb2NhbFNjb3BlZE1vZHVsZXMvaW5kZXguanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL3V0aWxzL2dldFBhdGhUeXBlLmpzIiwic3JjL2xvY2FsU2NvcGVkTW9kdWxlcy91dGlscy9nZXRSZWxhdGl2ZVBhdGguanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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LE1BQUksY0FBYyxHQUFHLElBQUksdUJBQUosRUFBckI7O0FBQ0EsaUNBQVksT0FBWixDQUFvQixVQUFBLE1BQU0sRUFBSTtBQUFBLFFBQ3BCLElBRG9CLEdBQ1AsTUFETyxDQUNwQixJQURvQjtBQUFBLFFBQ2QsRUFEYyxHQUNQLE1BRE8sQ0FDZCxFQURjO0FBRTFCLElBQUEsY0FBYyxDQUFDLFNBQWYsQ0FBeUIsSUFBekIsRUFBK0IsRUFBL0I7QUFDSCxHQUhEOztBQUlBLE1BQUksT0FBTyxHQUFHLGNBQWMsQ0FBQyxVQUFmLEVBQWQ7QUFDQSxTQUFPO0FBQUUsSUFBQSxPQUFPLEVBQVA7QUFBRixHQUFQO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0OyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhY2hlZE1ldGhvZE5hbWVzID0gW11cbiAgICAgICAgdGhpcy52aXNpdG9yID0ge31cbiAgICB9XG4gICAgYWRkTWV0aG9kKG5hbWUsIGZuKSB7XG4gICAgICAgIGxldCBtZXRob2RuYW1lID0gbmFtZVxuICAgICAgICBpZiAobmFtZSBpbiB0aGlzLmNhY2hlZE1ldGhvZE5hbWVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWNoZWRNZXRob2ROYW1lcy5wdXNoKG5hbWUpXG4gICAgICAgIHRoaXMudmlzaXRvcltuYW1lXSA9IChwYXRoLCBzdGF0ZSkgPT4gZm4ocGF0aCwgc3RhdGUsIG1ldGhvZG5hbWUpXG4gICAgfVxuICAgIGdldFZpc2l0b3IoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhY2hlZE1ldGhvZE5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRvclxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgcm9vdFByZWZpeDogJ34nLFxuICAgIHNjb3BlUHJlZml4OiAnQCcsXG4gICAgc2NvcGVzOiBbXVxufSIsImltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgZ2V0UmVsYXRpdmVQYXRoIGZyb20gJy4vdXRpbHMvZ2V0UmVsYXRpdmVQYXRoLmpzJ1xuY29uc3QgbWV0aG9kTmFtZXMgPSBbXG4gICAgXCJDYWxsRXhwcmVzc2lvblwiLFxuICAgIFwiSW1wb3J0RGVjbGFyYXRpb25cIixcbiAgICBcIkV4cG9ydE5hbWVkRGVjbGFyYXRpb25cIixcbiAgICBcIkV4cG9ydEFsbERlY2xhcmF0aW9uXCIsXG5dXG5sZXQgbWV0aG9kUGFpcnMgPSBtZXRob2ROYW1lcy5tYXAobmFtZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZm46IG15Rm5cbiAgICB9XG59KVxuXG5leHBvcnQgZGVmYXVsdCBtZXRob2RQYWlyc1xuXG5mdW5jdGlvbiBteUZuKHBhdGgsIHN0YXRlLCBtZXRob2RuYW1lKSB7XG4gICAgbGV0IG9wdHMgPSB7IC4uLmNvbmZpZywgLi4uc3RhdGUub3B0cyB9XG4gICAgbGV0IHNvdXJjZSA9IGdldFNvdXJjZShwYXRoLCBtZXRob2RuYW1lKVxuICAgIGlmICghc291cmNlKSByZXR1cm47XG4gICAgbGV0IHRhcmdldFBhdGggPSBzb3VyY2UudmFsdWVcblxuICAgIGxldCByZWxhdGl2ZVBhdGggPSBnZXRSZWxhdGl2ZVBhdGgodGFyZ2V0UGF0aCwgc3RhdGUsIG9wdHMpXG4gICAgaWYgKCFyZWxhdGl2ZVBhdGgpIHJldHVybjtcbiAgICBzb3VyY2UudmFsdWUgPSByZWxhdGl2ZVBhdGhcblxufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2UocGF0aCwgbWV0aG9kbmFtZSkge1xuICAgIGxldCBzb3VyY2U7XG4gICAgaWYgKG1ldGhvZG5hbWUgPT09ICdDYWxsRXhwcmVzc2lvbicpIHtcbiAgICAgICAgaWYgKHBhdGgubm9kZS5jYWxsZWUubmFtZSAhPT0gJ3JlcXVpcmUnKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBwYXRoLm5vZGUuYXJndW1lbnRzO1xuICAgICAgICBpZiAoIWFyZ3MubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIHNvdXJjZSA9IHBhdGgubm9kZS5hcmd1bWVudHNbMF1cbiAgICB9XG4gICAgaWYgKHBhdGgubm9kZS5zb3VyY2UpIHtcbiAgICAgICAgc291cmNlID0gcGF0aC5ub2RlLnNvdXJjZVxuICAgIH1cbiAgICBpZiAoIXNvdXJjZSkgcmV0dXJuXG4gICAgaWYgKCFzb3VyY2UudmFsdWUpIHJldHVyblxuICAgIHJldHVybiBzb3VyY2Vcbn0iLCJpbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5mdW5jdGlvbiBleGlzdHNTeW5jKHBhdGgpIHtcbiAgICByZXR1cm4gZnMuZXhpc3RzU3luYyhwYXRoKVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhdGhUeXBlKGFic1BhdGgpIHtcbiAgICBhYnNQYXRoID0gcGF0aC5ub3JtYWxpemUoYWJzUGF0aClcbiAgICBpZiAoZXhpc3RzU3luYyhhYnNQYXRoICsgJy5qcycpIHx8IGV4aXN0c1N5bmMoYWJzUGF0aCArICcuanNvbicpKSB7XG4gICAgICAgIHJldHVybiAnZmlsZSdcbiAgICB9XG4gICAgY29uc3QgYmFzZW5hbWUgPSBwYXRoLmJhc2VuYW1lKGFic1BhdGgpXG4gICAgaWYgKGJhc2VuYW1lLmluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiAnZmlsZSdcbiAgICB9XG5cbiAgICByZXR1cm4gJ2RpcidcblxuXG59IiwiLy9AZmxvd1xuaW1wb3J0IHN5c1BhdGggZnJvbSAncGF0aCdcbmltcG9ydCBnZXRQYXRoVHlwZSBmcm9tICcuL2dldFBhdGhUeXBlLmpzJ1xuXG50eXBlIHNjb3BlVHlwZSA9IHsgbmFtZTogc3RyaW5nLCBkaXI6IHN0cmluZyB9O1xudHlwZSBzdGF0ZVR5cGUgPSB7IGZpbGVuYW1lOiBzdHJpbmcsIGN3ZDogc3RyaW5nIH07XG50eXBlIE9wdGlvbnMgPSB7IHJvb3RQcmVmaXg6IHN0cmluZywgc2NvcGVQcmVmaXg6IHN0cmluZywgc2NvcGVzOiBBcnJheSA8ID8gc2NvcGVUeXBlID4gfTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UmVsYXRpdmVQYXRoKHRhcmdldFBhdGg6IHN0cmluZywgc3RhdGU6IHN0YXRlVHlwZSwgb3B0czogT3B0aW9ucyk6ID8gc3RyaW5nIHtcbiAgICBjb25zdCBhYnNvbHV0ZVBhdGg6ID8gc3RyaW5nID0gZ2V0QWJzb2x1dGVQYXRoKHRhcmdldFBhdGgsIHN0YXRlLCBvcHRzKVxuICAgIGlmICghYWJzb2x1dGVQYXRoKSByZXR1cm47XG4gICAgY29uc3QgYWJzb2x1dGVQYXRoVHlwZTogPyBzdHJpbmcgPSBnZXRQYXRoVHlwZShhYnNvbHV0ZVBhdGgpXG4gICAgaWYgKCFhYnNvbHV0ZVBhdGhUeXBlKSByZXR1cm47XG4gICAgbGV0IHRhcmdldERpcm5hbWU6IHN0cmluZyA9IGFic29sdXRlUGF0aFxuICAgIGlmIChhYnNvbHV0ZVBhdGhUeXBlID09PSAnZmlsZScpIHRhcmdldERpcm5hbWUgPSBzeXNQYXRoLmRpcm5hbWUoYWJzb2x1dGVQYXRoKVxuICAgIGNvbnN0IHsgZmlsZW5hbWUgfSA9IHN0YXRlXG4gICAgbGV0IGN1ckRpcm5hbWU6IHN0cmluZyA9IHN5c1BhdGguZGlybmFtZShmaWxlbmFtZSksXG4gICAgICAgIHJlbGF0aXZlUGF0aDogc3RyaW5nID0gc3lzUGF0aC5yZWxhdGl2ZShjdXJEaXJuYW1lLCB0YXJnZXREaXJuYW1lKVxuXG4gICAgcmV0dXJuIHJlbGF0aXZlUGF0aFxufVxuXG5cbmZ1bmN0aW9uIGdldEFic29sdXRlUGF0aCh0YXJnZXRQYXRoOiBzdHJpbmcsIHN0YXRlOiBzdGF0ZVR5cGUsIG9wdHM6IE9wdGlvbnMpIDogPyBzdHJpbmcge1xuICAgIGNvbnN0IHsgY3dkIH0gPSBzdGF0ZVxuICAgIGNvbnN0IHsgcm9vdFByZWZpeCwgc2NvcGVQcmVmaXgsIHNjb3BlcyB9ID0gb3B0c1xuICAgIGlmIChpc1ZhbGlkUm9vdFByZWZpeFBhdGgodGFyZ2V0UGF0aCwgcm9vdFByZWZpeCkpIHtcbiAgICAgICAgcmV0dXJuIGdldFN0cmV0Y2hlZFJvb3RQcmVmaXhQYXRoKHRhcmdldFBhdGgsIHN0YXRlLCBvcHRzKVxuICAgIH1cbiAgICBpZiAoaXNaZXJvU2NvcGUoc2NvcGVzKSkgcmV0dXJuO1xuICAgIGlmICghaXNWYWxpZFNjb3BlUGF0aCh0YXJnZXRQYXRoLCBzY29wZVByZWZpeCkpIHJldHVybjtcbiAgICByZXR1cm4gZ2V0U3RyZXRjaGVkU2NvcGVQcmVmaXhQYXRoKHRhcmdldFBhdGgsIHN0YXRlLCBvcHRzKVxufVxuXG5mdW5jdGlvbiBpc1ZhbGlkUm9vdFByZWZpeFBhdGgoc2NvcGVQYXRoOiBzdHJpbmcsIHJvb3RQcmVmaXg6IHN0cmluZykgOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2NvcGVQYXRoLnN0YXJ0c1dpdGgoYCR7cm9vdFByZWZpeH0vYCkgJiYgc2NvcGVQYXRoLnNwbGl0KHJvb3RQcmVmaXgpLmxlbmd0aCA9PT0gMlxufVxuXG5mdW5jdGlvbiBnZXRTdHJldGNoZWRSb290UHJlZml4UGF0aCh0YXJnZXRQYXRoOiBzdHJpbmcsIHN0YXRlOiBzdGF0ZVR5cGUsIG9wdHM6IE9wdGlvbnMpOiBzdHJpbmcge1xuICAgIGNvbnN0IHsgY3dkIH0gPSBzdGF0ZVxuICAgIGNvbnN0IHsgcm9vdFByZWZpeCB9ID0gb3B0c1xuICAgIHJldHVybiB0YXJnZXRQYXRoLnJlcGxhY2Uocm9vdFByZWZpeCwgY3dkKVxufVxuXG4vL2Rvbid0IGFsbG93IHRvIHVzZSBtb3JlIHRoYW4gb25lIHNjb3BlZCBuYW1lc3BhY2UgaW4gYSBwYXRoLlxuZnVuY3Rpb24gaXNWYWxpZFNjb3BlUGF0aChzY29wZVBhdGg6IHN0cmluZywgc2NvcGVQcmVmaXg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGxldCByZWdleCA9IG5ldyBSZWdFeHAoYF4ke3Njb3BlUHJlZml4fVxcXFx3K2ApXG4gICAgcmV0dXJuIHJlZ2V4LnRlc3Qoc2NvcGVQYXRoKSAmJiBzY29wZVBhdGguc3BsaXQoc2NvcGVQcmVmaXgpLmxlbmd0aCA9PSAyXG59XG5cbmZ1bmN0aW9uIGlzWmVyb1Njb3BlKHNjb3BlczogQXJyYXkgPCA/IHNjb3BlVHlwZSA+ICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzY29wZXMubGVuZ3RoID09PSAwXG59XG5cbmZ1bmN0aW9uIGdldFN0cmV0Y2hlZFNjb3BlUHJlZml4UGF0aChzY29wZVByZWZpeFBhdGg6IHN0cmluZywgc3RhdGU6IHN0YXRlVHlwZSwgb3B0czogT3B0aW9ucyk6ID8gc3RyaW5nIHtcbiAgICBsZXQgc3RyZXRjaGVkU2NvcGVQcmVmaXhQYXRoOiA/IHN0cmluZztcbiAgICBjb25zdCB7IGN3ZCB9ID0gc3RhdGVcbiAgICBjb25zdCB7IHJvb3RQcmVmaXgsIHNjb3BlUHJlZml4LCBzY29wZXMgfSA9IG9wdHNcblxuICAgIHNjb3Blcy5zb21lKHNjb3BlID0+IHtcbiAgICAgICAgY29uc3QgeyBuYW1lLCBkaXIgfSA9IHNjb3BlXG4gICAgICAgIGlmICghbmFtZSB8fCAhZGlyKSByZXR1cm4gZmFsc2VcbiAgICAgICAgaWYgKG5hbWUuc3RhcnRzV2l0aChzY29wZVByZWZpeCkgJiYgc2NvcGVQcmVmaXhQYXRoLnN0YXJ0c1dpdGgobmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0cmV0Y2hlZERpciA9IGRpci5yZXBsYWNlKHJvb3RQcmVmaXgsIGN3ZClcbiAgICAgICAgICAgIHN0cmV0Y2hlZFNjb3BlUHJlZml4UGF0aCA9IHNjb3BlUHJlZml4UGF0aC5yZXBsYWNlKG5hbWUsIHN0cmV0Y2hlZERpcilcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSlcbiAgICByZXR1cm4gc3RyZXRjaGVkU2NvcGVQcmVmaXhQYXRoXG59IiwiaW1wb3J0IFBsdWdpbiBmcm9tICcuL1BsdWdpbkNsYXNzLmpzJ1xuaW1wb3J0IG1ldGhvZFBhaXJzIGZyb20gJy4vbG9jYWxTY29wZWRNb2R1bGVzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih7IHR5cGVzOiB0IH0pIHtcbiAgICBsZXQgcGx1Z2luSW5zdGFuY2UgPSBuZXcgUGx1Z2luKCk7XG4gICAgbWV0aG9kUGFpcnMuZm9yRWFjaChtZXRob2QgPT4ge1xuICAgICAgICBsZXQgeyBuYW1lLCBmbiB9ID0gbWV0aG9kXG4gICAgICAgIHBsdWdpbkluc3RhbmNlLmFkZE1ldGhvZChuYW1lLCBmbilcbiAgICB9KVxuICAgIGxldCB2aXNpdG9yID0gcGx1Z2luSW5zdGFuY2UuZ2V0VmlzaXRvcigpXG4gICAgcmV0dXJuIHsgdmlzaXRvciB9XG59Il19
