'use strict';

var flyd = require('flyd');

exports.take = function(count, s) {
  if (!(count > 0)) {
    return flyd.stream().end();
  }

  return flyd.combine(function(s, self) {
    if (count > 0) {
      count--;
      self(s());
    } else {
      self.end();
    }
  }, [s]);
};
