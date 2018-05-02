'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInterest = exports.getIncome = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mathjs = require('mathjs');

var _mathjs2 = _interopRequireDefault(_mathjs);

var _dateAndTime = require('date-and-time');

var _dateAndTime2 = _interopRequireDefault(_dateAndTime);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NO_OF_DAYS_IN_YEAR = 365;
var getIncome = exports.getIncome = function getIncome(investment) {
  var _investment$years = investment.years,
      years = _investment$years === undefined ? 10 : _investment$years,
      _investment$interest = investment.interest,
      interest = _investment$interest === undefined ? 8 : _investment$interest,
      _investment$initialIn = investment.initialInvestment,
      initialInvestment = _investment$initialIn === undefined ? 100 : _investment$initialIn,
      _investment$yearOfInv = investment.yearOfInvestment,
      yearOfInvestment = _investment$yearOfInv === undefined ? 1990 : _investment$yearOfInv;

  var message = '';
  var profit = 0,
      finalValue = initialInvestment;
  var year = yearOfInvestment + 1;
  for (; year < years + yearOfInvestment; year++) {
    finalValue = finalValue * (1 + interest / 100); // = initialInvestment + initialInvestment*(interest / 100)
  }
  message = '\nAt interest rate ' + interest + '% after ' + years + 'years in ' + year + 'year, you will get:' + finalValue;
  return _extends({}, investment, {
    finalValue: finalValue,
    message: message
  });
};

var getStyledString = function getStyledString(str, styles) {
  return styles.reduce(function (accumulator, style) {
    return _colors2.default[style](accumulator);
  }, str);
};

var getYears = function getYears(from, to) {
  var fromDate = _dateAndTime2.default.parse(from, 'DD-MM-YYYY');
  var toDate = _dateAndTime2.default.parse(to, 'DD-MM-YYYY');
  return _dateAndTime2.default.subtract(toDate, fromDate).toDays() / NO_OF_DAYS_IN_YEAR;
};
var getInterest = exports.getInterest = function getInterest(investment) {
  var _investment$years2 = investment.years,
      years = _investment$years2 === undefined ? 10 : _investment$years2,
      _investment$initialIn2 = investment.initialInvestment,
      initialInvestment = _investment$initialIn2 === undefined ? 100 : _investment$initialIn2,
      _investment$finalValu = investment.finalValue,
      finalValue = _investment$finalValu === undefined ? 1000 : _investment$finalValu,
      _investment$name = investment.name,
      name = _investment$name === undefined ? 'Gold' : _investment$name,
      from = investment.from,
      to = investment.to;

  var calculatedYears = from ? to ? getYears(from, to) : years : years;
  var interest = _mathjs2.default.nthRoot(finalValue / initialInvestment, calculatedYears - 1) - 1;
  var interestStyles = interest < 0 ? ['red', 'bold'] : interest < 0.05 ? ['red'] : interest < 0.08 ? ['black'] : interest < 0.1 ? ['black', 'bold'] : interest < 1 ? ['blue'] : interest < 10 ? ['blue', 'bold'] : interest < 100 ? ['green'] : ['green', 'bold'];
  var message = '#\n############## Investment type:' + ('' + name).green.bold + '\nyears: ' + calculatedYears + ',initialInvestment: ' + initialInvestment + ', finalValue: ' + finalValue + '\nInterest:' + getStyledString(interest, interestStyles);
  return _extends({}, investment, {
    years: calculatedYears,
    meta: { interestStyles: interestStyles },
    interest: interest,
    message: message
  });
};