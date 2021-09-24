import { userDataValidation } from "./userDataValidation";

describe("Проверка валидации.", () => {
  test("Если все данные корректны, то ошибок не возвращаем, в результате - null", () => {
    let result = userDataValidation({
      age: 25,
      lastYearIncome: 15,
      creditAmount: 5,
      repaymentPeriod: 12,
    });

    expect(result).toBeNull();
  });

  test("Если передать отрицательный возраст, покажем ошибку", () => {
    let result = userDataValidation({
      age: -0.1,
      lastYearIncome: 10,
      creditAmount: 0.1,
      repaymentPeriod: 1,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message:
        "Указаны некорректные данные: возраст не может быть нулевым или отрицательным.",
    });
  });

  test("Если передать нулевой возраст, покажем ошибку", () => {
    let result = userDataValidation({
      age: 0,
      lastYearIncome: 10,
      creditAmount: 0.1,
      repaymentPeriod: 1,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message:
        "Указаны некорректные данные: возраст не может быть нулевым или отрицательным.",
    });
  });

  test("Если передать отрицательный годовой доход, покажем ошибку", () => {
    let result = userDataValidation({
      age: 20,
      lastYearIncome: -10,
      creditAmount: 0.1,
      repaymentPeriod: 1,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message:
        "Указаны некорректные данные: годовой доход не может быть нулевым или отрицательным.",
    });
  });

  test("Если передать нулевой годовой доход, покажем ошибку", () => {
    let result = userDataValidation({
      age: 20,
      lastYearIncome: 0,
      creditAmount: 0.1,
      repaymentPeriod: 1,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message:
        "Указаны некорректные данные: годовой доход не может быть нулевым или отрицательным.",
    });
  });

  test("Если передать сумму кредита меньше, чем 0.1, покажем ошибку", () => {
    let result = userDataValidation({
      age: 20,
      lastYearIncome: 10,
      creditAmount: 0.099,
      repaymentPeriod: 1,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message:
        "Указаны некорректные данные: сумма кредита должна быть не менее 0.1 млн.",
    });
  });

  test("Если передать сумму кредита больше, чем 10 млн, покажем ошибку", () => {
    let result = userDataValidation({
      age: 20,
      lastYearIncome: 10,
      creditAmount: 10.001,
      repaymentPeriod: 1,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message:
        "Указаны некорректные данные: сумма кредита не может быть более 10 млн.",
    });
  });

  test("Если передать срок погашения меньше 1 года, покажем ошибку", () => {
    let result = userDataValidation({
      age: 20,
      lastYearIncome: 10,
      creditAmount: 5,
      repaymentPeriod: 0.9,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message:
        "Указаны некорректные данные: срок погашения не может быть меньше 1 года.",
    });
  });

  test("Если передать срок погашения больше 20 лет, покажем ошибку", () => {
    let result = userDataValidation({
      age: 20,
      lastYearIncome: 10,
      creditAmount: 5,
      repaymentPeriod: 20.01,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message:
        "Указаны некорректные данные: срок погашения не может быть больше 20 лет.",
    });
  });

  test("Если переданы все данные некорректными (нулевые возраст, годовой доход, сумма кредита больше 10 млн и период платежей больше 20 лет), то покажем ошибку по каждому полю", () => {
    let result = userDataValidation({
      age: 0,
      lastYearIncome: 0,
      creditAmount: 50,
      repaymentPeriod: 25,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message:
        "Указаны некорректные данные: возраст не может быть нулевым или отрицательным; годовой доход не может быть нулевым или отрицательным; сумма кредита не может быть более 10 млн; срок погашения не может быть больше 20 лет.",
    });
  });
});
