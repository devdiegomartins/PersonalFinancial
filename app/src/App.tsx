import { useWindowLabel } from "./hooks/useWindowLabel";
import "./App.css";

function App() {
  const { windowLabel, isLoading: windowLoading } = useWindowLabel();



  // Renderiza conteúdo baseado na janela atual
  const renderContent = () => {
    if (windowLoading) {
      return <div>Carregando...</div>;
    }

    switch (windowLabel) {
      case 'splash':
        return (
          <div>
            <h1>Splash Screen</h1>
            <p>Carregando aplicação...</p>
          </div>
        );
      
      case 'auth':
        return (
          <div>
            <h1>Tela de Autenticação</h1>
            <p>Faça login para continuar</p>
          </div>
        );
      
      case 'dashboard':
        return (
          <div>
            <h1>Dashboard</h1>
            <p>Bem-vindo ao dashboard!</p>
          </div>
        );
      
      case 'error':
        return (
          <div>
            <h1>Tela de Erro</h1>
            <p>Ocorreu um erro na aplicação</p>
          </div>
        );
      
      default:
        return (
          <div>
            <h1>Personal Financial - Tauri + React</h1>
          </div>
        );
    }
  };

  return (
    <main className="container">
      {renderContent()}
    </main>
  );
}

export default App;
