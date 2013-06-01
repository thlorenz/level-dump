# level-dump

Dumps all values and/or keys of a level db or a sublevel to the console.

Intended for debugging purposes in order to just show and/or count db entries.

```js
var dump = require('level-dump');
dump(db);         // dump keys and values (same as dump.all)
dump.keys(db);    // dump keys only
dump.values(db);  // dump values onlye 
```

`db` to be any level-up instance, including a sublevel, in which cases it only dumps value inside the sublevel.
