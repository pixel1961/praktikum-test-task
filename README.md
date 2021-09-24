# Функция для расчёта кредита

Проект сделан при помощи [Create React App](https://github.com/facebook/create-react-app), т.к. он предлагает готовую инфраструктуру для запуска тестов. 

## Описание проекта
Задание выполнено на TypeScript, так как он позволяет проверить типы параметров и их обязательность на уровне статического анализа кода. 

Файл `/src/makeCreditDecision.ts` является основным. В него приходят входные данные и вызываются остальные функции: 
- `src/userDataValidation.ts` - валидация входных параметров на граничные значения; 
- `src/checkCreditConditions.ts` - проверка первичных условий выдачи кредита; 
- `src/findMaxCreditAmount.ts` - определение максимально доступной суммы кредита в зависимости от рейтинга и источника дохода; 
- `src/countAnnualPaymentAndInterest.ts` - функция для расчёта ежегодного платежа и процентов по нему; 
- `src/countCreditRate.ts` - функция для определения итоговой ставки по кредиту, с учётом модификаторов; 
- `src/interfaces.ts` - интерфейсы для функций. 

Структура файлов соответствует блокам процесса выдачи кредита [на схеме в Miro](https://miro.com/app/board/o9J_lvxc5f8=/).

Тесты на функции содержатся в файлах вида `*.test.ts`. Написаны на [jest](https://jestjs.io/). 

## Для запуска тестов 
1) склонировать репозиторий 
2) выполнить `npm install`
3) запустить тесты - `npm test`

Результат прогона тестов выглядит примерно так: 
`PASS  src/checkCreditConditions.test.ts`
`PASS  src/makeCreditDecision.test.ts`
`PASS  src/countCreditRate.test.ts`
`PASS  src/userDataValidation.test.ts`
`PASS  src/countAnnualPaymentAndInterest.test.ts`
`PASS  src/findMaxCreditAmount.test.ts`

`Test Suites: 6 passed, 6 total`
`Tests:       44 passed, 44 total`
`Snapshots:   0 total`
`Time:        2.755 s`
`Ran all test suites related to changed files.`
