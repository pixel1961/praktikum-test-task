import { countAnnualPaymentAndInterest } from "./countAnnualPaymentAndInterest";

describe("Расчёт ежегодного платежа и процентов по нему.", () => {
  test("Если годовой платёж (включая проценты) меньше половины дохода, то одобряем выдачу кредита, сообщаем сумму", () => {
    let result = countAnnualPaymentAndInterest({
      target: "mortgage",
      creditRating: "2",
      incomeSource: ["passive income"],
      creditAmount: 0.45,
      lastYearIncome: 1,
      repaymentPeriod: 20,
    });

    expect(result).toEqual({
      creditDecision: "credit approved",
      annualPayment: 0.06618016,
    });
  });

  test("Если годовой платёж (включая проценты) больше половины дохода, то отказываем в выдаче кредита", () => {
    let result = countAnnualPaymentAndInterest({
      target: "car loan",
      creditRating: "2",
      incomeSource: ["employed person"],
      creditAmount: 2.45,
      lastYearIncome: 1.3,
      repaymentPeriod: 5,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message: "Годовой платёж + проценты превышают половину годового дохода",
    });
  });

  test("Если годовой платёж (включая проценты) равен половине дохода, то отказываем в выдаче кредита", () => {
    let result = countAnnualPaymentAndInterest({
      target: "consumer loan",
      creditRating: "1",
      incomeSource: ["employed person"],
      creditAmount: 1,
      lastYearIncome: 0.6881,
      repaymentPeriod: 5,
    });

    expect(result).toEqual({
      creditDecision: "credit denied",
      message: "Годовой платёж + проценты превышают половину годового дохода",
    });
  });
});
