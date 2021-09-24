/**
 * Функция для проверки того, что в поля, где есть диапазон данных, введены корректные значения.
 * Возраст [not negative int], лет
 * Доход за последний год [int], млн
 * Запрошенная сумма [0.1 .. 10], млн
 * Срок погашения [1..20], лет
 * Если какие-либо значения некорректные, то возвращаем ошибки по каждому из.
 */
import { UserDataForValidation, CreditDecision } from "./interfaces";

export function userDataValidation({
  age,
  lastYearIncome,
  creditAmount,
  repaymentPeriod,
}: UserDataForValidation): CreditDecision | null {
  let validationResult = "";
  let message = "";

  if (age <= 0) {
    message += "возраст не может быть нулевым или отрицательным; ";
    validationResult = "credit denied";
  }
  if (lastYearIncome <= 0) {
    message += "годовой доход не может быть нулевым или отрицательным; ";
    validationResult = "credit denied";
  }
  if (creditAmount < 0.1) {
    message += "сумма кредита должна быть не менее 0.1 млн; ";
    validationResult = "credit denied";
  }
  if (creditAmount > 10) {
    message += "сумма кредита не может быть более 10 млн; ";
    validationResult = "credit denied";
  }
  if (repaymentPeriod < 1) {
    message += "срок погашения не может быть меньше 1 года; ";
    validationResult = "credit denied";
  }
  if (repaymentPeriod > 20) {
    message += "срок погашения не может быть больше 20 лет; ";
    validationResult = "credit denied";
  }
  if (validationResult === "credit denied") {
    message = "Указаны некорректные данные: " + message.slice(0, -2) + ".";

    return {
      creditDecision: validationResult,
      message: message,
    };
  }

  return null;
}
