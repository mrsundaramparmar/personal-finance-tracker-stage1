export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
}

export interface MonthlyExpenseData {
  month: string;
  expenses: number;
}