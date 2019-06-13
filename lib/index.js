(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$34d174fb_1374_48ed_b3ad_a8fb5afee3eb = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
      index: index,
      dir: dir
    });
    if (!alias) return;

    if (Array.isArray(alias)) {
      alias.forEach(function (name) {
        return flatScopes.push({
          name: name,
          index: index,
          dir: dir
        });
      });
    } else {
      flatScopes.push({
        name: alias,
        index: index,
        dir: dir
      });
    }
  });
  return flatScopes;
}

},{}],9:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _config = _interopRequireDefault(require("./config"));

var _flatScopes = _interopRequireDefault(require("./flatScopes.js"));

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
  opts.scopes = (0, _flatScopes["default"])(opts.scopes);
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

},{"./config":7,"./flatScopes.js":8,"./utils/getRelativePath.js":12,"@babel/runtime/helpers/interopRequireDefault":4,"@babel/runtime/helpers/objectSpread":5}],10:[function(require,module,exports){
//Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
'use strict';

var matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;

module.exports = function (string) {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string');
  }

  return string.replace(matchOperatorsRegex, '\\$&');
};

},{}],11:[function(require,module,exports){
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

},{"@babel/runtime/helpers/interopRequireDefault":4,"fs":"fs","path":"path"}],12:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getRelativePath;

var _path = _interopRequireDefault(require("path"));

var _getPathType = _interopRequireDefault(require("./getPathType.js"));

var _escapeStringRegexp = _interopRequireDefault(require("./escape-string-regexp"));

var _pathStoreManager = require("./pathStoreManager.js");

function getRelativePath(targetPath, state, opts) {
  var targetDirname, relativePath;
  var cacheTargetPath = targetPath;

  if (cacheTargetPath in _pathStoreManager.eject) {
    return;
  }

  var filename = state.filename;

  var curDirname = _path["default"].dirname(filename);

  if (cacheTargetPath in _pathStoreManager.resolve) {
    targetDirname = _pathStoreManager.resolve[cacheTargetPath];
    relativePath = _path["default"].relative(curDirname, targetDirname);
    return relativePath;
  }

  var absolutePath = getAbsolutePath(targetPath, state, opts);

  if (!absolutePath) {
    (0, _pathStoreManager.ejectItem)(cacheTargetPath);
    return;
  } // absolutePathType  is ether 'dir' or 'file'.  Needn't eject.


  var absolutePathType = (0, _getPathType["default"])(absolutePath);
  targetDirname = absolutePath;
  if (absolutePathType === 'file') targetDirname = _path["default"].dirname(absolutePath);
  (0, _pathStoreManager.resolveItem)(cacheTargetPath, targetDirname);
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
  var regex = new RegExp("^".concat((0, _escapeStringRegexp["default"])(scopePrefix), "[-_0-9A-z/]+"));
  return regex.test(scopePath) && scopePath.split(scopePrefix).length == 2;
}

function isZeroScope(scopes) {
  return scopes.length === 0;
}

function isValidScopeName(scopeName, scopePrefix) {
  var regex = new RegExp("^".concat((0, _escapeStringRegexp["default"])(scopePrefix), "[-_0-9A-z/]+$"));
  return regex.test(scopeName);
}

function getStretchedScopePrefixPath(scopePrefixPath, state, opts) {
  var stretchedScopePrefixPath;
  var cwd = state.cwd;
  var rootPrefix = opts.rootPrefix,
      scopePrefix = opts.scopePrefix,
      scopes = opts.scopes;
  console.log(scopePrefixPath, scopes);
  scopes.some(function (scope) {
    if (!scope) return false;
    var name = scope.name,
        dir = scope.dir;
    if (!name || !dir) return false;

    if (isValidScopeName(name, scopePrefix) && scopePrefixPath.startsWith(name)) {
      var stretchedDir = dir.replace(rootPrefix, cwd);
      stretchedScopePrefixPath = scopePrefixPath.replace(name, stretchedDir);
      return true;
    }

    return false;
  });
  return stretchedScopePrefixPath;
}

},{"./escape-string-regexp":10,"./getPathType.js":11,"./pathStoreManager.js":13,"@babel/runtime/helpers/interopRequireDefault":4,"path":"path"}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"./PluginClass.js":6,"./localScopedModules":9,"@babel/runtime/helpers/interopRequireDefault":4}]},{},[14])(14)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RTcHJlYWQuanMiLCJzcmMvUGx1Z2luQ2xhc3MuanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL2NvbmZpZy5qcyIsInNyYy9sb2NhbFNjb3BlZE1vZHVsZXMvZmxhdFNjb3Blcy5qcyIsInNyYy9sb2NhbFNjb3BlZE1vZHVsZXMvaW5kZXguanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL3V0aWxzL2VzY2FwZS1zdHJpbmctcmVnZXhwLmpzIiwic3JjL2xvY2FsU2NvcGVkTW9kdWxlcy91dGlscy9nZXRQYXRoVHlwZS5qcyIsInNyYy9sb2NhbFNjb3BlZE1vZHVsZXMvdXRpbHMvZ2V0UmVsYXRpdmVQYXRoLmpzIiwic3JjL2xvY2FsU2NvcGVkTW9kdWxlcy91dGlscy9wYXRoU3RvcmVNYW5hZ2VyLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0FBbkIsTztJQUFTLEssR0FBVSxLLENBQVYsSzs7OztBQUNqQixJQUFNLFdBQVcsR0FBRyxTQUFkLFdBQWMsQ0FBQyxJQUFELEVBQU8sS0FBUCxFQUFpQjtBQUNqQyxNQUFJLElBQUksSUFBSSxPQUFaLEVBQXFCO0FBQ3JCLEVBQUEsT0FBTyxDQUFDLElBQUQsQ0FBUCxHQUFnQixLQUFoQjtBQUNILENBSEQ7Ozs7QUFJQSxJQUFNLFNBQVMsR0FBRyxTQUFaLFNBQVksQ0FBQyxJQUFELEVBQVU7QUFDeEIsTUFBSSxJQUFJLElBQUksS0FBWixFQUFtQjtBQUNuQixFQUFBLEtBQUssQ0FBQyxJQUFELENBQUwsR0FBYyxVQUFkO0FBQ0gsQ0FIRDs7Ozs7Ozs7Ozs7Ozs7QUNSQTs7QUFDQTs7QUFFZSx3QkFBdUI7QUFBQSxNQUFMLENBQUssUUFBWixLQUFZO0FBQ2xDLE1BQUksY0FBYyxHQUFHLElBQUksdUJBQUosRUFBckI7O0FBQ0EsaUNBQVksT0FBWixDQUFvQixVQUFBLE1BQU0sRUFBSTtBQUFBLFFBQ3BCLElBRG9CLEdBQ1AsTUFETyxDQUNwQixJQURvQjtBQUFBLFFBQ2QsRUFEYyxHQUNQLE1BRE8sQ0FDZCxFQURjO0FBRTFCLElBQUEsY0FBYyxDQUFDLFNBQWYsQ0FBeUIsSUFBekIsRUFBK0IsRUFBL0I7QUFDSCxHQUhEOztBQUlBLE1BQUksT0FBTyxHQUFHLGNBQWMsQ0FBQyxVQUFmLEVBQWQ7QUFDQSxTQUFPO0FBQUUsSUFBQSxPQUFPLEVBQVA7QUFBRixHQUFQO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0OyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhY2hlZE1ldGhvZE5hbWVzID0gW11cbiAgICAgICAgdGhpcy52aXNpdG9yID0ge31cbiAgICB9XG4gICAgYWRkTWV0aG9kKG5hbWUsIGZuKSB7XG4gICAgICAgIGxldCBtZXRob2RuYW1lID0gbmFtZVxuICAgICAgICBpZiAobmFtZSBpbiB0aGlzLmNhY2hlZE1ldGhvZE5hbWVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWNoZWRNZXRob2ROYW1lcy5wdXNoKG5hbWUpXG4gICAgICAgIHRoaXMudmlzaXRvcltuYW1lXSA9IChwYXRoLCBzdGF0ZSkgPT4gZm4ocGF0aCwgc3RhdGUsIG1ldGhvZG5hbWUpXG4gICAgfVxuICAgIGdldFZpc2l0b3IoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhY2hlZE1ldGhvZE5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRvclxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgcm9vdFByZWZpeDogJ34nLFxuICAgIHNjb3BlUHJlZml4OiAnQCcsXG4gICAgc2NvcGVzOiBbXSxcblxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNjb3Blcykge1xuICAgIGxldCBmbGF0U2NvcGVzID0gW11cbiAgICBzY29wZXMuZm9yRWFjaCgoc2NvcGUsIGluZGV4KSA9PiB7XG4gICAgICAgIGxldCB7IG5hbWUsIGFsaWFzLCBkaXIgfSA9IHNjb3BlXG4gICAgICAgIGZsYXRTY29wZXMucHVzaCh7IG5hbWUsIGluZGV4LCBkaXIgfSlcbiAgICAgICAgaWYgKCFhbGlhcykgcmV0dXJuO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhbGlhcykpIHtcbiAgICAgICAgICAgIGFsaWFzLmZvckVhY2gobmFtZSA9PiBmbGF0U2NvcGVzLnB1c2goeyBuYW1lLCBpbmRleCwgZGlyIH0pKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmxhdFNjb3Blcy5wdXNoKHsgbmFtZTogYWxpYXMsIGluZGV4LCBkaXIgfSlcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gZmxhdFNjb3Blc1xufSIsImltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgZmxhdFNjb3BlcyBmcm9tICcuL2ZsYXRTY29wZXMuanMnXG5pbXBvcnQgZ2V0UmVsYXRpdmVQYXRoIGZyb20gJy4vdXRpbHMvZ2V0UmVsYXRpdmVQYXRoLmpzJ1xuY29uc3QgbWV0aG9kTmFtZXMgPSBbXG4gICAgXCJDYWxsRXhwcmVzc2lvblwiLFxuICAgIFwiSW1wb3J0RGVjbGFyYXRpb25cIixcbiAgICBcIkV4cG9ydE5hbWVkRGVjbGFyYXRpb25cIixcbiAgICBcIkV4cG9ydEFsbERlY2xhcmF0aW9uXCIsXG5dXG5sZXQgbWV0aG9kUGFpcnMgPSBtZXRob2ROYW1lcy5tYXAobmFtZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZm46IG15Rm5cbiAgICB9XG59KVxuXG5leHBvcnQgZGVmYXVsdCBtZXRob2RQYWlyc1xuXG5mdW5jdGlvbiBteUZuKHBhdGgsIHN0YXRlLCBtZXRob2RuYW1lKSB7XG4gICAgbGV0IG9wdHMgPSB7IC4uLmNvbmZpZywgLi4uc3RhdGUub3B0cyB9XG4gICAgb3B0cy5zY29wZXMgPSBmbGF0U2NvcGVzKG9wdHMuc2NvcGVzKVxuICAgIGxldCBzb3VyY2UgPSBnZXRTb3VyY2UocGF0aCwgbWV0aG9kbmFtZSlcbiAgICBpZiAoIXNvdXJjZSkgcmV0dXJuO1xuICAgIGxldCB0YXJnZXRQYXRoID0gc291cmNlLnZhbHVlXG4gICAgbGV0IHJlbGF0aXZlUGF0aCA9IGdldFJlbGF0aXZlUGF0aCh0YXJnZXRQYXRoLCBzdGF0ZSwgb3B0cylcbiAgICBpZiAoIXJlbGF0aXZlUGF0aCkgcmV0dXJuO1xuICAgIHNvdXJjZS52YWx1ZSA9IHJlbGF0aXZlUGF0aFxuXG59XG5cbmZ1bmN0aW9uIGdldFNvdXJjZShwYXRoLCBtZXRob2RuYW1lKSB7XG4gICAgbGV0IHNvdXJjZTtcbiAgICBpZiAobWV0aG9kbmFtZSA9PT0gJ0NhbGxFeHByZXNzaW9uJykge1xuICAgICAgICBpZiAocGF0aC5ub2RlLmNhbGxlZS5uYW1lICE9PSAncmVxdWlyZScpIHJldHVybjtcbiAgICAgICAgY29uc3QgYXJncyA9IHBhdGgubm9kZS5hcmd1bWVudHM7XG4gICAgICAgIGlmICghYXJncy5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgc291cmNlID0gcGF0aC5ub2RlLmFyZ3VtZW50c1swXVxuICAgIH1cbiAgICBpZiAocGF0aC5ub2RlLnNvdXJjZSkge1xuICAgICAgICBzb3VyY2UgPSBwYXRoLm5vZGUuc291cmNlXG4gICAgfVxuICAgIGlmICghc291cmNlKSByZXR1cm5cbiAgICBpZiAoIXNvdXJjZS52YWx1ZSkgcmV0dXJuXG4gICAgcmV0dXJuIHNvdXJjZVxufSIsIi8vQ29weXJpZ2h0IChjKSBTaW5kcmUgU29yaHVzIDxzaW5kcmVzb3JodXNAZ21haWwuY29tPiAoc2luZHJlc29yaHVzLmNvbSlcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWF0Y2hPcGVyYXRvcnNSZWdleCA9IC9bfFxcXFx7fSgpW1xcXV4kKyo/Li1dL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RyaW5nID0+IHtcbiAgICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UobWF0Y2hPcGVyYXRvcnNSZWdleCwgJ1xcXFwkJicpO1xufTsiLCJpbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5mdW5jdGlvbiBleGlzdHNTeW5jKHBhdGgpIHtcbiAgICByZXR1cm4gZnMuZXhpc3RzU3luYyhwYXRoKVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhdGhUeXBlKGFic1BhdGgpIHtcbiAgICBhYnNQYXRoID0gcGF0aC5ub3JtYWxpemUoYWJzUGF0aClcbiAgICBpZiAoZXhpc3RzU3luYyhhYnNQYXRoICsgJy5qcycpIHx8IGV4aXN0c1N5bmMoYWJzUGF0aCArICcuanNvbicpKSB7XG4gICAgICAgIHJldHVybiAnZmlsZSdcbiAgICB9XG4gICAgY29uc3QgYmFzZW5hbWUgPSBwYXRoLmJhc2VuYW1lKGFic1BhdGgpXG4gICAgaWYgKGJhc2VuYW1lLmluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiAnZmlsZSdcbiAgICB9XG5cbiAgICByZXR1cm4gJ2RpcidcblxuXG59IiwiLy9AZmxvd1xuaW1wb3J0IHN5c1BhdGggZnJvbSAncGF0aCdcbmltcG9ydCBnZXRQYXRoVHlwZSBmcm9tICcuL2dldFBhdGhUeXBlLmpzJ1xuaW1wb3J0IGVzY2FwZVN0cmluZ1JlZ2V4cCBmcm9tICcuL2VzY2FwZS1zdHJpbmctcmVnZXhwJ1xuaW1wb3J0IHsgcmVzb2x2ZSwgZWplY3QsIHJlc29sdmVJdGVtLCBlamVjdEl0ZW0gfSBmcm9tICcuL3BhdGhTdG9yZU1hbmFnZXIuanMnXG50eXBlIHNjb3BlVHlwZSA9IHsgbmFtZTogc3RyaW5nLCBkaXI6IHN0cmluZ307XG50eXBlIHN0YXRlVHlwZSA9IHsgZmlsZW5hbWU6IHN0cmluZywgY3dkOiBzdHJpbmcgfTtcbnR5cGUgT3B0aW9ucyA9IHsgcm9vdFByZWZpeDogc3RyaW5nLCBzY29wZVByZWZpeDogc3RyaW5nLCBzY29wZXM6IEFycmF5IDwgPyBzY29wZVR5cGUgPiB9O1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UmVsYXRpdmVQYXRoKHRhcmdldFBhdGg6IHN0cmluZywgc3RhdGU6IHN0YXRlVHlwZSwgb3B0czogT3B0aW9ucyk6ID8gc3RyaW5nIHtcbiAgICBsZXQgdGFyZ2V0RGlybmFtZTogc3RyaW5nLCByZWxhdGl2ZVBhdGg6IHN0cmluZztcbiAgICBjb25zdCBjYWNoZVRhcmdldFBhdGggPSB0YXJnZXRQYXRoXG4gICAgaWYgKGNhY2hlVGFyZ2V0UGF0aCBpbiBlamVjdCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgZmlsZW5hbWUgfSA9IHN0YXRlXG4gICAgbGV0IGN1ckRpcm5hbWU6IHN0cmluZyA9IHN5c1BhdGguZGlybmFtZShmaWxlbmFtZSlcbiAgICBpZiAoY2FjaGVUYXJnZXRQYXRoIGluIHJlc29sdmUpIHtcbiAgICAgICAgdGFyZ2V0RGlybmFtZSA9IHJlc29sdmVbY2FjaGVUYXJnZXRQYXRoXVxuICAgICAgICByZWxhdGl2ZVBhdGggPSBzeXNQYXRoLnJlbGF0aXZlKGN1ckRpcm5hbWUsIHRhcmdldERpcm5hbWUpXG4gICAgICAgIHJldHVybiByZWxhdGl2ZVBhdGhcbiAgICB9XG4gICAgY29uc3QgYWJzb2x1dGVQYXRoOiA/IHN0cmluZyA9IGdldEFic29sdXRlUGF0aCh0YXJnZXRQYXRoLCBzdGF0ZSwgb3B0cylcbiAgICBpZiAoIWFic29sdXRlUGF0aCkgeyBlamVjdEl0ZW0oY2FjaGVUYXJnZXRQYXRoKTsgcmV0dXJuOyB9XG4gICAgLy8gYWJzb2x1dGVQYXRoVHlwZSAgaXMgZXRoZXIgJ2Rpcicgb3IgJ2ZpbGUnLiAgTmVlZG4ndCBlamVjdC5cbiAgICBjb25zdCBhYnNvbHV0ZVBhdGhUeXBlOiBzdHJpbmcgPSBnZXRQYXRoVHlwZShhYnNvbHV0ZVBhdGgpXG4gICAgdGFyZ2V0RGlybmFtZSA9IGFic29sdXRlUGF0aFxuICAgIGlmIChhYnNvbHV0ZVBhdGhUeXBlID09PSAnZmlsZScpIHRhcmdldERpcm5hbWUgPSBzeXNQYXRoLmRpcm5hbWUoYWJzb2x1dGVQYXRoKVxuICAgIHJlc29sdmVJdGVtKGNhY2hlVGFyZ2V0UGF0aCwgdGFyZ2V0RGlybmFtZSlcbiAgICByZWxhdGl2ZVBhdGggPSBzeXNQYXRoLnJlbGF0aXZlKGN1ckRpcm5hbWUsIHRhcmdldERpcm5hbWUpXG4gICAgcmV0dXJuIHJlbGF0aXZlUGF0aFxufVxuXG5mdW5jdGlvbiBnZXRBYnNvbHV0ZVBhdGgodGFyZ2V0UGF0aDogc3RyaW5nLCBzdGF0ZTogc3RhdGVUeXBlLCBvcHRzOiBPcHRpb25zKSA6ID8gc3RyaW5nIHtcbiAgICBjb25zdCB7IGN3ZCB9ID0gc3RhdGVcbiAgICBjb25zdCB7IHJvb3RQcmVmaXgsIHNjb3BlUHJlZml4LCBzY29wZXMgfSA9IG9wdHNcbiAgICBpZiAoaXNWYWxpZFJvb3RQcmVmaXhQYXRoKHRhcmdldFBhdGgsIHJvb3RQcmVmaXgpKSB7XG4gICAgICAgIHJldHVybiBnZXRTdHJldGNoZWRSb290UHJlZml4UGF0aCh0YXJnZXRQYXRoLCBzdGF0ZSwgb3B0cylcbiAgICB9XG4gICAgaWYgKGlzWmVyb1Njb3BlKHNjb3BlcykpIHJldHVybjtcbiAgICBpZiAoIWlzVmFsaWRTY29wZVBhdGgodGFyZ2V0UGF0aCwgc2NvcGVQcmVmaXgpKSByZXR1cm47XG4gICAgcmV0dXJuIGdldFN0cmV0Y2hlZFNjb3BlUHJlZml4UGF0aCh0YXJnZXRQYXRoLCBzdGF0ZSwgb3B0cylcbn1cblxuZnVuY3Rpb24gaXNWYWxpZFJvb3RQcmVmaXhQYXRoKHNjb3BlUGF0aDogc3RyaW5nLCByb290UHJlZml4OiBzdHJpbmcpIDogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHNjb3BlUGF0aC5zdGFydHNXaXRoKGAke3Jvb3RQcmVmaXh9L2ApICYmIHNjb3BlUGF0aC5zcGxpdChyb290UHJlZml4KS5sZW5ndGggPT09IDJcbn1cblxuZnVuY3Rpb24gZ2V0U3RyZXRjaGVkUm9vdFByZWZpeFBhdGgodGFyZ2V0UGF0aDogc3RyaW5nLCBzdGF0ZTogc3RhdGVUeXBlLCBvcHRzOiBPcHRpb25zKTogc3RyaW5nIHtcbiAgICBjb25zdCB7IGN3ZCB9ID0gc3RhdGVcbiAgICBjb25zdCB7IHJvb3RQcmVmaXggfSA9IG9wdHNcbiAgICByZXR1cm4gdGFyZ2V0UGF0aC5yZXBsYWNlKHJvb3RQcmVmaXgsIGN3ZClcbn1cblxuLy9kb24ndCBhbGxvdyB0byB1c2UgbW9yZSB0aGFuIG9uZSBzY29wZWQgbmFtZXNwYWNlIGluIGEgcGF0aC5cbmZ1bmN0aW9uIGlzVmFsaWRTY29wZVBhdGgoc2NvcGVQYXRoOiBzdHJpbmcsIHNjb3BlUHJlZml4OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKGBeJHtlc2NhcGVTdHJpbmdSZWdleHAoc2NvcGVQcmVmaXgpfVtcXC1fMC05QS16L10rYClcbiAgICByZXR1cm4gcmVnZXgudGVzdChzY29wZVBhdGgpICYmIHNjb3BlUGF0aC5zcGxpdChzY29wZVByZWZpeCkubGVuZ3RoID09IDJcbn1cblxuZnVuY3Rpb24gaXNaZXJvU2NvcGUoc2NvcGVzOiBBcnJheSA8ID8gc2NvcGVUeXBlID4gKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHNjb3Blcy5sZW5ndGggPT09IDBcbn1cblxuXG5mdW5jdGlvbiBpc1ZhbGlkU2NvcGVOYW1lKHNjb3BlTmFtZTpzdHJpbmcsc2NvcGVQcmVmaXg6c3RyaW5nKTpib29sZWFue1xuICAgIGxldCByZWdleCA9IG5ldyBSZWdFeHAoYF4ke2VzY2FwZVN0cmluZ1JlZ2V4cChzY29wZVByZWZpeCl9W1xcLV8wLTlBLXovXSskYClcblxuICAgIHJldHVybiAgcmVnZXgudGVzdChzY29wZU5hbWUpXG59XG5cbmZ1bmN0aW9uIGdldFN0cmV0Y2hlZFNjb3BlUHJlZml4UGF0aChzY29wZVByZWZpeFBhdGg6IHN0cmluZywgc3RhdGU6IHN0YXRlVHlwZSwgb3B0czogT3B0aW9ucyk6ID8gc3RyaW5nIHtcbiAgICBsZXQgc3RyZXRjaGVkU2NvcGVQcmVmaXhQYXRoOiA/IHN0cmluZztcbiAgICBjb25zdCB7IGN3ZH0gPSBzdGF0ZVxuICAgIGNvbnN0IHsgcm9vdFByZWZpeCwgc2NvcGVQcmVmaXgsIHNjb3BlcyB9ID0gb3B0c1xuICAgIGNvbnNvbGUubG9nKHNjb3BlUHJlZml4UGF0aCxzY29wZXMpXG4gICAgc2NvcGVzLnNvbWUoc2NvcGUgPT4ge1xuICAgICAgICBpZiAoIXNjb3BlKSByZXR1cm4gZmFsc2VcbiAgICAgICAgY29uc3QgeyBuYW1lLCBkaXJ9ID0gc2NvcGUgICAgICAgIFxuICAgICAgICBpZiAoIW5hbWUgfHwgIWRpcikgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmIChpc1ZhbGlkU2NvcGVOYW1lKG5hbWUsc2NvcGVQcmVmaXgpICYmIHNjb3BlUHJlZml4UGF0aC5zdGFydHNXaXRoKG5hbWUpKSB7XG4gICAgICAgICAgICBjb25zdCBzdHJldGNoZWREaXIgPSBkaXIucmVwbGFjZShyb290UHJlZml4LCBjd2QpXG4gICAgICAgICAgICBzdHJldGNoZWRTY29wZVByZWZpeFBhdGggPSBzY29wZVByZWZpeFBhdGgucmVwbGFjZShuYW1lLCBzdHJldGNoZWREaXIpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0pXG5cbiAgICByZXR1cm4gc3RyZXRjaGVkU2NvcGVQcmVmaXhQYXRoXG59IiwiY29uc3QgU3RvcmUgPSB7IHJlc29sdmU6IHt9LCBlamVjdDoge30gfVxuY29uc3QgZWplY3RWYWx1ZSA9ICdfX1RIRV9JVEVNX1dBU19FSkVDVEVEX18nXG5cbmNvbnN0IHsgcmVzb2x2ZSwgZWplY3QgfSA9IFN0b3JlXG5jb25zdCByZXNvbHZlSXRlbSA9IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgIGlmIChuYW1lIGluIHJlc29sdmUpIHJldHVyblxuICAgIHJlc29sdmVbbmFtZV0gPSB2YWx1ZVxufVxuY29uc3QgZWplY3RJdGVtID0gKG5hbWUpID0+IHtcbiAgICBpZiAobmFtZSBpbiBlamVjdCkgcmV0dXJuXG4gICAgZWplY3RbbmFtZV0gPSBlamVjdFZhbHVlXG59XG5leHBvcnQge1xuICAgIHJlc29sdmUsXG4gICAgZWplY3QsXG4gICAgcmVzb2x2ZUl0ZW0sXG4gICAgZWplY3RJdGVtXG59IiwiaW1wb3J0IFBsdWdpbiBmcm9tICcuL1BsdWdpbkNsYXNzLmpzJ1xuaW1wb3J0IG1ldGhvZFBhaXJzIGZyb20gJy4vbG9jYWxTY29wZWRNb2R1bGVzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih7IHR5cGVzOiB0IH0pIHtcbiAgICBsZXQgcGx1Z2luSW5zdGFuY2UgPSBuZXcgUGx1Z2luKCk7XG4gICAgbWV0aG9kUGFpcnMuZm9yRWFjaChtZXRob2QgPT4ge1xuICAgICAgICBsZXQgeyBuYW1lLCBmbiB9ID0gbWV0aG9kXG4gICAgICAgIHBsdWdpbkluc3RhbmNlLmFkZE1ldGhvZChuYW1lLCBmbilcbiAgICB9KVxuICAgIGxldCB2aXNpdG9yID0gcGx1Z2luSW5zdGFuY2UuZ2V0VmlzaXRvcigpXG4gICAgcmV0dXJuIHsgdmlzaXRvciB9XG59Il19
