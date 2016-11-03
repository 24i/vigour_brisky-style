'use strict'
const isNumber = require('is-number-like')
exports.appendUnit = (val, unit) => isNumber(val) ? val + unit : val
