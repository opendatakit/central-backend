const should = require('should');
const { curry } = require('ramda');
const { DateTime } = require('luxon');

const appRoot = require('app-root-path');
const { without } = require(appRoot + '/lib/util/util');

// verifies the non-nullable presence of a given date field in an object, and
// then returns a new object without that field so that the remaining fields
// may be directly bulk-compared.
const shouldBeDate = curry((field, obj) => {
  DateTime.fromISO(obj[field]).isValid.should.equal(true);
  return without([ field ], obj);
});

// the same, but is okay with null.
const couldBeDate = curry((field, obj) => {
  if (obj[field] != null)
    DateTime.fromISO(obj[field]).isValid.should.equal(true);
  return without([ field ], obj);
});

module.exports = { shouldBeDate, couldBeDate };
