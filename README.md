# level-dump [![build status](https://secure.travis-ci.org/thlorenz/level-dump.png)](http://travis-ci.org/thlorenz/level-dump)

Dumps all values and/or keys of a level db or a sublevel to the console.

Intended for debugging purposes in order to just show and/or count db entries.

```js
var dump = require('level-dump');
dump(db);         // dump keys and values (same as dump.entries)
dump.keys(db);    // dump keys only
dump.values(db);  // dump values only

dump.allKeys(db);     // dump keys including all sublevels
dump.allValues(db);   // dump values including all sublevels
dump.allEntries(db);  // dump entries including all sublevels
```

`db` to be any level-up instance, including a sublevel, in which cases it only dumps value inside the sublevel.

## Override dump location

By default the dump gets written via `console.log`. You can overwrite this however.

This comes in useful for testing for instance:

```js
var assert = require('assert');
var dump = require('level-dump');

dump(
    db 
  , function write(data) {
      assert.deepEqual(data, 'what I expected'); 
    }
  , function end(err) {
      assert.notOk(err);
    }
  )
```

## API

***dump(db[, write, end])***

***dump.{entries,keys,values}(db[, write, end])***

- `db` the leveldb instance, whose entries to dump
- `write : function` called for every dumped value (default: `console.log`)
- `end: function` called when all values have been dumped and/or an error occurred

**Note:** when `write` is supplied, `end` needs to be as well. When only one function is supplied it will be treated as
`end`.

***dump.{allEntries,allKeys,allValues}(db[, write, end])***

- same as above except if called on the root level db, it will include keys/values/entries of all sublevels

## Command line

### Install

```bash
npm install -g level-dump
```

### Usage

```bash
# print usage:
level-dump -h
```
