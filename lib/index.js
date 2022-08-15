(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$afcb3bb4_1cba_48f4_8571_7064308a8b06 = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

var _getRelativePath = _interopRequireDefault(require("./utils/getRelativePath.js"));

var getSourceFromBinaryExpression = function getSourceFromBinaryExpression(source) {
  while (source.type === "BinaryExpression") {
    var left = source.left;

    if (left.type === "BinaryExpression") {
      source = source.left;
      continue;
    }

    if (left.type === 'StringLiteral' && source.operator === '+') {
      return left;
    } else if (left.type === 'TemplateLiteral' && source.operator === '+') {
      return left;
    } else {
      break;
    }
  }

  return;
};

var dealWithSource = function dealWithSource(source) {
  return function (state, opts) {
    if (source.type === "BinaryExpression") {
      source = getSourceFromBinaryExpression(source);
    }

    if (source.type === 'CallExpression') {
      source = source.callee.object;
    }

    if (!source) return;

    if (source.type === 'StringLiteral') {
      return dealWithSourceOfStringLiteral(source, state, opts);
    }

    if (source.type === 'TemplateLiteral') {
      return dealWithSourceOfTemplateLiteral(source, state, opts);
    }
  };
};

var dealWithSourceOfStringLiteral = function dealWithSourceOfStringLiteral(source, state, opts) {
  var targetPath = source.value;
  var relativePath = (0, _getRelativePath["default"])(targetPath, state, opts);
  if (!relativePath) return;
  source.value = relativePath;
};

var dealWithSourceOfTemplateLiteral = function dealWithSourceOfTemplateLiteral(source, state, opts) {
  source = source.quasis[0];
  var _source$value = source.value,
      raw = _source$value.raw,
      cooked = _source$value.cooked;
  var targetPath = raw;
  var relativePath = (0, _getRelativePath["default"])(targetPath, state, opts);
  if (!relativePath) return;
  source.value = {
    raw: relativePath,
    cooked: relativePath
  };
};

var _default = dealWithSource;
exports["default"] = _default;

},{"./utils/getRelativePath.js":13,"@babel/runtime/helpers/interopRequireDefault":4}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function getSource(path, methodname, opts) {
  var source;

  if (methodname === 'CallExpression') {
    if (!Array.isArray(opts.calleeNames)) {
      opts.calleeNames = [];
    }

    if (!opts.calleeNames.includes('require')) {
      opts.calleeNames.push('require');
    }

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

  return source;
}

var _default = getSource;
exports["default"] = _default;

},{}],10:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _config = _interopRequireDefault(require("./config"));

var _dealWithSource = _interopRequireDefault(require("./dealWithSource.js"));

var _getSource = _interopRequireDefault(require("./getSource.js"));

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
  var source = (0, _getSource["default"])(path, methodname, opts);
  if (!source) return;
  return (0, _dealWithSource["default"])(source)(state, opts);
}

},{"./config":7,"./dealWithSource.js":8,"./getSource.js":9,"@babel/runtime/helpers/interopRequireDefault":4,"@babel/runtime/helpers/objectSpread":5}],11:[function(require,module,exports){
//Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
'use strict';

var matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;

module.exports = function (string) {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string');
  }

  return string.replace(matchOperatorsRegex, '\\$&');
};

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{"./escape-string-regexp":11,"./flatScopes.js":12,"./pathStoreManager.js":14,"./pathUtils.js":15,"@babel/runtime/helpers/interopRequireDefault":4,"path":"path"}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{"fs":"fs","path":"path"}],16:[function(require,module,exports){
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

},{"./PluginClass.js":6,"./localScopedModules":10,"@babel/runtime/helpers/interopRequireDefault":4}]},{},[16])(16)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RTcHJlYWQuanMiLCJzcmMvUGx1Z2luQ2xhc3MuanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL2NvbmZpZy5qcyIsInNyYy9sb2NhbFNjb3BlZE1vZHVsZXMvZGVhbFdpdGhTb3VyY2UuanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL2dldFNvdXJjZS5qcyIsInNyYy9sb2NhbFNjb3BlZE1vZHVsZXMvaW5kZXguanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL3V0aWxzL2VzY2FwZS1zdHJpbmctcmVnZXhwLmpzIiwic3JjL2xvY2FsU2NvcGVkTW9kdWxlcy91dGlscy9mbGF0U2NvcGVzLmpzIiwic3JjL2xvY2FsU2NvcGVkTW9kdWxlcy91dGlscy9nZXRSZWxhdGl2ZVBhdGguanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL3V0aWxzL3BhdGhTdG9yZU1hbmFnZXIuanMiLCJzcmMvbG9jYWxTY29wZWRNb2R1bGVzL3V0aWxzL3BhdGhVdGlscy5qcyIsImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LFFBQWQsQ0FBdUIsU0FBdkIsQ0FBSixFQUFpQztBQUM3QixJQUFBLFlBQVksSUFBSSxTQUFoQjtBQUNIOztBQUNELE1BQUksY0FBSixFQUFvQixZQUFZLEdBQUcsZ0JBQUssWUFBTCxFQUFtQixjQUFuQixDQUFmOztBQUVwQixNQUFJLGFBQWEsQ0FBQyxPQUFkLENBQXNCLFVBQXRCLElBQW9DLENBQUMsQ0FBekMsRUFBNEM7QUFDeEMsSUFBQSxZQUFZLEdBQUcsU0FBUyxHQUFHLFlBQTNCO0FBQ0g7O0FBQ0QsTUFBSSxZQUFZLENBQUMsUUFBYixDQUFzQixJQUF0QixDQUFKLEVBQWlDO0FBQzdCLElBQUEsWUFBWSxJQUFJLFNBQWhCO0FBQ0g7O0FBQ0QsU0FBTyxZQUFQO0FBQ0g7Ozs7Ozs7Ozs7OztBQ2pERDs7QUFDQTs7QUFFZSx3QkFBdUI7QUFBQSxNQUFMLENBQUssUUFBWixLQUFZO0FBQ2xDLE1BQUksY0FBYyxHQUFHLElBQUksdUJBQUosRUFBckI7O0FBQ0EsaUNBQVksT0FBWixDQUFvQixVQUFBLE1BQU0sRUFBSTtBQUFBLFFBQ3BCLElBRG9CLEdBQ1AsTUFETyxDQUNwQixJQURvQjtBQUFBLFFBQ2QsRUFEYyxHQUNQLE1BRE8sQ0FDZCxFQURjO0FBRTFCLElBQUEsY0FBYyxDQUFDLFNBQWYsQ0FBeUIsSUFBekIsRUFBK0IsRUFBL0I7QUFDSCxHQUhEOztBQUlBLE1BQUksT0FBTyxHQUFHLGNBQWMsQ0FBQyxVQUFmLEVBQWQ7QUFDQSxTQUFPO0FBQUUsSUFBQSxPQUFPLEVBQVA7QUFBRixHQUFQO0FBQ0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0OyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhY2hlZE1ldGhvZE5hbWVzID0gW11cbiAgICAgICAgdGhpcy52aXNpdG9yID0ge31cbiAgICB9XG4gICAgYWRkTWV0aG9kKG5hbWUsIGZuKSB7XG4gICAgICAgIGxldCBtZXRob2RuYW1lID0gbmFtZVxuICAgICAgICBpZiAobmFtZSBpbiB0aGlzLmNhY2hlZE1ldGhvZE5hbWVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWNoZWRNZXRob2ROYW1lcy5wdXNoKG5hbWUpXG4gICAgICAgIHRoaXMudmlzaXRvcltuYW1lXSA9IChwYXRoLCBzdGF0ZSkgPT4gZm4ocGF0aCwgc3RhdGUsIG1ldGhvZG5hbWUpXG4gICAgfVxuICAgIGdldFZpc2l0b3IoKSB7XG4gICAgICAgIGlmICh0aGlzLmNhY2hlZE1ldGhvZE5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRvclxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgcm9vdFByZWZpeDogJ34nLFxuICAgIHNjb3BlUHJlZml4OiAnQCcsXG4gICAgc2NvcGVzOiBbXSxcbiAgICBjYWxsZWVOYW1lczogWydyZXF1aXJlJ11cbn0iLCJpbXBvcnQgZ2V0UmVsYXRpdmVQYXRoIGZyb20gJy4vdXRpbHMvZ2V0UmVsYXRpdmVQYXRoLmpzJ1xuXG5cbmNvbnN0IGdldFNvdXJjZUZyb21CaW5hcnlFeHByZXNzaW9uID0gKHNvdXJjZSkgPT4ge1xuICAgIHdoaWxlIChzb3VyY2UudHlwZSA9PT0gXCJCaW5hcnlFeHByZXNzaW9uXCIpIHtcbiAgICAgICAgbGV0IGxlZnQgPSBzb3VyY2UubGVmdFxuICAgICAgICBpZiAobGVmdC50eXBlID09PSBcIkJpbmFyeUV4cHJlc3Npb25cIikge1xuICAgICAgICAgICAgc291cmNlID0gc291cmNlLmxlZnQ7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGVmdC50eXBlID09PSAnU3RyaW5nTGl0ZXJhbCcgJiYgc291cmNlLm9wZXJhdG9yID09PSAnKycpIHtcbiAgICAgICAgICAgIHJldHVybiBsZWZ0XG4gICAgICAgIH0gZWxzZSBpZiAobGVmdC50eXBlID09PSAnVGVtcGxhdGVMaXRlcmFsJyAmJiBzb3VyY2Uub3BlcmF0b3IgPT09ICcrJykge1xuICAgICAgICAgICAgcmV0dXJuIGxlZnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm47XG59XG5cblxuY29uc3QgZGVhbFdpdGhTb3VyY2UgPSBzb3VyY2UgPT4gKHN0YXRlLCBvcHRzKSA9PiB7XG4gICAgaWYgKHNvdXJjZS50eXBlID09PSBcIkJpbmFyeUV4cHJlc3Npb25cIikge1xuICAgICAgICBzb3VyY2UgPSBnZXRTb3VyY2VGcm9tQmluYXJ5RXhwcmVzc2lvbihzb3VyY2UpXG4gICAgfVxuICAgIGlmIChzb3VyY2UudHlwZSA9PT0gJ0NhbGxFeHByZXNzaW9uJykge1xuICAgICAgICBzb3VyY2UgPSBzb3VyY2UuY2FsbGVlLm9iamVjdDtcbiAgICB9XG5cbiAgICBpZiAoIXNvdXJjZSkgcmV0dXJuO1xuICAgIGlmIChzb3VyY2UudHlwZSA9PT0gJ1N0cmluZ0xpdGVyYWwnKSB7XG4gICAgICAgIHJldHVybiBkZWFsV2l0aFNvdXJjZU9mU3RyaW5nTGl0ZXJhbChzb3VyY2UsIHN0YXRlLCBvcHRzKVxuICAgIH1cbiAgICBpZiAoc291cmNlLnR5cGUgPT09ICdUZW1wbGF0ZUxpdGVyYWwnKSB7XG4gICAgICAgIHJldHVybiBkZWFsV2l0aFNvdXJjZU9mVGVtcGxhdGVMaXRlcmFsKHNvdXJjZSwgc3RhdGUsIG9wdHMpXG4gICAgfVxuXG59XG5cblxuY29uc3QgZGVhbFdpdGhTb3VyY2VPZlN0cmluZ0xpdGVyYWwgPSAoc291cmNlLCBzdGF0ZSwgb3B0cykgPT4ge1xuICAgIGxldCB0YXJnZXRQYXRoID0gc291cmNlLnZhbHVlXG4gICAgbGV0IHJlbGF0aXZlUGF0aCA9IGdldFJlbGF0aXZlUGF0aCh0YXJnZXRQYXRoLCBzdGF0ZSwgb3B0cyk7XG4gICAgaWYgKCFyZWxhdGl2ZVBhdGgpIHJldHVybjtcbiAgICBzb3VyY2UudmFsdWUgPSByZWxhdGl2ZVBhdGg7XG59XG5jb25zdCBkZWFsV2l0aFNvdXJjZU9mVGVtcGxhdGVMaXRlcmFsID0gKHNvdXJjZSwgc3RhdGUsIG9wdHMpID0+IHtcbiAgICBzb3VyY2UgPSBzb3VyY2UucXVhc2lzWzBdO1xuICAgIGNvbnN0IHsgcmF3LCBjb29rZWQgfSA9IHNvdXJjZS52YWx1ZTtcbiAgICBsZXQgdGFyZ2V0UGF0aCA9IHJhdztcbiAgICBsZXQgcmVsYXRpdmVQYXRoID0gZ2V0UmVsYXRpdmVQYXRoKHRhcmdldFBhdGgsIHN0YXRlLCBvcHRzKVxuICAgIGlmICghcmVsYXRpdmVQYXRoKSByZXR1cm47XG4gICAgc291cmNlLnZhbHVlID0geyByYXc6IHJlbGF0aXZlUGF0aCwgY29va2VkOiByZWxhdGl2ZVBhdGggfTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBkZWFsV2l0aFNvdXJjZTsiLCJmdW5jdGlvbiBnZXRTb3VyY2UocGF0aCwgbWV0aG9kbmFtZSwgb3B0cykge1xuICAgIGxldCBzb3VyY2U7XG4gICAgaWYgKG1ldGhvZG5hbWUgPT09ICdDYWxsRXhwcmVzc2lvbicpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG9wdHMuY2FsbGVlTmFtZXMpKSB7XG4gICAgICAgICAgICBvcHRzLmNhbGxlZU5hbWVzID0gW11cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9wdHMuY2FsbGVlTmFtZXMuaW5jbHVkZXMoJ3JlcXVpcmUnKSkge1xuICAgICAgICAgICAgb3B0cy5jYWxsZWVOYW1lcy5wdXNoKCdyZXF1aXJlJylcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2FsbGVlTmFtZSA9IHBhdGgubm9kZS5jYWxsZWUubmFtZVxuICAgICAgICBjb25zdCB7IGNhbGxlZU5hbWVzIH0gPSBvcHRzXG4gICAgICAgIGlmICghY2FsbGVlTmFtZXMuaW5jbHVkZXMoY2FsbGVlTmFtZSkpIHJldHVybjtcbiAgICAgICAgY29uc3QgYXJncyA9IHBhdGgubm9kZS5hcmd1bWVudHM7XG4gICAgICAgIGlmICghYXJncy5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgc291cmNlID0gcGF0aC5ub2RlLmFyZ3VtZW50c1swXVxuICAgIH1cblxuICAgIGlmIChwYXRoLm5vZGUuc291cmNlKSB7XG4gICAgICAgIHNvdXJjZSA9IHBhdGgubm9kZS5zb3VyY2VcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZVxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgZ2V0U291cmNlIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZydcbmltcG9ydCBkZWFsV2l0aFNvdXJjZSBmcm9tICcuL2RlYWxXaXRoU291cmNlLmpzJ1xuaW1wb3J0IGdldFNvdXJjZSBmcm9tICcuL2dldFNvdXJjZS5qcydcbmNvbnN0IG1ldGhvZE5hbWVzID0gW1xuICAgIFwiQ2FsbEV4cHJlc3Npb25cIixcbiAgICBcIkltcG9ydERlY2xhcmF0aW9uXCIsXG4gICAgXCJFeHBvcnROYW1lZERlY2xhcmF0aW9uXCIsXG4gICAgXCJFeHBvcnRBbGxEZWNsYXJhdGlvblwiLFxuXVxubGV0IG1ldGhvZFBhaXJzID0gbWV0aG9kTmFtZXMubWFwKG5hbWUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGZuOiBteUZuXG4gICAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQgbWV0aG9kUGFpcnNcblxuZnVuY3Rpb24gbXlGbihwYXRoLCBzdGF0ZSwgbWV0aG9kbmFtZSkge1xuICAgIGxldCBvcHRzID0geyAuLi5jb25maWcsIC4uLnN0YXRlLm9wdHMgfVxuICAgIGxldCBzb3VyY2UgPSBnZXRTb3VyY2UocGF0aCwgbWV0aG9kbmFtZSwgb3B0cylcbiAgICBpZiAoIXNvdXJjZSkgcmV0dXJuO1xuICAgIHJldHVybiBkZWFsV2l0aFNvdXJjZShzb3VyY2UpKHN0YXRlLCBvcHRzKVxufSIsIi8vQ29weXJpZ2h0IChjKSBTaW5kcmUgU29yaHVzIDxzaW5kcmVzb3JodXNAZ21haWwuY29tPiAoc2luZHJlc29yaHVzLmNvbSlcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWF0Y2hPcGVyYXRvcnNSZWdleCA9IC9bfFxcXFx7fSgpW1xcXV4kKyo/Li1dL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RyaW5nID0+IHtcbiAgICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UobWF0Y2hPcGVyYXRvcnNSZWdleCwgJ1xcXFwkJicpO1xufTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzY29wZXMpIHtcbiAgICBsZXQgZmxhdFNjb3BlcyA9IFtdXG4gICAgc2NvcGVzLmZvckVhY2goKHNjb3BlLCBpbmRleCkgPT4ge1xuICAgICAgICBsZXQgeyBuYW1lLCBhbGlhcywgZGlyIH0gPSBzY29wZVxuICAgICAgICBmbGF0U2NvcGVzLnB1c2goeyBuYW1lLCBkaXIgfSlcbiAgICAgICAgaWYgKCFhbGlhcykgcmV0dXJuO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhbGlhcykpIHtcbiAgICAgICAgICAgIGFsaWFzLmZvckVhY2gobmFtZSA9PiBmbGF0U2NvcGVzLnB1c2goeyBuYW1lLCBkaXIgfSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmbGF0U2NvcGVzLnB1c2goeyBuYW1lOiBhbGlhcywgZGlyIH0pXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGZsYXRTY29wZXNcbn0iLCIvL0BmbG93XG5pbXBvcnQgeyBwYXRoUmVsYXRpdmUgfSBmcm9tICcuL3BhdGhVdGlscy5qcydcbmltcG9ydCBlc2NhcGVTdHJpbmdSZWdleHAgZnJvbSAnLi9lc2NhcGUtc3RyaW5nLXJlZ2V4cCdcbmltcG9ydCB7IHJlc29sdmUsIGVqZWN0LCByZXNvbHZlSXRlbSwgZWplY3RJdGVtIH0gZnJvbSAnLi9wYXRoU3RvcmVNYW5hZ2VyLmpzJ1xuaW1wb3J0IGZsYXRTY29wZXMgZnJvbSAnLi9mbGF0U2NvcGVzLmpzJ1xuaW1wb3J0IHsgbm9ybWFsaXplLHNlcCB9IGZyb20gJ3BhdGgnXG50eXBlIHNjb3BlVHlwZSA9IHsgbmFtZTogc3RyaW5nLCBkaXI6IHN0cmluZyB9O1xudHlwZSBzdGF0ZVR5cGUgPSB7IGZpbGVuYW1lOiBzdHJpbmcsIGN3ZDogc3RyaW5nIH07XG50eXBlIE9wdGlvbnMgPSB7IHJvb3RQcmVmaXg6IHN0cmluZywgc2NvcGVQcmVmaXg6IHN0cmluZywgc2NvcGVzOiBBcnJheSA8ID8gc2NvcGVUeXBlID4gfTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFJlbGF0aXZlUGF0aCh0YXJnZXRQYXRoOiBzdHJpbmcsIHN0YXRlOiBzdGF0ZVR5cGUsIG9wdHM6IE9wdGlvbnMpOiA/IHN0cmluZyB7XG4gICAgXG4gICAgY29uc3QgeyBjd2QsIGZpbGVuYW1lIH0gPSBzdGF0ZVxuICAgIGNvbnN0IHsgcm9vdFByZWZpeCwgc2NvcGVQcmVmaXggfSA9IG9wdHNcbiAgICBjb25zdCBjYWNoZVRhcmdldFBhdGggPSB0YXJnZXRQYXRoXG4gICAgaWYgKGNhY2hlVGFyZ2V0UGF0aCBpbiBlamVjdCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBzY29wZXMgPSBmbGF0U2NvcGVzKG9wdHMuc2NvcGVzKTtcbiAgICBjb25zdCByb290U2NvcGUgPSB7IG5hbWU6IHJvb3RQcmVmaXgsIGRpcjogY3dkIH1cbiAgICBzY29wZXMudW5zaGlmdChyb290U2NvcGUpXG4gICAgbGV0IHNjb3BlTmFtZSA9IGdldFNjb3BlTmFtZSh0YXJnZXRQYXRoKVxuICAgIGlmICghc2NvcGVOYW1lKSB7XG4gICAgICAgIGVqZWN0SXRlbShjYWNoZVRhcmdldFBhdGgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCByZWxhdGl2ZVN0cmluZyA9IGdldFJlbGF0aXZlU3RyaW5nKCksXG4gICAgICAgIHNjb3BlRGljdCA9IHRyYW5zZm9ybVNjb3Blc1RvRGljdCgpLFxuICAgICAgICByZXN0UGF0aDEgPSBzY29wZU5hbWUgPT09IHJvb3RQcmVmaXggPyAnJyA6IHNjb3BlRGljdFtzY29wZU5hbWVdLnNsaWNlKHJvb3RQcmVmaXgubGVuZ3RoKSxcbiAgICAgICAgcmVzdFBhdGgyID0gdGFyZ2V0UGF0aC5zbGljZShzY29wZU5hbWUubGVuZ3RoKSxcbiAgICAgICAgd2hvbGVQYXRoID0gcmVsYXRpdmVTdHJpbmcgKyBub3JtYWxpemUocmVzdFBhdGgxICsgcmVzdFBhdGgyKVxuICAgIHJldHVybiB3aG9sZVBhdGgucmVwbGFjZShzZXAgKyBzZXAsIHNlcClcblxuXG4gICAgZnVuY3Rpb24gZ2V0UmVsYXRpdmVTdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBwYXRoUmVsYXRpdmUoZmlsZW5hbWUsIGN3ZClcbiAgICB9XG4gICAgLy9kb24ndCBhbGxvdyB0byB1c2UgbW9yZSB0aGFuIG9uZSBzY29wZWQgbmFtZXNwYWNlIGluIGEgcGF0aC5cbiAgICBmdW5jdGlvbiBnZXRTY29wZU5hbWUodGFyZ2V0UGF0aCk6ID8gc3RyaW5nIHtcbiAgICAgICAgaWYgKCFpc1ZhbGlkU2NvcGVOYW1lKHRhcmdldFBhdGgpKSByZXR1cm47XG4gICAgICAgIGxldCBzY29wZU5hbWU7XG4gICAgICAgIHNjb3Blcy5zb21lKHNjb3BlID0+IHtcbiAgICAgICAgICAgIGxldCBjdXJTY29wZU5hbWUgPSBzY29wZS5uYW1lXG4gICAgICAgICAgICBpZiAodGFyZ2V0UGF0aCA9PT0gY3VyU2NvcGVOYW1lIHx8ICh0YXJnZXRQYXRoLnN0YXJ0c1dpdGgoYCR7Y3VyU2NvcGVOYW1lfS9gKSAmJiB0YXJnZXRQYXRoLnNwbGl0KGN1clNjb3BlTmFtZSkubGVuZ3RoID09PSAyKSkge1xuICAgICAgICAgICAgICAgIHNjb3BlTmFtZSA9IGN1clNjb3BlTmFtZVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2NvcGVOYW1lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmFsaWRTY29wZU5hbWUodGFyZ2V0UGF0aDogc3RyaW5nKSA6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKGBeJHtlc2NhcGVTdHJpbmdSZWdleHAoc2NvcGVQcmVmaXgpfVtcXC1fMC05QS16L10rYClcblxuICAgICAgICByZXR1cm4gdGFyZ2V0UGF0aD1yb290UHJlZml4fHxcbiAgICAgICAgKHRhcmdldFBhdGguc3RhcnRzV2l0aChgJHtyb290UHJlZml4fS9gKSAmJiB0YXJnZXRQYXRoLnNwbGl0KHJvb3RQcmVmaXgpLmxlbmd0aCA9PT0gMikgfHxcbiAgICAgICAgICAgIChyZWdleC50ZXN0KHRhcmdldFBhdGgpICYmIHRhcmdldFBhdGguc3BsaXQoc2NvcGVQcmVmaXgpLmxlbmd0aCA9PT0gMilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1TY29wZXNUb0RpY3QoKSB7XG4gICAgICAgIHJldHVybiBzY29wZXMucmVkdWNlKChhYywgZWwpID0+IHtcbiAgICAgICAgICAgIGFjW2VsWyduYW1lJ11dID0gZWxbJ2RpciddXG4gICAgICAgICAgICByZXR1cm4gYWNcbiAgICAgICAgfSwge30pXG4gICAgfVxufSIsImNvbnN0IFN0b3JlID0geyByZXNvbHZlOiB7fSwgZWplY3Q6IHt9IH1cbmNvbnN0IGVqZWN0VmFsdWUgPSAnX19USEVfSVRFTV9XQVNfRUpFQ1RFRF9fJ1xuXG5jb25zdCB7IHJlc29sdmUsIGVqZWN0IH0gPSBTdG9yZVxuY29uc3QgcmVzb2x2ZUl0ZW0gPSAobmFtZSwgdmFsdWUpID0+IHtcbiAgICBpZiAobmFtZSBpbiByZXNvbHZlKSByZXR1cm5cbiAgICByZXNvbHZlW25hbWVdID0gdmFsdWVcbn1cbmNvbnN0IGVqZWN0SXRlbSA9IChuYW1lKSA9PiB7XG4gICAgaWYgKG5hbWUgaW4gZWplY3QpIHJldHVyblxuICAgIGVqZWN0W25hbWVdID0gZWplY3RWYWx1ZVxufVxuZXhwb3J0IHtcbiAgICByZXNvbHZlLFxuICAgIGVqZWN0LFxuICAgIHJlc29sdmVJdGVtLFxuICAgIGVqZWN0SXRlbVxufSIsImltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tICdmcydcbmltcG9ydCB7IGJhc2VuYW1lLCBub3JtYWxpemUsIGRpcm5hbWUsIGpvaW4sIHNlcCwgcmVsYXRpdmUgYXMgc3lzUmVsYXRpdmUgfSBmcm9tICdwYXRoJ1xuXG5jb25zdCBjdXJQcmVmaXggPSAnLicgKyBzZXBcblxuZnVuY3Rpb24gZ2V0UGF0aFR5cGUoYWJzUGF0aCkge1xuICAgIGFic1BhdGggPSBub3JtYWxpemUoYWJzUGF0aClcbiAgICBpZiAoZXhpc3RzU3luYyhhYnNQYXRoICsgJy5qcycpIHx8IGV4aXN0c1N5bmMoYWJzUGF0aCArICcuanNvbicpKSB7XG4gICAgICAgIHJldHVybiAnZmlsZSdcbiAgICB9XG4gICAgY29uc3QgZGlyID0gYmFzZW5hbWUoYWJzUGF0aClcbiAgICBpZiAoZGlyLmluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiAnZmlsZSdcbiAgICB9XG4gICAgcmV0dXJuICdkaXInXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoUmVsYXRpdmUoY3VyLCB0YXJnZXQsIG9wdHMgPSB7fSkge1xuICAgIGN1ciA9IG5vcm1hbGl6ZShjdXIpXG4gICAgdGFyZ2V0ID0gbm9ybWFsaXplKHRhcmdldClcblxuICAgIGxldCBjdXJEaXJuYW1lLCB0YXJnZXREaXJuYW1lLCB0YXJnZXRCYXNlbmFtZSwgcmVsYXRpdmVQYXRoXG4gICAgbGV0IHsgaXNEaXIgfSA9IG9wdHNcblxuICAgIGNvbnN0IGN1clR5cGUgPSBnZXRQYXRoVHlwZShjdXIpXG4gICAgY29uc3QgdGFyZ2V0VHlwZSA9IGlzRGlyID09IHRydWUgPyBcImRpclwiIDogZ2V0UGF0aFR5cGUodGFyZ2V0KVxuICAgIGN1ckRpcm5hbWUgPSBjdXJcbiAgICBpZiAoY3VyVHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgIGN1ckRpcm5hbWUgPSBkaXJuYW1lKGN1cilcbiAgICB9XG4gICAgdGFyZ2V0RGlybmFtZSA9IHRhcmdldFxuXG4gICAgaWYgKHRhcmdldFR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICB0YXJnZXREaXJuYW1lID0gZGlybmFtZSh0YXJnZXQpXG4gICAgICAgIHRhcmdldEJhc2VuYW1lID0gYmFzZW5hbWUodGFyZ2V0KVxuICAgIH1cbiAgICByZWxhdGl2ZVBhdGggPSBzeXNSZWxhdGl2ZShjdXJEaXJuYW1lLCB0YXJnZXREaXJuYW1lKVxuICAgIGlmICh0YXJnZXREaXJuYW1lLmVuZHNXaXRoKHNlcCkpIHtcbiAgICAgICAgcmVsYXRpdmVQYXRoICs9IHNlcFxuICAgIH1cbiAgICBpZiAodGFyZ2V0QmFzZW5hbWUpIHJlbGF0aXZlUGF0aCA9IGpvaW4ocmVsYXRpdmVQYXRoLCB0YXJnZXRCYXNlbmFtZSlcblxuICAgIGlmICh0YXJnZXREaXJuYW1lLmluZGV4T2YoY3VyRGlybmFtZSkgPiAtMSkge1xuICAgICAgICByZWxhdGl2ZVBhdGggPSBjdXJQcmVmaXggKyByZWxhdGl2ZVBhdGhcbiAgICB9XG4gICAgaWYgKHJlbGF0aXZlUGF0aC5lbmRzV2l0aCgnLi4nKSkge1xuICAgICAgICByZWxhdGl2ZVBhdGggKz0gc2VwXG4gICAgfVxuICAgIHJldHVybiByZWxhdGl2ZVBhdGhcbn0iLCJpbXBvcnQgUGx1Z2luIGZyb20gJy4vUGx1Z2luQ2xhc3MuanMnXG5pbXBvcnQgbWV0aG9kUGFpcnMgZnJvbSAnLi9sb2NhbFNjb3BlZE1vZHVsZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHsgdHlwZXM6IHQgfSkge1xuICAgIGxldCBwbHVnaW5JbnN0YW5jZSA9IG5ldyBQbHVnaW4oKTtcbiAgICBtZXRob2RQYWlycy5mb3JFYWNoKG1ldGhvZCA9PiB7XG4gICAgICAgIGxldCB7IG5hbWUsIGZuIH0gPSBtZXRob2RcbiAgICAgICAgcGx1Z2luSW5zdGFuY2UuYWRkTWV0aG9kKG5hbWUsIGZuKVxuICAgIH0pXG4gICAgbGV0IHZpc2l0b3IgPSBwbHVnaW5JbnN0YW5jZS5nZXRWaXNpdG9yKClcbiAgICByZXR1cm4geyB2aXNpdG9yIH1cbn0iXX0=
