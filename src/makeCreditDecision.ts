/**
 * Функция для принятия решения по выдаче кредита.
 * Возвращает либо отказ в выдаче кредита с причиной отказа,
 * либо согласие на выдачу и годовой платёж (по телу + проценты).
 * Платёж возвращается с точностью до 8 знаков после запятой, т.к. он в миллионах (рубли + копейки)
 */
import { checkCreditConditions } from "./checkCreditConditions";
import { countAnnualPaymentAndInterest } from "./countAnnualPaymentAndInterest";
import { userDataValidation } from "./userDataValidation";
import { UserData, CreditDecision } from "./interfaces";

export function makeCreditDecision({
  age,
  gender,
  incomeSource,
  lastYearIncome,
  creditRating,
  creditAmount,
  repaymentPeriod,
  target,
}: UserData): CreditDecision {
  // проверяем, что введены корректные значения возраста, дохода, суммы и срока погашения
  const validationResult = userDataValidation({
    age,
    lastYearIncome,
    creditAmount,
    repaymentPeriod,
  });

  if (validationResult) {
    return validationResult;
  }

  // проверяем, что выполняются первичные условия по кредиту
  const decisionAfterCheckConditions = checkCreditConditions({
    age,
    gender,
    incomeSource,
    lastYearIncome,
    creditRating,
    creditAmount,
    repaymentPeriod,
  });

  if (decisionAfterCheckConditions) {
    return decisionAfterCheckConditions;
  }

  // узнаём годовой платеж и проценты и проверяем, что такой кредит можно выдать
  let annualInfo = countAnnualPaymentAndInterest({
    target,
    creditRating,
    incomeSource,
    creditAmount,
    lastYearIncome,
    repaymentPeriod,
  });

  if (annualInfo) {
    return annualInfo;
  }

  // если не выполнилось ни одно из условий выше
  return {
    creditDecision: "credit denied",
    message: "Произошла неизвестная ошибка",
  };
}
