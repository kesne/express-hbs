var assert = require('assert');
var hbs = require('..');
var path = require('path');
var H = require('./helpers');
var fs = require('fs');

describe('underscored partial', function() {
  var dirname =  path.join(__dirname, 'views/underscoredPartials');

  it('should handle prefixes', function(done) {
    var hb = hbs.create();
    var render = hb.express3();
    var locals = H.createLocals('express3', dirname, {});

    render(dirname + '/index.hbs', locals, function(err, html) {
      assert.ifError(err);
      var expected = 'onetwo';
      assert.equal(H.stripWs(html), expected);
      done();
    });
  });

  it('should not conflict with existing file', function(done) {
    var hb = hbs.create();
    var render = hb.express3();
    var locals = H.createLocals('express3', dirname, {});

    render(dirname + '/three.hbs', locals, function(err, html) {
      assert.ifError(err);
      var expected = '<three>three</three>';
      assert.equal(H.stripWs(html), expected);
      done();
    });
  });

  it('should handle relative partials', function(done) {
    var hb = hbs.create();
    var render = hb.express3();
    var locals = H.createLocals('express3', dirname, {});

    render(dirname + '/sub/relative.hbs', locals, function(err, html) {
      assert.ifError(err);
      var expected = '<relative>four/relative>';
      assert.equal(H.stripWs(html), expected);
      done();
    });
  });
});

