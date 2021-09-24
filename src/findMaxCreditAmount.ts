/**
 * Функция для поиска максимально доступной суммы кредита
 * в зависимости от источника дохода и от рейтинга кредитополучателя.
 * При пассивном доходе выдаётся кредит на сумму до 1 млн, наёмным работникам - до 5 млн,
 * собственное дело - до 10 млн.
 * При кредитном рейтинге -1 выдаётся кредит на сумму до 1 млн, при 0 - до 5 млн, при 1 или 2 - до 10 млн.
 */
import {
  UserDataForMaxCreditAmount,
  MaxCreditAmount,
  CreditRating,
} from "./interfaces";

// поиск максимальной суммы в зависимости от рейтинга
function findMaxCreditAmountByCreditRating({
  creditRating,
}: CreditRating): MaxCreditAmount {
  if (creditRating === "-1") return { amount: 1 };
  if (creditRating === "0") return { amount: 5 };
  if (creditRating === "1" || creditRating === "2") return { amount: 10 };

  // по умолчанию возвращаем минимально доступную сумму кредита
  return { amount: 1};
}

// поиск максимальмальной суммы в зависимости от источника дохода
// выбираем наименьшую сумму из двух доступных - по рейтингу и по источнику дохода
export function findMaxCreditAmount({
  incomeSource,
  creditRating,
}: UserDataForMaxCreditAmount): MaxCreditAmount {
    let maxAmountByRating;
    let isMaxAmountAvailabe = findMaxCreditAmountByCreditRating({
        creditRating,
      });
      isMaxAmountAvailabe ? maxAmountByRating = isMaxAmountAvailabe.amount : maxAmountByRating = 0;
  let amount;

  if (incomeSource.includes("passive income")) {

    return { amount: 1 };
  } else if (incomeSource.includes("employed person")) {
    maxAmountByRating < 5 ? (amount = maxAmountByRating) : (amount = 5);

    return { amount: amount };
  } else if (incomeSource.includes("business owner")) {
    maxAmountByRating < 10 ? (amount = maxAmountByRating) : (amount = 10);

    return { amount: amount };
  }

  // по умолчанию возвращаем минимально доступную сумму кредита
  return { amount: 1};
}
