/**
 * Функция для расчёта модификаторов кредитной ставки. Возвращает базовую ставку + все модификаторы.
 * -2% для ипотеки, -0.5% для развития бизнеса, +1.5% для потребительского кредита
 * +1.5% для кредитного рейтинга -1, 0% для кредитного рейтинга 0, -0.25% для кредитного рейтинга 1,
 * -0.75% для кредитного рейтинга 2
 * Модификатор в зависимости от запрошенной суммы рассчитывается по формуле [-log(sum)];
 * Для пассивного дохода ставка повышается на 0.5%, для наемных работников ставка снижается на 0.25%,
 * для заемщиков с собственным бизнесом ставка повышается на 0.25%
 */
import { UserDataForRateCount, CreditRate } from "./interfaces";

export function countCreditRate({
  target,
  creditRating,
  creditAmount,
  incomeSource,
}: UserDataForRateCount): CreditRate {
  let rate = 10;
  if (target === "mortgage") rate -= 2;
  if (target === "business development") rate -= 0.5;
  if (target === "consumer loan") rate += 1.5;

  if (creditRating === "-1") rate += 1.5;
  if (creditRating === "1") rate -= 0.25;
  if (creditRating === "2") rate -= 0.75;

  let modificatorByAmount = -Math.log(creditAmount);
  rate += modificatorByAmount;

  /**
   * если указано несколько источников дохода, то возвращаем максимальный модификатор
   * модификаторы расположены по убыванию - от самой большой надбавки за пассивный доход
   * до самой низкой - -0,25% за наёмный труд.
   * Если уже окажемся в какой-то ветке, то из-за return в другие ветки не попасть
   */
  if (incomeSource.includes("passive income")) {
    rate += 0.5;
    return { creditRate: rate };
  }
  if (incomeSource.includes("business owner")) {
    rate += 0.25;
    return { creditRate: rate };
  }
  if (incomeSource.includes("employed person")) {
    rate -= 0.25;
    return { creditRate: rate };
  }

  return { creditRate: rate };
}
