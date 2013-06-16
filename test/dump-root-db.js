'use strict';
/*jshint asi: true */

var test     =  require('tape')
  , level    =  require('level-test')( { mem: true })
  , sublevel =  require('level-sublevel')
  , dump     =  require('..')

test('\n# dumping root db dumps no values and keys inside sublevels', function (t) {
  t.plan(6)
  var db = sublevel(level(null, { valueEncoding: 'utf8' }))
    , sub1 = db.sublevel('sub1')   
    , sub2 = db.sublevel('sub2')   

    sub1.put('sub1key1', 'sub1val1', function () {
      sub2.put('sub2key1', 'sub2val1', function () {
        +function () {
          var keys = []
          dump.keys(
              db
            , keys.push.bind(keys) 
            , function end(err) {
                t.notOk(err, 'dump db keys ends without error')
                t.deepEqual(keys, [ ], 'dump db keys, dumps nothing')
              }
          )
        }()

        +function () {
          var values = []
          dump.values(
              db
            , values.push.bind(values) 
            , function end(err) {
                t.notOk(err, 'dump db values ends without error')
                t.deepEqual(values, [ ], 'dump db values, dumps nothing')
              }
          )
        }()

        +function () {
          var entries = []
          dump(
              db
            , entries.push.bind(entries) 
            , function end(err) {
                t.notOk(err, 'dump db entries ends without error')
                t.deepEqual(entries, [ ], 'dump db entries, dumps nothing')
              }
          )
        }()

      })
    })
})
