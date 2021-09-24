import { checkCreditConditions } from "./checkCreditConditions";

describe("Проверка первичных условий для выдачи кредита.", () => {
  test("Если данные о пользователе удовлетворяют всем первичным условиям, то возвращаем null", () => {
    let result = checkCreditConditions({
      age: 18,
      gender: "F",
      incomeSource: ["passive income", "employed person"],
      lastYearIncome: 2.999998,
      creditRating: "-1",
      creditAmount: 0.999999,
      repaymentPeriod: 1,
    });

    expect(result).toBeNull();
  });

  test("Если кредитный рейтинг равен -2, то отказываем в выдаче кредита", () => {
    let result = checkCreditConditions({
      age: 59,
      gender: "M",
      incomeSource: ["passive income"],
      lastYearIncome: 15,
      creditRating: "-2",
      creditAmount: 0.2,
      repaymentPeriod: 5,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message: "У вас недостаточно кредитного рейтинга",
    });
  });

  test("Если кредитополучатель безработный, то отказываем в выдаче кредита", () => {
    let result = checkCreditConditions({
      age: 35,
      gender: "M",
      incomeSource: ["unemployed"],
      lastYearIncome: 150,
      creditRating: "2",
      creditAmount: 0.3,
      repaymentPeriod: 10,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message: "Кредиты не выдаются безработным",
    });
  });

  test("Если у кредитополучателя среди источников дохода указано, что он безработный, то отказываем в выдаче кредита", () => {
    let result = checkCreditConditions({
      age: 20,
      gender: "M",
      incomeSource: ["passive income", "unemployed"],
      lastYearIncome: 10,
      creditRating: "1",
      creditAmount: 2,
      repaymentPeriod: 19,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message: "Кредиты не выдаются безработным",
    });
  });

  test("Если запрошенная сумма превышает допустимую для данного рейтинга, то отказываем в выдаче кредита", () => {
    let result = checkCreditConditions({
      age: 40,
      gender: "M",
      incomeSource: ["business owner"],
      lastYearIncome: 42,
      creditRating: "0",
      creditAmount: 8,
      repaymentPeriod: 2,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message:
      "Запрошенная сумма кредита больше допустимой для указанных источника дохода и рейтинга, вам доступно 5 млн.",
    });
  });

  test("Если запрошенная сумма превышает допустимую для одного из источников дохода, то отказываем в выдаче кредита", () => {
    let result = checkCreditConditions({
      age: 23,
      gender: "F",
      incomeSource: ["passive income", "employed person"],
      lastYearIncome: 23,
      creditRating: "0",
      creditAmount: 5.01,
      repaymentPeriod: 20,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message:
      "Запрошенная сумма кредита больше допустимой для указанных источника дохода и рейтинга, вам доступно 1 млн.",
    });
  });

  test("Если кредитополучатель - F и возраст на момент возврата превышает пенсионный для F, то отказываем в выдаче кредита", () => {
    let result = checkCreditConditions({
      age: 57.1,
      gender: "F",
      incomeSource: ["employed person"],
      lastYearIncome: 8,
      creditRating: "2",
      creditAmount: 0.11,
      repaymentPeriod: 3,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message:
        "Возраст на момент возврата кредита превышает пенсионный - 60 лет",
    });
  });

  test("Если кредитополучатель - M и возраст на момент возврата превышает пенсионный для M, то отказываем в выдаче кредита", () => {
    let result = checkCreditConditions({
      age: 60,
      gender: "M",
      incomeSource: ["business owner"],
      lastYearIncome: 108,
      creditRating: "1",
      creditAmount: 10,
      repaymentPeriod: 10,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message:
        "Возраст на момент возврата кредита превышает пенсионный - 65 лет",
    });
  });

  test("Если запрошенная сумма / срок погашения > трети годового дохода, то отказываем в выдаче кредита", () => {
    let result = checkCreditConditions({
      age: 30,
      gender: "M",
      incomeSource: ["employed person"],
      lastYearIncome: 1,
      creditRating: "0",
      creditAmount: 5,
      repaymentPeriod: 10,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message: "Сумма / срок погашения больше трети годового дохода",
    });
  });

  test("Если запрошенная сумма / срок погашения = трети годового дохода, то выдаём кредит", () => {
    let result = checkCreditConditions({
      age: 30,
      gender: "F",
      incomeSource: ["employed person", "passive income"],
      lastYearIncome: 0.9,
      creditRating: "-1",
      creditAmount: 0.3,
      repaymentPeriod: 3,
    });

    expect(result).toBeNull();
  });
});
