import { getInterest, getIncome } from './core/intrest'
import { interestRates, incomes } from './data/data'

let incomeResults = incomes.map(investment => getIncome(investment))
incomeResults.map(result => console.log(result.message))
let interestRateResults = interestRates.map(investment =>
  getInterest(investment)
)
interestRateResults.map(result => console.log(result.message))
