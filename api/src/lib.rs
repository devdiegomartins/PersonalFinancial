// Módulo para operações matemáticas básicas
pub mod math {
    pub fn add(left: u64, right: u64) -> u64 {
        left + right
    }

    pub fn subtract(left: u64, right: u64) -> u64 {
        left.saturating_sub(right)
    }

    pub fn multiply(left: u64, right: u64) -> u64 {
        left * right
    }

    pub fn divide(left: u64, right: u64) -> Option<u64> {
        if right == 0 {
            None
        } else {
            Some(left / right)
        }
    }
}

// Módulo para operações financeiras
pub mod finance {
    use serde::{Deserialize, Serialize};

    #[derive(Debug, Clone, Serialize, Deserialize)]
    pub struct Transaction {
        pub id: String,
        pub amount: f64,
        pub description: String,
        pub category: String,
        pub date: String,
        pub transaction_type: TransactionType,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
    pub enum TransactionType {
        Income,
        Expense,
    }

    #[derive(Debug, Clone, Serialize, Deserialize)]
    pub struct Account {
        pub id: String,
        pub name: String,
        pub balance: f64,
        pub currency: String,
    }

    pub fn calculate_balance(transactions: &[Transaction]) -> f64 {
        transactions.iter().fold(0.0, |acc, transaction| {
            match transaction.transaction_type {
                TransactionType::Income => acc + transaction.amount,
                TransactionType::Expense => acc - transaction.amount,
            }
        })
    }

    pub fn calculate_monthly_expenses(transactions: &[Transaction], month: &str) -> f64 {
        transactions
            .iter()
            .filter(|t| {
                t.transaction_type == TransactionType::Expense && t.date.contains(month)
            })
            .fold(0.0, |acc, t| acc + t.amount)
    }

    pub fn calculate_monthly_income(transactions: &[Transaction], month: &str) -> f64 {
        transactions
            .iter()
            .filter(|t| {
                t.transaction_type == TransactionType::Income && t.date.contains(month)
            })
            .fold(0.0, |acc, t| acc + t.amount)
    }
}

// Re-export das funções principais para facilitar o uso
pub use math::{add, subtract, multiply, divide};
pub use finance::{Account, Transaction, TransactionType, calculate_balance, calculate_monthly_expenses, calculate_monthly_income};

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }

    #[test]
    fn test_calculate_balance() {
        let transactions = vec![
            Transaction {
                id: "1".to_string(),
                amount: 1000.0,
                description: "Salário".to_string(),
                category: "Trabalho".to_string(),
                date: "2024-01-15".to_string(),
                transaction_type: TransactionType::Income,
            },
            Transaction {
                id: "2".to_string(),
                amount: 200.0,
                description: "Aluguel".to_string(),
                category: "Moradia".to_string(),
                date: "2024-01-20".to_string(),
                transaction_type: TransactionType::Expense,
            },
        ];

        let balance = calculate_balance(&transactions);
        assert_eq!(balance, 800.0);
    }
}
