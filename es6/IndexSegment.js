import Set from 'es6-set/polyfill';
import Map from 'es6-map/polyfill';

function setIntersection(a, b) {
  return a ? new Set([...a].filter(x => !b.has(x))) : b;
}

function setValues(s) {
  var vals = [];
  s.forEach(a => vals.push(a));
  return vals;
}

function unique(els) {
  return setValues(new Set(els));
};

class IndexSegment {

  constructor(tokenizer) {
    this.data = new Map();
    this.length = 0;
    this.size = 0;
    this.tokenizer = tokenizer || IndexSegment.STRING_TOKENIZER;
  }

  tokenize(data) {
    return unique(this.tokenizer(data));
  }

  setForToken(token) {
    if (!this.data.has(token)) {
      this.data.set(token, new Set());
    }
    return this.data.get(token);
  }

  putTokens(tokens, id) {
    tokens.forEach(token => {
      this.setForToken(token).add(id);
    });
    this.length = this.data.size;
    this.size = this.data.size;
    return this;
  }

  put(data, id) {
    return this.putTokens(this.tokenize(data), id);
  }

  search(data) {
    return setValues(this.tokenize(data)
      .map(token => this.setForToken(token))
      .reduce(setIntersection, null));
  }

  static STRING_TOKENIZER(data) {
    return data
      .toString()
      .toLowerCase()
      .split(/[^a-zA-Z0-9]/)
      .map(s => s.trim())
      .filter(s => s != "");

  }

};

export { IndexSegment, Set, Map };
