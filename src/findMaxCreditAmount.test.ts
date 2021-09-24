import { findMaxCreditAmount } from "./findMaxCreditAmount";

describe("Проверка поиска максимальной суммы кредита в зависимости от рейтинга и от источника дохода.", () => {
  test("Если источник дохода - пассивный и рейтинг равен -1, то максимальная сумма - 1 млн", () => {
    let result = findMaxCreditAmount({
        incomeSource: ["passive income"],
        creditRating: '-1',
    }).amount;

    expect(result).toEqual(1);
  });

  test("Если источник дохода - наёмный рабочий, но кредитный рейтинг равен -1, то максимальная сумма - 1 млн", () => {
    let result = findMaxCreditAmount({
        incomeSource: ["employed person"],
        creditRating: '-1',
    }).amount;

    expect(result).toEqual(1);
  });

  test("Если источник дохода - наёмный рабочий и кредитный рейтинг равен 0, то максимальная сумма - 5 млн", () => {
    let result = findMaxCreditAmount({
        incomeSource: ["employed person"],
        creditRating: '0',
    }).amount;

    expect(result).toEqual(5);
  });

  test("Если источник дохода - собственный бизнес, но кредитный рейтинг равен 0, то максимальная сумма - 5 млн", () => {
    let result = findMaxCreditAmount({
        incomeSource: ["business owner"],
        creditRating: '0',
    }).amount;

    expect(result).toEqual(5);
  });

  test("Если источник дохода - наёмный работник и кредитный рейтинг равен 1, то максимальная сумма - 5 млн", () => {
    let result = findMaxCreditAmount({
        incomeSource: ["employed person"],
        creditRating: '1',
    }).amount;

    expect(result).toEqual(5);
  });

  test("Если кредитный рейтинг равен 2, но источник дохода - пассивный, то максимальная сумма - 1 млн", () => {
    let result = findMaxCreditAmount({
        incomeSource: ["passive income"],
        creditRating: '2',
    }).amount;

    expect(result).toEqual(1);
  });

  test("Если кредитный рейтинг равен 2 и источник дохода - собственный бизнес, то максимальная сумма - 10 млн", () => {
    let result = findMaxCreditAmount({
        incomeSource: ["business owner"],
        creditRating: '2',
    }).amount;

    expect(result).toEqual(10);
  });

  test("Если кредитный рейтинг равен 2, но хотя бы один источник дохода - наёмный, то максимальная сумма - 5 млн", () => {
    let result = findMaxCreditAmount({
        incomeSource: ["business owner", "employed person"],
        creditRating: '2',
    }).amount;

    expect(result).toEqual(5);
  });

  test("Если кредитный рейтинг равен 1, но хотя бы один источник дохода - пассивный, то максимальная сумма - 1 млн", () => {
    let result = findMaxCreditAmount({
        incomeSource: ["employed person", "passive income"],
        creditRating: '1',
    }).amount;

    expect(result).toEqual(1);
  });
});
