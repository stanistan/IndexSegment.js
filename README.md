# IndexSegment.js [![Build Status](https://travis-ci.org/stanistan/IndexSegment.js.svg?branch=master)](https://travis-ci.org/stanistan/IndexSegment.js)

A JS in memory search index.

## Usage

```js
//
// Basic usage usages the built in tokenizer
// which is pretty trivial and splits strings on
// non alpha numeric characters.
//
var IndexSegment = require('IndexSegment');

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
