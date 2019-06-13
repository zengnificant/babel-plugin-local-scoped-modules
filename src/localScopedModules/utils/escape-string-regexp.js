//Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

'use strict';

var matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;

module.exports = string => {
    if (typeof string !== 'string') {
        throw new TypeError('Expected a string');
    }

    return string.replace(matchOperatorsRegex, '\\$&');
};