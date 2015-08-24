
let setIntersection = function(a, b) {
  return a ?  new Set([...a].filter(x => !b.has(x))) : b;
};

class IndexSegment {

  constructor(tokenizer) {
    this.data = {};
    this.tokenizer = tokenizer || IndexSegment.STRING_TOKENIZER;
  }

  tokenize(data) {
    return this.tokenizer(data);
  }

  setForToken(token) {
    var set = this.data[token];
    if (!(token in this.data)) {
      this.data[token] = new Set();
    }
    return this.data[token];
  }

  putTokens(tokens, id) {
    tokens.forEach(token => {
      this.setForToken(token).add(id);
    });
    return this;
  }

  put(data, id) {
    return this.putTokens(this.tokenize(data), id);
  }

  search(data) {
    return this.tokenize(data).reduce((acc, token) => {
      return setIntersection(acc, this.data[token] || new Set());
    }, null);
  }

  static STRING_TOKENIZER(data) {
    return data.toString().split(" ").map(s => s.trim());
  }

};

var index = new IndexSegment();
index.put("hey you", 1);
index.put("hey me", 2);

index.search("hey").forEach(found => console.log("found" + found));
console.log('done');
