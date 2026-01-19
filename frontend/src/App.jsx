import Header from "./components/layout/Header";
import PageContainer from "./components/layout/PageContainer";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <PageContainer>
      <Header />
      <Dashboard />
    </PageContainer>
  );
}

export default App;
