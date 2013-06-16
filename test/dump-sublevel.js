'use strict';
/*jshint asi: true */

var test     =  require('tape')
  , level    =  require('level-test')( { mem: true })
  , sublevel =  require('level-sublevel')
  , dump     =  require('..')

test('\n# dumping sublevel db dumps values and keys of sublevel only', function (t) {
  t.plan(6)
  var db = sublevel(level(null, { valueEncoding: 'utf8' }))
    , sub1 = db.sublevel('sub1')   
    , sub2 = db.sublevel('sub2')   

    sub1.put('sub1key1', 'sub1val1', function () {
      sub2.put('sub2key1', 'sub2val1', function () {
        +function () {
          var keys = []
          dump.keys(
              sub1 
            , keys.push.bind(keys) 
            , function end(err) {
                t.notOk(err, 'dump sub1 keys ends without error')
                t.deepEqual(keys, [ 'sub1key1' ], 'dump sub1 keys, dumps keys of that sublevel')
              }
          )
        }()

        +function () {
          var values = []
          dump.values(
              sub1
            , values.push.bind(values) 
            , function end(err) {
                t.notOk(err, 'dump sub1 values ends without error')
                t.deepEqual(values, [ 'sub1val1' ], 'dump sub1 values, dumps values of that sublevel')
              }
          )
        }()

        +function () {
          var entries = []
          dump(
              sub1
            , entries.push.bind(entries) 
            , function end(err) {
                t.notOk(err, 'dump sub1 entries ends without error')
                t.deepEqual(
                    entries
                  , [ { key: 'sub1key1', value: 'sub1val1' } ]
                  , 'dump sub1 entries, dumps entries of that sublevel'
                )
              }
          )
        }()

      })
    })
})
