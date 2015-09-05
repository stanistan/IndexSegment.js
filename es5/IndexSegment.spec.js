'use strict';

var _IndexSegment = require('./IndexSegment');

describe('IndexSegment', function () {

  var index = new _IndexSegment.IndexSegment();

  it('should have an implicit tokenizer', function () {
    expect(index.tokenize("foo")).toEqual(["foo"]);
    expect(index.tokenize('foo-bar')).toEqual(['foo', 'bar']);
    expect(index.tokenize('spaces   - f___934')).toEqual(['spaces', 'f', '934']);
  });

  it('should be putable', function () {
    index.put("hey you", 1);
    index.put('hey me', 2);
    expect(index.length).toEqual(3);
  });

  it('should be searchable', function () {
    expect(index.search('hey')).toEqual([1, 2]);
    expect(index.search('you')).toEqual([1]);
    expect(index.search('me')).toEqual([2]);
    expect(index.search('nope')).toEqual([]);
  });
});
//# sourceMappingURL=IndexSegment.spec.js.map