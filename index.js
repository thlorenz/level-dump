'use strict';

function dump (range, keys, values, db, write, end) {
  range = range || { }
  range.start = typeof range.start === 'undefined'  ?  ''     : range.start;
  range.end   = typeof range.end   === 'undefined'  ? '\xff'  : range.end;

  var cb;
  if (end) cb = end;
  else {
    cb = write;
    write = console.log.bind(console);
  }

  // don't blow up if neither write nor end were given, i.e. dump(db)
  cb = cb || function (err) { if (err) console.error(err); };

  db.createReadStream({
      keys   :  keys
    , values :  values
    , start  :  range.start
    , end    :  range.end
  })
  .on('data', write)
  .on('error', cb)
  .on('close', cb);
}

module.exports    =
exports             =  dump.bind(null, null, true, true);
exports.keys        =  dump.bind(null, null, true, false);
exports.values      =  dump.bind(null, null, false, true);
exports.entries     =  exports;

exports.allKeys     =  dump.bind(null, { end: '\xff\xff' }, true, false);
exports.allValues   =  dump.bind(null, { end: '\xff\xff' }, false, true);
exports.allEntries  =  dump.bind(null, { end: '\xff\xff' }, true, true);

exports.raw         = dump;
