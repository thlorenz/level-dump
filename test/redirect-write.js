'use strict';
/*jshint asi: true */

var test  =  require('tape')
  , level =  require('level-test')( { mem: true })
  , dump  =  require('..')

test('\nredirecting write differently on get level', function (t) {
  t.plan(7)
  var db = level(null, { valueEncoding: 'json' })

  db.put('key1', { value: 'val1' }, function () {
    // Ensure dump without any functions causes no problems
    dump(db)
    
    // test write overrides
    dump.keys(
        db
      , function write(key) {
          t.equal(key, 'key1', 'key dump writes key')
        }
      , function end(err) {
          t.notOk(err, 'key dump ends without error')
        }
    )
    dump.values(
        db
      , function write(value) {
          t.deepEqual(value, { value: 'val1' }, 'value dump writes value')
        }
      , function end(err) {
          t.notOk(err, 'value dump ends without error')
        }
    )
    dump(
        db
      , function write(res) {
          t.deepEqual(res, { key: 'key1', value: { value: 'val1' } }, 'dump writes key and value')
        }
      , function end(err) {
          t.notOk(err, 'dump ends without error')
        }
    )
    dump(
        db
      , function end(err) {
          t.notOk(err, 'dump without write override ends without error')
        }
    )
  })
})
