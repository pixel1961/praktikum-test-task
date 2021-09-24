type IncomeSourceTypes =
  | "passive income"
  | "employed person"
  | "business owner"
  | "unemployed";
type Genders = "F" | "M";
type CreditRatings = "-2" | "-1" | "0" | "1" | "2";
type Tagets = "mortgage" | "business development" | "car loan" | "consumer loan";
type CreditDecisions =  "credit denied" | "credit approved";

export interface UserData {
  age: number;
  gender: Genders;
  incomeSource: IncomeSourceTypes[];
  lastYearIncome: number;
  creditRating: CreditRatings;
  creditAmount: number;
  repaymentPeriod: number;
  target: Tagets;
}

export interface CreditDecision {
  creditDecision: CreditDecisions;
  annualPayment?: number;
  message?: string;
}

export interface UserDataForValidation {
  age: number;
  lastYearIncome: number;
  creditAmount: number;
  repaymentPeriod: number;
}

export interface UserDataForCreditCount {
  incomeSource: IncomeSourceTypes[];
  creditRating: CreditRatings;
  creditAmount: number;
  lastYearIncome: number;
  repaymentPeriod: number;
  target: Tagets;
}

export interface UserDataForRateCount {
  incomeSource: IncomeSourceTypes[];
  creditRating: CreditRatings;
  creditAmount: number;
  target: Tagets;
}

export interface CreditRate {
  creditRate: number;
}

export interface UserDataForCreditConditionsCheck {
  age: number;
  gender: Genders;
  incomeSource: IncomeSourceTypes[];
  lastYearIncome: number;
  creditRating: CreditRatings;
  creditAmount: number;
  repaymentPeriod: number;
}

export interface UserDataForMaxCreditAmount {
  incomeSource: IncomeSourceTypes[];
  creditRating: CreditRatings;
}

export interface CreditRating {
  creditRating: CreditRatings;
}

export interface MaxCreditAmount {
  amount: number;
}
