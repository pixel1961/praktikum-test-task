import { makeCreditDecision } from "./makeCreditDecision";

describe("Выдача кредита.", () => {
  test("Ипотечный кредит для мужчины с пассивным доходом, который отвечает всем условиям, будет выдан", () => {
    // возраст на момент возврата кредита больше пенсионного для F, но меньше, чем для М
    // запрашиваем кредит на максимальный срок
    let result = makeCreditDecision({
      age: 44,
      gender: "M",
      incomeSource: ["passive income"],
      lastYearIncome: 1,
      creditRating: "2",
      creditAmount: 0.45,
      repaymentPeriod: 20,
      target: "mortgage",
    });

    expect(result).toEqual({
      creditDecision: "credit approved",
      annualPayment: 0.06618016,
    });
  });

  test("Потребительский кредит для мужчины-наёмного работника, который отвечает всем условиям, будет выдан", () => {
    // возраст на момент возврата кредита больше пенсионного для F и равен для М
    let result = makeCreditDecision({
      age: 55,
      gender: "M",
      incomeSource: ["employed person"],
      lastYearIncome: 2.271938,
      creditRating: "0",
      creditAmount: 5,
      repaymentPeriod: 10,
      target: "consumer loan",
    });

    expect(result).toEqual({
      creditDecision: "credit approved",
      annualPayment: 1.07670113,
    });
  });

  test("Кредит на развитие бизнеса для мужчины-владельца бизнеса, который отвечает всем условиям, будет выдан", () => {
    // возраст на момент возврата кредита больше пенсионного для F, но меньше, чем для М на 1 год
    let result = makeCreditDecision({
      age: 62,
      gender: "M",
      incomeSource: ["business owner"],
      lastYearIncome: 16,
      creditRating: "1",
      creditAmount: 10,
      repaymentPeriod: 2,
      target: "business development",
    });

    expect(result).toEqual({
      creditDecision: "credit approved",
      annualPayment: 6.13141502,
    });
  });

  test("Ипотечный кредит для женщины-владельца бизнеса, которая отвечает всем условиям, будет выдан", () => {
    // дробные значения периода погашения
    let result = makeCreditDecision({
      age: 40,
      gender: "F",
      incomeSource: ["business owner"],
      lastYearIncome: 7.3,
      creditRating: "2",
      creditAmount: 6,
      repaymentPeriod: 2.5,
      target: "mortgage",
    });

    expect(result).toEqual({
      creditDecision: "credit approved",
      annualPayment: 2.89904261,
    });
  });

  test("Автокредит для женщины-наёмного работника с пассивным доходом, которая отвечает всем условиям, будет выдан", () => {
    // дробные значения периода погашения
    let result = makeCreditDecision({
      age: 20,
      gender: "F",
      incomeSource: ["passive income", "employed person"],
      lastYearIncome: 0.9,
      creditRating: "-1",
      creditAmount: 0.1,
      repaymentPeriod: 1,
      target: "car loan",
    });

    expect(result).toEqual({
      creditDecision: "credit approved",
      annualPayment: 0.13065081,
    });
  });

  // далее проверяем, что все вызываемые внутри функции на проверку условий работают, если возвращается ошибка
  test("Если переданы некорректные данные по кредитополучателю, то возвращаем ошибку", () => {
    let result = makeCreditDecision({
      age: 0,
      gender: "M",
      incomeSource: ["employed person"],
      lastYearIncome: -10,
      creditRating: "1",
      creditAmount: 8,
      repaymentPeriod: 10,
      target: "business development",
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message:
        "Указаны некорректные данные: возраст не может быть нулевым или отрицательным; годовой доход не может быть нулевым или отрицательным.",
    });
  });

  test("Если запрошенная сумма превышает допустимую для источника дохода, то отказываем в выдаче кредита", () => {
    let result = makeCreditDecision({
      age: 19,
      gender: "M",
      incomeSource: ["employed person"],
      lastYearIncome: 10,
      creditRating: "1",
      creditAmount: 8,
      repaymentPeriod: 10,
      target: "car loan",
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message:
        "Запрошенная сумма кредита больше допустимой для указанных источника дохода и рейтинга, вам доступно 5 млн.",
    });
  });

  test("Если годовой платёж (включая проценты) больше половины дохода, то отказываем в выдаче кредита", () => {
    let result = makeCreditDecision({
      age: 30,
      gender: "M",
      target: "consumer loan",
      creditRating: "1",
      incomeSource: ["business owner"],
      creditAmount: 9.999999,
      lastYearIncome: 3.88,
      repaymentPeriod: 10,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message: "Годовой платёж + проценты превышают половину годового дохода",
    });
  });
});
