import Set from 'es6-set';
import Map from 'es6-map';

function setIntersection(a, b) {
	return a ? new Set(setValues(a).filter(x => b.has(x))) : b;
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

  static get stringTokenizer() {
    return IndexSegment.stringTokenizerForPattern(/[^a-zA-Z0-9]/);
  }

  static stringTokenizerForPattern(pattern) {
    return (string) => {
      return string
        .toLowerCase()
        .split(pattern)
        .map(s => s.trim())
        .filter(s => s.length > 0);
    };
  }

  constructor(tokenizer) {
    this.data = new Map();
    this.opts = {
      tokenizer: tokenizer || IndexSegment.stringTokenizer
    };
  }

  get length() {
    return this.data.size;
  }

  tokenize(data) {
    return unique(this.opts.tokenizer(data));
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
    return this.length;
  }

  put(data, id) {
    return this.putTokens(this.tokenize(data), id);
  }

  search(data) {
    return setValues(this.tokenize(data)
      .map(token => this.setForToken(token))
      .reduce(setIntersection, null));
  }

};

export { IndexSegment, Set, Map };
