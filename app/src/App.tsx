import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  transaction_type: "Income" | "Expense";
}

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number | null>(null);
  const [monthlyIncome, setMonthlyIncome] = useState<number | null>(null);
  const [error, setError] = useState("");

  // Dados de exemplo
  const sampleTransactions: Transaction[] = [
    {
      id: "1",
      amount: 5000,
      description: "Salário",
      category: "Trabalho",
      date: "2024-01-15",
      transaction_type: "Income"
    },
    {
      id: "2",
      amount: 1200,
      description: "Aluguel",
      category: "Moradia",
      date: "2024-01-20",
      transaction_type: "Expense"
    },
    {
      id: "3",
      amount: 300,
      description: "Supermercado",
      category: "Alimentação",
      date: "2024-01-25",
      transaction_type: "Expense"
    },
    {
      id: "4",
      amount: 800,
      description: "Freelance",
      category: "Trabalho",
      date: "2024-01-30",
      transaction_type: "Income"
    }
  ];

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  async function calculateBalance() {
    try {
      setError("");
      const result = await invoke("calculate_balance", { 
        transactionsJson: JSON.stringify(sampleTransactions) 
      });
      setBalance(result as number);
    } catch (err) {
      setError(`Erro ao calcular saldo: ${err}`);
    }
  }

  async function calculateMonthlyExpenses() {
    try {
      setError("");
      const result = await invoke("calculate_monthly_expenses", { 
        transactionsJson: JSON.stringify(sampleTransactions),
        month: "2024-01"
      });
      setMonthlyExpenses(result as number);
    } catch (err) {
      setError(`Erro ao calcular despesas mensais: ${err}`);
    }
  }

  async function calculateMonthlyIncome() {
    try {
      setError("");
      const result = await invoke("calculate_monthly_income", { 
        transactionsJson: JSON.stringify(sampleTransactions),
        month: "2024-01"
      });
      setMonthlyIncome(result as number);
    } catch (err) {
      setError(`Erro ao calcular receitas mensais: ${err}`);
    }
  }

  return (
    <main className="container">
      <h1>Personal Financial - Tauri + React</h1>

      <div className="row">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* Seção de Teste Básico */}
      <section className="section">
        <h2>Teste Básico</h2>
        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Digite um nome..."
          />
          <button type="submit">Cumprimentar</button>
        </form>
        <p>{greetMsg}</p>
      </section>

      {/* Seção Financeira */}
      <section className="section">
        <h2>Funcionalidades Financeiras</h2>
        <p>Usando a biblioteca <code>api_personal_financial</code></p>
        
        <div className="row">
          <button onClick={calculateBalance}>Calcular Saldo</button>
          <button onClick={calculateMonthlyExpenses}>Calcular Despesas Mensais</button>
          <button onClick={calculateMonthlyIncome}>Calcular Receitas Mensais</button>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="results">
          {balance !== null && (
            <div className="result-item">
              <strong>Saldo Total:</strong> R$ {balance.toFixed(2)}
            </div>
          )}
          {monthlyExpenses !== null && (
            <div className="result-item">
              <strong>Despesas Mensais (Jan/2024):</strong> R$ {monthlyExpenses.toFixed(2)}
            </div>
          )}
          {monthlyIncome !== null && (
            <div className="result-item">
              <strong>Receitas Mensais (Jan/2024):</strong> R$ {monthlyIncome.toFixed(2)}
            </div>
          )}
        </div>

        <div className="transactions">
          <h3>Transações de Exemplo:</h3>
          <ul>
            {sampleTransactions.map(t => (
              <li key={t.id}>
                <strong>{t.description}</strong> - R$ {t.amount.toFixed(2)} 
                ({t.transaction_type === "Income" ? "Receita" : "Despesa"})
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default App;
