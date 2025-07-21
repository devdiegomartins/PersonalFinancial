# Personal Financial - Tauri + React

Este projeto demonstra como criar uma aplicação Tauri com uma biblioteca Rust separada para organizar a lógica de negócio.

## Estrutura do Projeto

```
PersonalFinancial/
├── api/                          # Biblioteca Rust separada
│   ├── Cargo.toml               # Dependências da biblioteca
│   └── src/
│       └── lib.rs               # Lógica de negócio financeira
├── app/                         # Aplicação Tauri + React
│   ├── src-tauri/
│   │   ├── Cargo.toml          # Dependências do Tauri (inclui api_personal_financial)
│   │   └── src/
│   │       ├── lib.rs          # Comandos Tauri que usam a biblioteca
│   │       └── main.rs         # Ponto de entrada
│   └── src/
│       └── App.tsx             # Interface React
```

## Como Funciona

### 1. Biblioteca Separada (`api/`)

A biblioteca `api_personal_financial` contém toda a lógica de negócio financeira:

- **Módulo `math`**: Operações matemáticas básicas
- **Módulo `finance`**: Estruturas e funções para gestão financeira
  - `Transaction`: Representa uma transação financeira
  - `Account`: Representa uma conta bancária
  - `calculate_balance()`: Calcula o saldo total
  - `calculate_monthly_expenses()`: Calcula despesas mensais
  - `calculate_monthly_income()`: Calcula receitas mensais

### 2. Aplicação Tauri (`app/`)

O projeto Tauri usa a biblioteca como dependência:

```toml
[dependencies]
api_personal_financial = { path = "../../api" }
```

### 3. Comandos Tauri

Os comandos Tauri fazem a ponte entre o frontend e a biblioteca:

- `greet`: Comando básico de exemplo
- `calculate_balance`: Calcula saldo usando a biblioteca
- `calculate_monthly_expenses`: Calcula despesas mensais
- `calculate_monthly_income`: Calcula receitas mensais

## Vantagens desta Arquitetura

1. **Separação de Responsabilidades**: Lógica de negócio isolada da interface
2. **Reutilização**: A biblioteca pode ser usada em outros projetos
3. **Testabilidade**: Fácil de testar a lógica de negócio independentemente
4. **Manutenibilidade**: Mudanças na lógica não afetam a interface
5. **Debug Mode**: Permite usar ferramentas de debug específicas para Rust

## Como Executar

### Pré-requisitos

- Rust (última versão estável)
- Node.js (versão 18+)
- Tauri CLI: `cargo install tauri-cli`

### Executar o Projeto

```bash
# Na raiz do projeto
cd app
npm install
npm run tauri dev
```

### Testar a Biblioteca Separadamente

```bash
# Testar apenas a biblioteca
cd api
cargo test
cargo check
```

## Exemplo de Uso

### Frontend (React/TypeScript)

```typescript
import { invoke } from "@tauri-apps/api/core";

// Calcular saldo
const balance = await invoke("calculate_balance", { 
  transactionsJson: JSON.stringify(transactions) 
});

// Calcular despesas mensais
const expenses = await invoke("calculate_monthly_expenses", { 
  transactionsJson: JSON.stringify(transactions),
  month: "2024-01"
});
```

### Backend (Rust/Tauri)

```rust
use api_personal_financial::{self, finance::Transaction};

#[tauri::command]
fn calculate_balance(transactions_json: String) -> Result<f64, String> {
    let transactions: Vec<Transaction> = serde_json::from_str(&transactions_json)
        .map_err(|e| format!("Erro ao fazer parse: {}", e))?;
    
    Ok(api_personal_financial::calculate_balance(&transactions))
}
```

## Estrutura de Dados

### Transaction

```rust
pub struct Transaction {
    pub id: String,
    pub amount: f64,
    pub description: String,
    pub category: String,
    pub date: String,
    pub transaction_type: TransactionType,
}

pub enum TransactionType {
    Income,
    Expense,
}
```

## Desenvolvimento

### Adicionar Novas Funcionalidades

1. **Na biblioteca** (`api/src/lib.rs`): Implemente a lógica de negócio
2. **No Tauri** (`app/src-tauri/src/lib.rs`): Crie comandos que usam a biblioteca
3. **No Frontend** (`app/src/App.tsx`): Crie a interface para usar os comandos

### Debug e Testes

- Use `cargo test` na pasta `api/` para testar a biblioteca
- Use `cargo check` em ambas as pastas para verificar compilação
- Use ferramentas de debug do Rust na biblioteca separadamente

## Próximos Passos

- [ ] Adicionar persistência de dados (SQLite/PostgreSQL)
- [ ] Implementar autenticação de usuários
- [ ] Adicionar relatórios e gráficos
- [ ] Implementar sincronização com APIs bancárias
- [ ] Adicionar suporte a múltiplas moedas 