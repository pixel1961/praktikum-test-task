/**
 * Функция для расчёта ежегодного платежа и процента по нему.
 * Возвращает годовой платёж + проценты по нему.
 * Годовой платеж по кредиту определяется по следующей формуле:
 * (<сумма кредита> * (1 + <срок погашения> * (<базовая ставка> + <модификаторы>))) / <срок погашения>
 * Процент по годовому платежу определяется так:
 * (<годовой платёж> * (<базовая ставка> + <модификаторы>))
 * Ответ возвращается с точностью до 8-ти знаков после запятой, т.к. сумма в миллионах рублей + могут быть копейки
 */
import { countCreditRate } from "./countCreditRate";
import { UserDataForCreditCount, CreditDecision } from "./interfaces";

export function countAnnualPaymentAndInterest({
  target,
  creditRating,
  incomeSource,
  creditAmount,
  lastYearIncome,
  repaymentPeriod,
}: UserDataForCreditCount): CreditDecision {
  let rate =
    countCreditRate({
      target,
      creditRating,
      creditAmount,
      incomeSource,
    }).creditRate / 100;

  let annualPayment =
    (creditAmount * (1 + repaymentPeriod * rate)) / repaymentPeriod;

  let annualInterest = annualPayment * rate;

  let annualPaymentWithInterest = annualInterest + annualPayment;

  // Если годовой платёж (включая проценты) больше половины дохода => кредит не выдаётся
  if (annualPaymentWithInterest > lastYearIncome / 2) {
    return {
      creditDecision: "credit denied",
      message: "Годовой платёж + проценты превышают половину годового дохода",
    };
  }

  return {
    creditDecision: "credit approved",
    annualPayment: +annualPaymentWithInterest.toFixed(8),
  };
}
