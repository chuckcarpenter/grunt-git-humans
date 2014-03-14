'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.git_humans = {
  default_options: function(test) {
    test.expect(1);

    var expected = grunt.file.exists('tmp/humans.txt');
    test.equal(expected, true, 'should see this humans.txt created for default.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var expected = grunt.file.exists('tmp/custom.txt');
    test.equal(expected, true, 'should see this custom.txt created for testing options.');

    test.done();
  },
};
