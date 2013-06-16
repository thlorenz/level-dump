'use strict';
/*jshint asi: true */

var test     =  require('tape')
  , level    =  require('level-test')( { mem: true })
  , sublevel =  require('level-sublevel')
  , dump     =  require('..')

test('\n# dumping all root db dumps values and keys of entire db including sublevels', function (t) {
  t.plan(6)
  var db = sublevel(level(null, { valueEncoding: 'utf8' }))
    , sub1 = db.sublevel('sub1')   
    , sub2 = db.sublevel('sub2')   

    sub1.put('sub1key1', 'sub1val1', function () {
      sub2.put('sub2key1', 'sub2val1', function () {
        +function () {
          var keys = []
          dump.allKeys(
              db
            , keys.push.bind(keys) 
            , function end(err) {
                t.notOk(err, 'dump db keys ends without error')
                t.deepEqual(keys, [ '\xffsub1\xffsub1key1', '\xffsub2\xffsub2key1' ], 'dump db keys, dumps keys of all sublevels')
              }
          )
        }()

        +function () {
          var values = []
          dump.allValues(
              db
            , values.push.bind(values) 
            , function end(err) {
                t.notOk(err, 'dump db values ends without error')
                t.deepEqual(values, [ 'sub1val1', 'sub2val1' ], 'dump db values, dumps values of all sublevels')
              }
          )
        }()

        +function () {
          var entries = []
          dump.allEntries(
              db
            , entries.push.bind(entries) 
            , function end(err) {
                t.notOk(err, 'dump db entries ends without error')
                t.deepEqual(
                    entries
                  , [ { key: '\xffsub1\xffsub1key1', value: 'sub1val1' }
                    , { key: '\xffsub2\xffsub2key1', value: 'sub2val1' }
                    ]
                  , 'dump db entries, dumps entries of all sublevels'
                )
              }
          )
        }()

      })
    })
})

test('\n# dumping all sublevel dumps values and keys of that sublevel only', function (t) {
  t.plan(6)
  var db = sublevel(level(null, { valueEncoding: 'utf8' }))
    , sub1 = db.sublevel('sub1')   
    , sub2 = db.sublevel('sub2')   

    sub1.put('sub1key1', 'sub1val1', function () {
      sub2.put('sub2key1', 'sub2val1', function () {
        +function () {
          var keys = []
          dump.allKeys(
              sub1
            , keys.push.bind(keys) 
            , function end(err) {
                t.notOk(err, 'dump sub1 keys ends without error')
                t.deepEqual(keys, [ 'sub1key1' ], 'dump sub1 allkeys, dumps keys of that sublevel')
              }
          )
        }()

        +function () {
          var values = []
          dump.allValues(
              sub1
            , values.push.bind(values) 
            , function end(err) {
                t.notOk(err, 'dump sub1 values ends without error')
                t.deepEqual(values, [ 'sub1val1' ], 'dump sub1 allvalues, dumps values of that sublevel')
              }
          )
        }()

        +function () {
          var entries = []
          dump.allEntries(
              sub1
            , entries.push.bind(entries) 
            , function end(err) {
                t.notOk(err, 'dump sub1 entries ends without error')
                t.deepEqual(
                    entries
                  , [ { key: 'sub1key1', value: 'sub1val1' } ]
                  , 'dump sub1 all entries, dumps entries of that sublevel only'
                )
              }
          )
        }()

      })
    })
})
