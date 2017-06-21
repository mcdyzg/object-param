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

const ARRAY_TYPE = '[object Array]'
const FUNCTION = 'function'
const OBJECT = 'object'
const NUMBER = 'number'
const NULL = null
const OBJECT_TYPE = '[object Object]'

function isFunction(v) {
    return typeof v === FUNCTION
}

function isArray(v) {
    return toString.call(v) === ARRAY_TYPE
}

function isObject(v) {
    return typeof v === OBJECT && v !== NULL
}

function isWindow(v) {
    return v !== NULL && v === v.window
}

function isPlainObject(v) {
    return v !== NULL && isObject(v) && !isWindow(v) && Object.getPrototypeOf(v) === Object.prototype
}

function isNumber(v) {
    return !isNaN(v) && typeof v === NUMBER
}

function likeArray(v) {
    if (!v) {
        return false
    }
    return typeof v.length === NUMBER
}

function each(v, fn) {
    let i, l
    if (likeArray(v)) {
        for (i = 0, l = v.length; i < l; i++) {
            if (fn.call(v[i], v[i], i) === false) return
        }
    } else {
        for (i in v) {
            if (fn.call(v[i], v[i], i) === false) return
        }
    }
}

function serialize(params, obj, traditional, scope) {
    let type, array = isArray(obj), hash = isPlainObject(obj)
    each(obj, function(value, key) {
        type = toString.call(value)
        if (scope) {
            key = traditional ? scope : scope + '[' + (hash || type == OBJECT_TYPE || type == ARRAY_TYPE ? key : '') + ']'
        }

        // 递归
        if (!scope && array) {
            params.add(value.name, value.value)
        }
        // recurse into nested objects
        else if (type == ARRAY_TYPE || (!traditional && type == OBJECT_TYPE)) {
            serialize(params, value, traditional, key)
        } else {
            params.add(key, value)
        }
    })
}

export default function(obj, traditional){
    var params = []
    params.add = (key, value) => {
      if (isFunction(value)) value = value()
      if (value == null) value = ""
      params.push((key) + '=' + (value))
    }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
}
