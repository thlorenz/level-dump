#!/usr/bin/env node

var dump = require('../');
var level = require('level');
var minimist = require('minimist');
var argv = minimist(process.argv.slice(2), {
  alias: {
    s: 'start',
    e: 'end',
    k: 'keys',
    v: 'values',
    h: 'help'
  },
  default: {
    keys: true,
    values: true
  },
  boolean: [
    // options that are always boolean
    'keys',
    'values',
    'help',
    'version'
  ]
});

if (argv.version) return runVersion()

var path = argv._[0]
if (argv.help || !path) return runHelp()

// db options
// https://github.com/rvagg/node-levelup#options
var levelOptions = {
  createIfMissing: false
}

var range = {
  start: argv.start,
  end: argv.end
}

dump.raw(range, argv.keys, argv.values, level(path, levelOptions))

/// Helpers //////////////////////////////////////////////////////

function runHelp () {
  console.log(function () {
  /*
  Usage:
      level-dump [path/to/db] <options>
  Example:
      level-dump ./blah.db
  Options:
      -k, --keys                  dump keys (default)
      -v, --values                dump values (default)
      -s, --start                 range start
      -e, --end                   range end
      --version                   print the current version

  Please report bugs!  https://github.com/thlorenz/level-dump/issues
  */
  }.toString().split(/\n/).slice(2, -2).join('\n'))
  process.exit(0)
}

function runVersion () {
  console.log(require('../package.json').version)
  process.exit(0)
}
