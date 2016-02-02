import { IndexSegment, Set, Map } from './IndexSegment';

describe('IndexSegment', function() {

  let index = new IndexSegment();

  it('should have an implicit tokenizer', function() {
    expect(index.tokenize("foo")).toEqual(["foo"]);
    expect(index.tokenize('foo-bar')).toEqual(['foo', 'bar']);
    expect(index.tokenize('spaces   - f___934')).toEqual(['spaces', 'f', '934']);
  });

  it('should be putable', function() {
    index.put("hey you", 1);
    index.put('hey me', 2);
		index.put('hey you me', 3);
    expect(index.length).toEqual(3);
  });

  it('should be searchable', function() {
    expect(index.search('hey')).toEqual([1, 2, 3]);
    expect(index.search('you')).toEqual([1, 3]);
    expect(index.search('me')).toEqual([2, 3]);
    expect(index.search('nope')).toEqual([]);
  });

	it('should do set intersections', function() {
		expect(index.search('hey you')).toEqual([1, 3]);
	});

});

