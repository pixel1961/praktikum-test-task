/**
 * Функция для проверки первичных условий по выдаче кредите.
 * Если кредитный рейтинг -2 => кредит не выдаётся
 * Если в источнике дохода указано "безработный" => кредит не выдаётся
 * Если возраст превышает пенсионный возраст на момент возврата кредита => кредит не выдаётся
 * Считаем, что для мужчин песионный возраст в 65 лет, для женщин - в 60 лет.
 * Если результат деления запрошенной суммы на срок погашения в годах более трети годового дохода => кредит не выдаётся
 */
import { findMaxCreditAmount } from "./findMaxCreditAmount";
import { UserDataForCreditConditionsCheck, CreditDecision } from "./interfaces";

export function checkCreditConditions({
  age,
  gender,
  incomeSource,
  lastYearIncome,
  creditRating,
  creditAmount,
  repaymentPeriod,
}: UserDataForCreditConditionsCheck): CreditDecision | null {
  if (creditRating === "-2") {
    return {
      creditDecision: "credit denied",
      message: "У вас недостаточно кредитного рейтинга",
    };
  }
  if (incomeSource.includes("unemployed")) {
    return {
      creditDecision: "credit denied",
      message: "Кредиты не выдаются безработным",
    };
  }
  let maxAmount = findMaxCreditAmount({ incomeSource, creditRating }).amount;
  if (creditAmount > maxAmount) {
    return {
      creditDecision: "credit denied",
      message: `Запрошенная сумма кредита больше допустимой для указанных источника дохода и рейтинга, вам доступно ${maxAmount} млн.`,
    };
  }
  if (gender === "M") {
    if (age + repaymentPeriod > 65) {
      return {
        creditDecision: "credit denied",
        message:
          "Возраст на момент возврата кредита превышает пенсионный - 65 лет",
      };
    }
  }
  if (gender === "F") {
    if (age + repaymentPeriod > 60) {
      return {
        creditDecision: "credit denied",
        message:
          "Возраст на момент возврата кредита превышает пенсионный - 60 лет",
      };
    }
  }
  if (creditAmount / repaymentPeriod > lastYearIncome / 3) {
    return {
      creditDecision: "credit denied",
      message: "Сумма / срок погашения больше трети годового дохода",
    };
  }
  return null;
}
