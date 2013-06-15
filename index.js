'use strict';

function dump (keys, values, db, write, end) {
  var cb;
  if (end) cb = end;
  else {
    cb = write;
    write = console.log.bind(console);
  }

  // don't blow up if neither write nor end were given, i.e. dump(db)
  cb = cb || function () {}

  db.createReadStream({ 
      keys   :  keys
    , values :  values
    , start :  ''
    , end   :  '\xff'
  })
  .on('data', write)
  .on('error', cb) 
  .on('close', cb);
}

module.exports = 
exports          =  dump.bind(null, true, true);
exports.keys     =  dump.bind(null, true, false);
exports.values   =  dump.bind(null, false, true);
exports.all      =  exports ;
