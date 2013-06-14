'use strict';

function dump (keys, values, db, cb) {
  db.createReadStream({ 
      keys   :  keys
    , values :  values
    , start :  ''
    , end   :  '\xff'
  })
  .on('data', exports.write)
  .on('error', cb) 
  .on('close', cb);
}

module.exports = 
exports          =  dump.bind(null, true, true);
exports.keys     =  dump.bind(null, true, false);
exports.values   =  dump.bind(null, false, true);
exports.write    =  console.log.bind(console)
exports.all      =  exports ;
