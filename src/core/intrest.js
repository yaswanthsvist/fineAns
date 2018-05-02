import math from 'mathjs'
import date from 'date-and-time'
import colors from 'colors'

const NO_OF_DAYS_IN_YEAR = 365
export const getIncome = investment => {
  const {
    years = 10,
    interest = 8,
    initialInvestment = 100,
    yearOfInvestment = 1990,
  } = investment
  let message = ''
  let profit = 0,
    finalValue = initialInvestment
  let year = yearOfInvestment + 1
  for (; year < years + yearOfInvestment; year++) {
    finalValue = finalValue * (1 + interest / 100) // = initialInvestment + initialInvestment*(interest / 100)
  }
  message = `\nAt interest rate ${interest}% after ${years}years in ${year}year, you will get:${finalValue}`
  return {
    ...investment,
    finalValue,
    message,
  }
}

const getStyledString = (str, styles) =>
  styles.reduce((accumulator, style) => colors[style](accumulator), str)

const getYears = (from, to) => {
  const fromDate = date.parse(from, 'DD-MM-YYYY')
  const toDate = date.parse(to, 'DD-MM-YYYY')
  return date.subtract(toDate, fromDate).toDays() / NO_OF_DAYS_IN_YEAR
}
export const getInterest = investment => {
  const {
    years = 10,
    initialInvestment = 100,
    finalValue = 1000,
    name = 'Gold',
    from, //'DD-MM-YYYY'
    to, //'DD-MM-YYYY'
  } = investment
  const calculatedYears = from ? (to ? getYears(from, to) : years) : years
  const interest =
    math.nthRoot(finalValue / initialInvestment, calculatedYears - 1) - 1
  let interestStyles =
    interest < 0
      ? ['red', 'bold']
      : interest < 0.05
        ? ['red']
        : interest < 0.08
          ? ['black']
          : interest < 0.1
            ? ['black', 'bold']
            : interest < 1
              ? ['blue']
              : interest < 10
                ? ['blue', 'bold']
                : interest < 100 ? ['green'] : ['green', 'bold']
  const message = `#\n############## Investment type:${('' + name).green
    .bold}\nyears: ${calculatedYears},initialInvestment: ${initialInvestment}, finalValue: ${finalValue}\nInterest:${getStyledString(
    interest,
    interestStyles
  )}`
  return {
    ...investment,
    years: calculatedYears,
    meta: { interestStyles },
    interest,
    message,
  }
}
