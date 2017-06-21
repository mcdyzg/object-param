# object-param

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe object-param here.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

var param = require('object-param')

/**
 * 功能和`Zepto.param`一样
 * @param obj {Object}
 * @param traditional {Boolean}
 * @returns {string}
 * param({ foo: { one: 1, two: 2 }}) // "foo[one]=1&foo[two]=2)"
 * param({ ids: [1,2,3] })           // "ids[]=1&ids[]=2&ids[]=3"
 * param({ ids: [1,2,3] }, true)     // "ids=1&ids=2&ids=3"
 * param({ foo: 'bar', nested: { will: 'not be ignored' }})    // "foo=bar&nested[will]=not+be+ignored"
 * param({ foo: 'bar', nested: { will: 'be ignored' }}, true)  // "foo=bar&nested=[object+Object]"
 * param({ id: function(){ return 1 + 2 } })  // "id=3"
 */
