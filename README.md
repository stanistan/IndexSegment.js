# IndexSegment.js [![Build Status](https://travis-ci.org/stanistan/IndexSegment.js.svg?branch=master)](https://travis-ci.org/stanistan/IndexSegment.js)

A JS in memory search index.

## Installation

```
$ npm install index-segment
```

## Usage

```js
//
// Basic usage usages the built in tokenizer
// which is pretty trivial and splits strings on
// non alpha numeric characters.
//
var IndexSegment = require('index-segment');

// create your index
var index = new IndexSegment();

// put(docText, docId)
index.put("hey-you", 1);
//> 2

index.put("hey you me", 2);
//> 3

index.search("me");
//> [2]

index.search("hey");
//> [1, 2]
```

#### Providing your own tokenizer.

The tokenizer is used during `put` and `search` methods.

```js
var index = new IndexSegment(myTokenizer);
```

## Development

Clone it :)

I'm using es6->es5 via babel, and polyfilling in `Set` and `Map`.

Run `gulp` for the es5 translation.

`npm test` for running the tests.

## License 

MIT

## Author

Stan Rozenraukh
