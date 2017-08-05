'use strict';

const path = require('path');
const TYPE_STRING = 'string';
const TYPE_OBJECT = 'object';
const TYPE_BOOLEAN = 'boolean';
const PREFIX = 'yamoney';
const VERSION_LENGTH = 3;
const ZERO = 0;
const LICENSE = 'UNLICENSED';
const get = (keys, object) => keys.reduce((obj, key) => (obj && obj[key]) ? obj[key] : null, object);
const checkField = (rule, json) => {
    const field = get(rule.field, json);

    if (!field) {
        return `should have field ${rule.field}`;
    }

    return [].concat(rule.rules).reduce((result, fieldRules) =>  result || fieldRules(rule.field, field), '');
};
const isType = (name, field, type) => typeof field === type ? null : `${name} should be ${type}`;
const isString = (name, field) => isType(name, field, TYPE_STRING);
const isObject = (name, field) => isType(name, field, TYPE_OBJECT);
const isBoolean = (name, field) => isType(name, field, TYPE_BOOLEAN);
const isArray = (name, field) => Array.isArray(field) ? null : `${name} should be array`;
const checkPrefix = (name, field) => field.split('-')[0] === PREFIX ? null : `${name} should have prefix ${PREFIX}`;
const checkSemver = (name, field) => field.split('.').length === VERSION_LENGTH ? null : `${name} should use semver`;
const checkSemverNumbers = (name, field) => field.split('.').every(number => !isNaN(Number(number))) ? null : `${name} should contain numbers for versioning`;
const checkSemverMajor = (name, field) => field.split('.')[0] === ZERO ? `${name} should start from first major` : null;
const checkArray = (name, field) => field.length === ZERO ? `${name} should not be empty` : null;
const checkValue = (name, field) => field === LICENSE ? null : `${name} should be ${LICENSE}`;
const checkMaintainers = (name, field) => field.reduce((result, obj) => result.concat(Object.keys(obj).map(key => checkField({
    field: [key],
    rules:[isString]
}, obj))), []);
const config = {
    rules: [
        {
            field: ['name'],
            rules: [
                isString,
                checkPrefix
            ]
        },
        {
            field: ['version'],
            rules: [
                isString,
                checkSemver,
                checkSemverNumbers,
                checkSemverMajor
            ]
        },
        {
            field: ['description'],
            rules: [
                isString
            ]
        },
        {
            field: ['main'],
            rules: [
                isString
            ]
        },
        {
            field: ['scripts'],
            rules: [
                isObject
            ]
        },
        {
            field: ['scripts', 'test'],
            rules: [
                isString
            ]
        },
        {
            field: ['keywords'],
            rules: [
                isArray,
                checkArray
            ]
        },
        {
            field: ['author'],
            rules: [
                isObject
            ]
        },
        {
            field: ['author', 'name'],
            rules: [
                isString
            ]
        },
        {
            field: ['author', 'email'],
            rules: [
                isString
            ]
        },
        {
            field: ['maintainers'],
            rules: [
                isArray,
                checkArray,
                checkMaintainers
            ]
        },
        {
            field: ['license'],
            rules: [
                isString,
                checkValue
            ]
        },
        {
            field: ['private'],
            rules: [
                isBoolean
            ]
        }
    ]
};
const check = json => config.rules.map(rule => checkField(rule, json)).filter(isNaN);

module.exports = function(json) {
    const jsonPath = path.resolve(process.cwd(), 'package.json');
    const file = json || require(jsonPath);

    return check(file);
};

