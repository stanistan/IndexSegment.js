"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var setIntersection = function setIntersection(a, b) {
  return a ? new Set([].concat(_toConsumableArray(a)).filter(function (x) {
    return !b.has(x);
  })) : b;
};

var IndexSegment = (function () {
  function IndexSegment(tokenizer) {
    _classCallCheck(this, IndexSegment);

    this.data = {};
    this.tokenizer = tokenizer || IndexSegment.STRING_TOKENIZER;
  }

  _createClass(IndexSegment, [{
    key: "tokenize",
    value: function tokenize(data) {
      return this.tokenizer(data);
    }
  }, {
    key: "setForToken",
    value: function setForToken(token) {
      var set = this.data[token];
      if (!(token in this.data)) {
        this.data[token] = new Set();
      }
      return this.data[token];
    }
  }, {
    key: "putTokens",
    value: function putTokens(tokens, id) {
      var _this = this;

      tokens.forEach(function (token) {
        _this.setForToken(token).add(id);
      });
      return this;
    }
  }, {
    key: "put",
    value: function put(data, id) {
      return this.putTokens(this.tokenize(data), id);
    }
  }, {
    key: "search",
    value: function search(data) {
      var _this2 = this;

      return this.tokenize(data).map(function (token) {
        return _this2.setForToken(token);
      }).reduce(setIntersection, null);
    }
  }], [{
    key: "STRING_TOKENIZER",
    value: function STRING_TOKENIZER(data) {
      return data.toString().toLowerCase().split(/[^a-zA-Z0-9]/).map(function (s) {
        return s.trim();
      });
    }
  }]);

  return IndexSegment;
})();

;

var index = new IndexSegment();
index.put("hey you", 1);
index.put("hey me", 2);

console.log("stuff is put");

index.search("hey").forEach(function (found) {
  return console.log("found" + found);
});
console.log('done');

console.log(IndexSegment.STRING_TOKENIZER("foo-bar"));
//# sourceMappingURL=IndexSegment.js.map