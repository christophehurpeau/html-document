# Contributing

I'd love for you to contribute ! Here some guidelines and documentation.

## Installation

```
git clone git@github.com:christophehurpeau/html-document.git
cd html-document
npm install
```

## [pob](https://github.com/christophehurpeau/pob/blob/master/README.md)

A generator to manage all my packages, contains tasks and common config files. You can find there a [list of available tasks](https://github.com/christophehurpeau/pob/blob/master/README.md#available-tasks-with-npm-run)

## Babel and es6

I write code in es6 in the `src` directory, transpiled with babel to `lib`.
Use the task `npm run build` or `npm run watch` to transpile the code.

## Coding Rules

Eslint is used to ensure a common coding style. I mostly follow [Airbnb coding style](https://github.com/airbnb/javascript/blob/master/README.md).
You can check the code by running the task `npm run lint`. With an editor, install the plugins to validate the code as you type !

## Documentation

I use [jsdoc](http://usejsdoc.org/) to document the code and [generate the api](https://christophehurpeau.github.io/html-document/docs/).
I also use `istanbul` to [generate the coverage](https://christophehurpeau.github.io/html-document/coverage/lcov-report/).
You can generate the documentation with `npm run generate:docs`,
a shortcut for `npm run generate:api ; npm run generate:test-coverage`

## Tests

Tests are in the directory `test/src`, transpiled with babel to `test/node6`.
Use the task `npm run test` to run the test.
Transpilation to `node6/lib` is done by `npm run build` or `npm run watch`.
Prefer to follow the structure in `test/src` like `src` and test each file.
