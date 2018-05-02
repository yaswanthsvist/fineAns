'use strict';

var _intrest = require('./core/intrest');

var _data = require('./data/data');

var incomeResults = _data.incomes.map(function (investment) {
  return (0, _intrest.getIncome)(investment);
});
incomeResults.map(function (result) {
  return console.log(result.message);
});
var interestRateResults = _data.interestRates.map(function (investment) {
  return (0, _intrest.getInterest)(investment);
});
interestRateResults.map(function (result) {
  return console.log(result.message);
});