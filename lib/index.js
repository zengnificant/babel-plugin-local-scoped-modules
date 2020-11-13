(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$979c91c4_e01b_4d6c_8354_3fce1b1bdcfe = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./config":7,"./flatScopes.js":8,"./utils/getRelativePath.js":11,"@babel/runtime/helpers/interopRequireDefault":4,"@babel/runtime/helpers/objectSpread":5}],10:[function(require,module,exports){
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
exports["default"] = getRelativePath;

var _pathUtils = require("./pathUtils.js");

var _escapeStringRegexp = _interopRequireDefault(require("./escape-string-regexp"));

var _pathStoreManager = require("./pathStoreManager.js");

function getRelativePath(targetPath, state, opts) {
  var absolutePath, relativePath;
  var cacheTargetPath = targetPath;

  if (cacheTargetPath in _pathStoreManager.eject) {
    return;
  }

  var filename = state.filename;

  if (cacheTargetPath in _pathStoreManager.resolve) {
    absolutePath = _pathStoreManager.resolve[cacheTargetPath];
    relativePath = (0, _pathUtils.pathRelative)(filename, absolutePath);
    return relativePath;
  }

  absolutePath = getAbsolutePath(targetPath, state, opts);

  if (!absolutePath) {
    (0, _pathStoreManager.ejectItem)(cacheTargetPath);
    return;
  }

  (0, _pathStoreManager.resolveItem)(cacheTargetPath, absolutePath);
  relativePath = (0, _pathUtils.pathRelative)(filename, absolutePath);
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

},{"./escape-string-regexp":10,"./pathStoreManager.js":12,"./pathUtils.js":13,"@babel/runtime/helpers/interopRequireDefault":4}],12:[function(require,module,exports){
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
  cur = (0, _path.normalize)(cur);
  target = (0, _path.normalize)(target);
  var curDirname, targetDirname, targetBasename, relativePath;
  var curType = getPathType(cur);
  var targetType = getPathType(target);
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

},{"./PluginClass.js":6,"./localScopedModules":9,"@babel/runtime/helpers/interopRequireDefault":4}]},{},[14])(14)
});
