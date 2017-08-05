'use strict';

const linter = require('..');
const json = {
    name: 'yamoney-test',
    version: '1.0.0',
    description: 'test',
    main: 'index.js',
    scripts: {
        test: 'mocha'
    },
    keywords: [
        'test'
    ],
    author: {
        name: 'test',
        email: 'test@yamoney.ru'
    },
    maintainers: [
        {
            name: 'test',
            email: 'test@yamoney.ru'
        }
    ],
    license: 'UNLICENSED',
    private: true
}

console.log('empty: ', linter({}));

console.log('no name: ', linter(Object.assign({}, json, {
    name: void 0
})));
console.log('name not string: ', linter(Object.assign({}, json, {
    name: 1
})));
console.log('name without prefix: ', linter(Object.assign({}, json, {
    name: 'test'
})));

console.log('no version: ', linter(Object.assign({}, json, {
    version: void 0
})));
console.log('version not string: ', linter(Object.assign({}, json, {
    version: 1
})));
console.log('version not semver: ', linter(Object.assign({}, json, {
    version: '1'
})));
console.log('version not semver numbers: ', linter(Object.assign({}, json, {
    version: '1.0.a'
})));
console.log('version not semver major: ', linter(Object.assign({}, json, {
    version: '0.0.1'
})));

console.log('no description: ', linter(Object.assign({}, json, {
    description: void 0
})));
console.log('description not string: ', linter(Object.assign({}, json, {
    description: 1
})));

console.log('no main: ', linter(Object.assign({}, json, {
    main: void 0
})));
console.log('main not string: ', linter(Object.assign({}, json, {
    main: 1
})));

console.log('no scripts: ', linter(Object.assign({}, json, {
    scripts: void 0
})));
console.log('scripts not object: ', linter(Object.assign({}, json, {
    scripts: 1
})));
console.log('scripts has no test: ', linter(Object.assign({}, json, {
    scripts: {
        test: void 0
    }
})));
console.log('test not string: ', linter(Object.assign({}, json, {
    scripts: {
        test: 1
    }
})));

console.log('no keywords: ', linter(Object.assign({}, json, {
    keywords: void 0
})));
console.log('keywords not array: ', linter(Object.assign({}, json, {
    keywords: 1
})));
console.log('keywords empty: ', linter(Object.assign({}, json, {
    keywords: []
})));

console.log('no author: ', linter(Object.assign({}, json, {
    author: void 0
})));
console.log('author not object: ', linter(Object.assign({}, json, {
    author: 1
})));
console.log('author has no name: ', linter(Object.assign({}, json, {
    author: {
        name: void 0
    }
})));
console.log('name not string: ', linter(Object.assign({}, json, {
    author: {
        name: 1
    }
})));
console.log('author has no email: ', linter(Object.assign({}, json, {
    author: {
        email: void 0
    }
})));
console.log('email not string: ', linter(Object.assign({}, json, {
    author: {
        email: 1
    }
})));

console.log('no maintainers: ', linter(Object.assign({}, json, {
    maintainers: void 0
})));
console.log('maintainers not array: ', linter(Object.assign({}, json, {
    maintainers: 1
})));
console.log('maintainers empty: ', linter(Object.assign({}, json, {
    maintainers: []
})));
console.log('maintainer not object: ', linter(Object.assign({}, json, {
    maintainer: [
        1
    ]
})));
console.log('maintainer has no name: ', linter(Object.assign({}, json, {
    maintainer: [
        {
            name: void 0
        }
    ]
})));
console.log('maintainer not string: ', linter(Object.assign({}, json, {
    maintainer: [
        {
            name: 1
        }
    ]
})));
console.log('maintainer has no email: ', linter(Object.assign({}, json, {
    maintainer: [
        {
            email: void 0
        }
    ]
})));
console.log('maintainer not string: ', linter(Object.assign({}, json, {
    maintainer: [
        {
            email: 1
        }
    ]
})));

console.log('no license: ', linter(Object.assign({}, json, {
    license: void 0
})));
console.log('license not string: ', linter(Object.assign({}, json, {
    license: 1
})));
console.log('license not UNLICENSED: ', linter(Object.assign({}, json, {
    license: 'MIT'
})));

console.log('no private: ', linter(Object.assign({}, json, {
    private: void 0
})));
console.log('private not boolean: ', linter(Object.assign({}, json, {
    private: 1
})));

