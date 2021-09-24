import { countCreditRate } from "./countCreditRate";

describe("Расчёт модификаторов кредитной ставки.", () => {
  test("Проверяем расчёт для данных: ипотека, рейтинг -1, доход пассивный сумма 0.1 млн", () => {
    let result = countCreditRate({
      target: "mortgage",
      creditRating: "-1",
      creditAmount: 0.1,
      incomeSource: ["passive income"],
    }).creditRate;

    expect(result).toEqual(12.302585092994045);
  });

  test("Проверяем расчёт для данных: развитие бизнеса, рейтинг 0, доход от собственного бизнеса, сумма 10 млн", () => {
    let result = countCreditRate({
      target: "business development",
      creditRating: "0",
      creditAmount: 10,
      incomeSource: ["business owner"],
    }).creditRate;

    expect(result).toEqual(7.447414907005954);
  });

  test("Проверяем расчёт для данных: потребительский кредит, рейтинг 1, доход наёмного работника, сумма 1 млн", () => {
    let result = countCreditRate({
      target: "consumer loan",
      creditRating: "1",
      creditAmount: 1,
      incomeSource: ["employed person"],
    }).creditRate;

    expect(result).toEqual(11);
  });

  test("Проверяем расчёт для данных: автокредит, рейтинг 2, доход пассивный и от бизнеса, сумма 5 млн", () => {
    let result = countCreditRate({
      target: "car loan",
      creditRating: "2",
      creditAmount: 5,
      incomeSource: ["passive income", "business owner"],
    }).creditRate;

    expect(result).toEqual(8.1405620875659);
  });
});
