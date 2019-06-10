(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$0e4deb22_14a7_40a3_9a10_b7f58124cfe9 = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

var _pathStoreManager = _interopRequireDefault(require("./pathStoreManager.js"));

function getRelativePath(targetPath, state, opts) {
  var targetDirname, relativePath;
  var cacheTargetPath = targetPath;
  var filename = state.filename;

  var curDirname = _path["default"].dirname(filename);

  var store = _pathStoreManager["default"].getStore();

  if (cacheTargetPath in store) {
    targetDirname = store[cacheTargetPath];
    relativePath = _path["default"].relative(curDirname, targetDirname);
    return relativePath;
  }

  var absolutePath = getAbsolutePath(targetPath, state, opts);
  if (!absolutePath) return;
  var absolutePathType = (0, _getPathType["default"])(absolutePath);
  if (!absolutePathType) return;
  targetDirname = absolutePath;
  if (absolutePathType === 'file') targetDirname = _path["default"].dirname(absolutePath);

  _pathStoreManager["default"].addItem(cacheTargetPath, targetDirname);

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

},{"./getPathType.js":9,"./pathStoreManager.js":11,"@babel/runtime/helpers/interopRequireDefault":4,"path":"path"}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Store = {};
var _default = {
  getStore: function getStore() {
    return Store;
  },
  addItem: function addItem(name, value) {
    if (name in Store) return;
    Store[name] = value;
  }
};
exports["default"] = _default;

},{}],12:[function(require,module,exports){
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

},{"./PluginClass.js":6,"./localScopedModules":8,"@babel/runtime/helpers/interopRequireDefault":4}]},{},[12])(12)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RTcHJlYWQuanMiLCJzcmMvUGx1Z2luQ2xhc3MuanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL2NvbmZpZy5qcyIsInNyYy9sb2NhbFNjb3BlZE1vZHVsZXMvaW5kZXguanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL3V0aWxzL2dldFBhdGhUeXBlLmpzIiwic3JjL2xvY2FsU2NvcGVkTW9kdWxlcy91dGlscy9nZXRSZWxhdGl2ZVBhdGguanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL3V0aWxzL3BhdGhTdG9yZU1hbmFnZXIuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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bnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7IiwidmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4vZGVmaW5lUHJvcGVydHlcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG4gICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0U3ByZWFkOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FjaGVkTWV0aG9kTmFtZXMgPSBbXVxuICAgICAgICB0aGlzLnZpc2l0b3IgPSB7fVxuICAgIH1cbiAgICBhZGRNZXRob2QobmFtZSwgZm4pIHtcbiAgICAgICAgbGV0IG1ldGhvZG5hbWUgPSBuYW1lXG4gICAgICAgIGlmIChuYW1lIGluIHRoaXMuY2FjaGVkTWV0aG9kTmFtZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhY2hlZE1ldGhvZE5hbWVzLnB1c2gobmFtZSlcbiAgICAgICAgdGhpcy52aXNpdG9yW25hbWVdID0gKHBhdGgsIHN0YXRlKSA9PiBmbihwYXRoLCBzdGF0ZSwgbWV0aG9kbmFtZSlcbiAgICB9XG4gICAgZ2V0VmlzaXRvcigpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FjaGVkTWV0aG9kTmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge31cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy52aXNpdG9yXG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICByb290UHJlZml4OiAnficsXG4gICAgc2NvcGVQcmVmaXg6ICdAJyxcbiAgICBzY29wZXM6IFtdXG59IiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZydcbmltcG9ydCBnZXRSZWxhdGl2ZVBhdGggZnJvbSAnLi91dGlscy9nZXRSZWxhdGl2ZVBhdGguanMnXG5jb25zdCBtZXRob2ROYW1lcyA9IFtcbiAgICBcIkNhbGxFeHByZXNzaW9uXCIsXG4gICAgXCJJbXBvcnREZWNsYXJhdGlvblwiLFxuICAgIFwiRXhwb3J0TmFtZWREZWNsYXJhdGlvblwiLFxuICAgIFwiRXhwb3J0QWxsRGVjbGFyYXRpb25cIixcbl1cbmxldCBtZXRob2RQYWlycyA9IG1ldGhvZE5hbWVzLm1hcChuYW1lID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lLFxuICAgICAgICBmbjogbXlGblxuICAgIH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IG1ldGhvZFBhaXJzXG5cbmZ1bmN0aW9uIG15Rm4ocGF0aCwgc3RhdGUsIG1ldGhvZG5hbWUpIHtcbiAgICBsZXQgb3B0cyA9IHsgLi4uY29uZmlnLCAuLi5zdGF0ZS5vcHRzIH1cbiAgICBsZXQgc291cmNlID0gZ2V0U291cmNlKHBhdGgsIG1ldGhvZG5hbWUpXG4gICAgaWYgKCFzb3VyY2UpIHJldHVybjtcbiAgICBsZXQgdGFyZ2V0UGF0aCA9IHNvdXJjZS52YWx1ZVxuXG4gICAgbGV0IHJlbGF0aXZlUGF0aCA9IGdldFJlbGF0aXZlUGF0aCh0YXJnZXRQYXRoLCBzdGF0ZSwgb3B0cylcbiAgICBpZiAoIXJlbGF0aXZlUGF0aCkgcmV0dXJuO1xuICAgIHNvdXJjZS52YWx1ZSA9IHJlbGF0aXZlUGF0aFxuXG59XG5cbmZ1bmN0aW9uIGdldFNvdXJjZShwYXRoLCBtZXRob2RuYW1lKSB7XG4gICAgbGV0IHNvdXJjZTtcbiAgICBpZiAobWV0aG9kbmFtZSA9PT0gJ0NhbGxFeHByZXNzaW9uJykge1xuICAgICAgICBpZiAocGF0aC5ub2RlLmNhbGxlZS5uYW1lICE9PSAncmVxdWlyZScpIHJldHVybjtcbiAgICAgICAgY29uc3QgYXJncyA9IHBhdGgubm9kZS5hcmd1bWVudHM7XG4gICAgICAgIGlmICghYXJncy5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgc291cmNlID0gcGF0aC5ub2RlLmFyZ3VtZW50c1swXVxuICAgIH1cbiAgICBpZiAocGF0aC5ub2RlLnNvdXJjZSkge1xuICAgICAgICBzb3VyY2UgPSBwYXRoLm5vZGUuc291cmNlXG4gICAgfVxuICAgIGlmICghc291cmNlKSByZXR1cm5cbiAgICBpZiAoIXNvdXJjZS52YWx1ZSkgcmV0dXJuXG4gICAgcmV0dXJuIHNvdXJjZVxufSIsImltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmZ1bmN0aW9uIGV4aXN0c1N5bmMocGF0aCkge1xuICAgIHJldHVybiBmcy5leGlzdHNTeW5jKHBhdGgpXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UGF0aFR5cGUoYWJzUGF0aCkge1xuICAgIGFic1BhdGggPSBwYXRoLm5vcm1hbGl6ZShhYnNQYXRoKVxuICAgIGlmIChleGlzdHNTeW5jKGFic1BhdGggKyAnLmpzJykgfHwgZXhpc3RzU3luYyhhYnNQYXRoICsgJy5qc29uJykpIHtcbiAgICAgICAgcmV0dXJuICdmaWxlJ1xuICAgIH1cbiAgICBjb25zdCBiYXNlbmFtZSA9IHBhdGguYmFzZW5hbWUoYWJzUGF0aClcbiAgICBpZiAoYmFzZW5hbWUuaW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuICdmaWxlJ1xuICAgIH1cblxuICAgIHJldHVybiAnZGlyJ1xuXG5cbn0iLCIvL0BmbG93XG5pbXBvcnQgc3lzUGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGdldFBhdGhUeXBlIGZyb20gJy4vZ2V0UGF0aFR5cGUuanMnXG5pbXBvcnQgcGF0aFN0b3JlTWFuYWdlciBmcm9tICcuL3BhdGhTdG9yZU1hbmFnZXIuanMnXG50eXBlIHNjb3BlVHlwZSA9IHsgbmFtZTogc3RyaW5nLCBkaXI6IHN0cmluZyB9O1xudHlwZSBzdGF0ZVR5cGUgPSB7IGZpbGVuYW1lOiBzdHJpbmcsIGN3ZDogc3RyaW5nIH07XG50eXBlIE9wdGlvbnMgPSB7IHJvb3RQcmVmaXg6IHN0cmluZywgc2NvcGVQcmVmaXg6IHN0cmluZywgc2NvcGVzOiBBcnJheSA8ID8gc2NvcGVUeXBlID4gfTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UmVsYXRpdmVQYXRoKHRhcmdldFBhdGg6IHN0cmluZywgc3RhdGU6IHN0YXRlVHlwZSwgb3B0czogT3B0aW9ucyk6ID8gc3RyaW5nIHtcbiAgICBsZXQgdGFyZ2V0RGlybmFtZTogc3RyaW5nLCByZWxhdGl2ZVBhdGg6IHN0cmluZztcbiAgICBjb25zdCBjYWNoZVRhcmdldFBhdGggPSB0YXJnZXRQYXRoXG4gICAgY29uc3QgeyBmaWxlbmFtZSB9ID0gc3RhdGVcbiAgICBsZXQgY3VyRGlybmFtZTogc3RyaW5nID0gc3lzUGF0aC5kaXJuYW1lKGZpbGVuYW1lKVxuICAgIGNvbnN0IHN0b3JlID0gcGF0aFN0b3JlTWFuYWdlci5nZXRTdG9yZSgpXG4gICAgaWYgKGNhY2hlVGFyZ2V0UGF0aCBpbiBzdG9yZSkge1xuICAgICAgICB0YXJnZXREaXJuYW1lID0gc3RvcmVbY2FjaGVUYXJnZXRQYXRoXVxuICAgICAgICByZWxhdGl2ZVBhdGggPSBzeXNQYXRoLnJlbGF0aXZlKGN1ckRpcm5hbWUsIHRhcmdldERpcm5hbWUpXG4gICAgICAgIHJldHVybiByZWxhdGl2ZVBhdGhcbiAgICB9XG5cbiAgICBjb25zdCBhYnNvbHV0ZVBhdGg6ID8gc3RyaW5nID0gZ2V0QWJzb2x1dGVQYXRoKHRhcmdldFBhdGgsIHN0YXRlLCBvcHRzKVxuICAgIGlmICghYWJzb2x1dGVQYXRoKSByZXR1cm47XG4gICAgY29uc3QgYWJzb2x1dGVQYXRoVHlwZTogPyBzdHJpbmcgPSBnZXRQYXRoVHlwZShhYnNvbHV0ZVBhdGgpXG4gICAgaWYgKCFhYnNvbHV0ZVBhdGhUeXBlKSByZXR1cm47XG4gICAgdGFyZ2V0RGlybmFtZSA9IGFic29sdXRlUGF0aFxuICAgIGlmIChhYnNvbHV0ZVBhdGhUeXBlID09PSAnZmlsZScpIHRhcmdldERpcm5hbWUgPSBzeXNQYXRoLmRpcm5hbWUoYWJzb2x1dGVQYXRoKVxuICAgIHBhdGhTdG9yZU1hbmFnZXIuYWRkSXRlbShjYWNoZVRhcmdldFBhdGgsIHRhcmdldERpcm5hbWUpXG4gICAgcmVsYXRpdmVQYXRoID0gc3lzUGF0aC5yZWxhdGl2ZShjdXJEaXJuYW1lLCB0YXJnZXREaXJuYW1lKVxuICAgIHJldHVybiByZWxhdGl2ZVBhdGhcbn1cblxuXG5mdW5jdGlvbiBnZXRBYnNvbHV0ZVBhdGgodGFyZ2V0UGF0aDogc3RyaW5nLCBzdGF0ZTogc3RhdGVUeXBlLCBvcHRzOiBPcHRpb25zKSA6ID8gc3RyaW5nIHtcbiAgICBjb25zdCB7IGN3ZCB9ID0gc3RhdGVcbiAgICBjb25zdCB7IHJvb3RQcmVmaXgsIHNjb3BlUHJlZml4LCBzY29wZXMgfSA9IG9wdHNcbiAgICBpZiAoaXNWYWxpZFJvb3RQcmVmaXhQYXRoKHRhcmdldFBhdGgsIHJvb3RQcmVmaXgpKSB7XG4gICAgICAgIHJldHVybiBnZXRTdHJldGNoZWRSb290UHJlZml4UGF0aCh0YXJnZXRQYXRoLCBzdGF0ZSwgb3B0cylcbiAgICB9XG4gICAgaWYgKGlzWmVyb1Njb3BlKHNjb3BlcykpIHJldHVybjtcbiAgICBpZiAoIWlzVmFsaWRTY29wZVBhdGgodGFyZ2V0UGF0aCwgc2NvcGVQcmVmaXgpKSByZXR1cm47XG4gICAgcmV0dXJuIGdldFN0cmV0Y2hlZFNjb3BlUHJlZml4UGF0aCh0YXJnZXRQYXRoLCBzdGF0ZSwgb3B0cylcbn1cblxuZnVuY3Rpb24gaXNWYWxpZFJvb3RQcmVmaXhQYXRoKHNjb3BlUGF0aDogc3RyaW5nLCByb290UHJlZml4OiBzdHJpbmcpIDogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHNjb3BlUGF0aC5zdGFydHNXaXRoKGAke3Jvb3RQcmVmaXh9L2ApICYmIHNjb3BlUGF0aC5zcGxpdChyb290UHJlZml4KS5sZW5ndGggPT09IDJcbn1cblxuZnVuY3Rpb24gZ2V0U3RyZXRjaGVkUm9vdFByZWZpeFBhdGgodGFyZ2V0UGF0aDogc3RyaW5nLCBzdGF0ZTogc3RhdGVUeXBlLCBvcHRzOiBPcHRpb25zKTogc3RyaW5nIHtcbiAgICBjb25zdCB7IGN3ZCB9ID0gc3RhdGVcbiAgICBjb25zdCB7IHJvb3RQcmVmaXggfSA9IG9wdHNcbiAgICByZXR1cm4gdGFyZ2V0UGF0aC5yZXBsYWNlKHJvb3RQcmVmaXgsIGN3ZClcbn1cblxuLy9kb24ndCBhbGxvdyB0byB1c2UgbW9yZSB0aGFuIG9uZSBzY29wZWQgbmFtZXNwYWNlIGluIGEgcGF0aC5cbmZ1bmN0aW9uIGlzVmFsaWRTY29wZVBhdGgoc2NvcGVQYXRoOiBzdHJpbmcsIHNjb3BlUHJlZml4OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKGBeJHtzY29wZVByZWZpeH1cXFxcdytgKVxuICAgIHJldHVybiByZWdleC50ZXN0KHNjb3BlUGF0aCkgJiYgc2NvcGVQYXRoLnNwbGl0KHNjb3BlUHJlZml4KS5sZW5ndGggPT0gMlxufVxuXG5mdW5jdGlvbiBpc1plcm9TY29wZShzY29wZXM6IEFycmF5IDwgPyBzY29wZVR5cGUgPiApOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2NvcGVzLmxlbmd0aCA9PT0gMFxufVxuXG5mdW5jdGlvbiBnZXRTdHJldGNoZWRTY29wZVByZWZpeFBhdGgoc2NvcGVQcmVmaXhQYXRoOiBzdHJpbmcsIHN0YXRlOiBzdGF0ZVR5cGUsIG9wdHM6IE9wdGlvbnMpOiA/IHN0cmluZyB7XG4gICAgbGV0IHN0cmV0Y2hlZFNjb3BlUHJlZml4UGF0aDogPyBzdHJpbmc7XG4gICAgY29uc3QgeyBjd2QgfSA9IHN0YXRlXG4gICAgY29uc3QgeyByb290UHJlZml4LCBzY29wZVByZWZpeCwgc2NvcGVzIH0gPSBvcHRzXG5cbiAgICBzY29wZXMuc29tZShzY29wZSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbmFtZSwgZGlyIH0gPSBzY29wZVxuICAgICAgICBpZiAoIW5hbWUgfHwgIWRpcikgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoc2NvcGVQcmVmaXgpICYmIHNjb3BlUHJlZml4UGF0aC5zdGFydHNXaXRoKG5hbWUpKSB7XG4gICAgICAgICAgICBjb25zdCBzdHJldGNoZWREaXIgPSBkaXIucmVwbGFjZShyb290UHJlZml4LCBjd2QpXG4gICAgICAgICAgICBzdHJldGNoZWRTY29wZVByZWZpeFBhdGggPSBzY29wZVByZWZpeFBhdGgucmVwbGFjZShuYW1lLCBzdHJldGNoZWREaXIpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0pXG4gICAgcmV0dXJuIHN0cmV0Y2hlZFNjb3BlUHJlZml4UGF0aFxufSIsImNvbnN0IFN0b3JlID0ge31cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGdldFN0b3JlKCkge1xuICAgICAgICByZXR1cm4gU3RvcmVcbiAgICB9LFxuICAgIGFkZEl0ZW0obmFtZSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKG5hbWUgaW4gU3RvcmUpIHJldHVyblxuICAgICAgICBTdG9yZVtuYW1lXSA9IHZhbHVlXG4gICAgfVxufSIsImltcG9ydCBQbHVnaW4gZnJvbSAnLi9QbHVnaW5DbGFzcy5qcydcbmltcG9ydCBtZXRob2RQYWlycyBmcm9tICcuL2xvY2FsU2NvcGVkTW9kdWxlcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeyB0eXBlczogdCB9KSB7XG4gICAgbGV0IHBsdWdpbkluc3RhbmNlID0gbmV3IFBsdWdpbigpO1xuICAgIG1ldGhvZFBhaXJzLmZvckVhY2gobWV0aG9kID0+IHtcbiAgICAgICAgbGV0IHsgbmFtZSwgZm4gfSA9IG1ldGhvZFxuICAgICAgICBwbHVnaW5JbnN0YW5jZS5hZGRNZXRob2QobmFtZSwgZm4pXG4gICAgfSlcbiAgICBsZXQgdmlzaXRvciA9IHBsdWdpbkluc3RhbmNlLmdldFZpc2l0b3IoKVxuICAgIHJldHVybiB7IHZpc2l0b3IgfVxufSJdfQ==
