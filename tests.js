'use strict';

var flyd = require('flyd');
var take = require('./index').take;
var expect = require('chai').expect;

var makeResults = function(s) {
  var results = [];
  flyd.on(function(s) {
    results.push(s);
  }, s);
  return results;
};

describe('flyd.take', function() {
  it('should only take n items', function() {
    var s = flyd.stream();
    var take2 = take(2, s);

    var results = makeResults(take2);

    s(1);
    expect(results).to.eql([1]);

    s(2);
    expect(results).to.eql([1, 2]);

    s(3);
    expect(results).to.eql([1, 2]);
  });

  it('should end if n is 0', function() {
    var s = flyd.stream();

    var results = makeResults(take(0, s));

    s(1);
    expect(results).to.eql([undefined]);
  });
});
