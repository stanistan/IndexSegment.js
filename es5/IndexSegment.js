'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _es6SetPolyfill = require('es6-set/polyfill');

var _es6SetPolyfill2 = _interopRequireDefault(_es6SetPolyfill);

var _es6MapPolyfill = require('es6-map/polyfill');

var _es6MapPolyfill2 = _interopRequireDefault(_es6MapPolyfill);

function setIntersection(a, b) {
  return a ? new _es6SetPolyfill2['default']([].concat(_toConsumableArray(a)).filter(function (x) {
    return !b.has(x);
  })) : b;
}

function setValues(s) {
  var vals = [];
  s.forEach(function (a) {
    return vals.push(a);
  });
  return vals;
}

function unique(els) {
  return setValues(new _es6SetPolyfill2['default'](els));
};

var IndexSegment = (function () {
  function IndexSegment(tokenizer) {
    _classCallCheck(this, IndexSegment);

    this.data = new _es6MapPolyfill2['default']();
    this.length = 0;
    this.size = 0;
    this.tokenizer = tokenizer || IndexSegment.STRING_TOKENIZER;
  }

  _createClass(IndexSegment, [{
    key: 'tokenize',
    value: function tokenize(data) {
      return unique(this.tokenizer(data));
    }
  }, {
    key: 'setForToken',
    value: function setForToken(token) {
      if (!this.data.has(token)) {
        this.data.set(token, new _es6SetPolyfill2['default']());
      }
      return this.data.get(token);
    }
  }, {
    key: 'putTokens',
    value: function putTokens(tokens, id) {
      var _this = this;

      tokens.forEach(function (token) {
        _this.setForToken(token).add(id);
      });
      this.length = this.data.size;
      this.size = this.data.size;
      return this;
    }
  }, {
    key: 'put',
    value: function put(data, id) {
      return this.putTokens(this.tokenize(data), id);
    }
  }, {
    key: 'search',
    value: function search(data) {
      var _this2 = this;

      return setValues(this.tokenize(data).map(function (token) {
        return _this2.setForToken(token);
      }).reduce(setIntersection, null));
    }
  }], [{
    key: 'STRING_TOKENIZER',
    value: function STRING_TOKENIZER(data) {
      return data.toString().toLowerCase().split(/[^a-zA-Z0-9]/).map(function (s) {
        return s.trim();
      });
    }
  }]);

  return IndexSegment;
})();

;

exports.IndexSegment = IndexSegment;
exports.Set = _es6SetPolyfill2['default'];
exports.Map = _es6MapPolyfill2['default'];
//# sourceMappingURL=IndexSegment.js.map