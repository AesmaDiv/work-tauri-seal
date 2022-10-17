import { TestProvider } from './contexts/TestContext';
import StatusBar from './components/StatusBar';
import TestInfo from './components/TestInfo/TestInfo';
import TestList from './components/TestList/TestList';
import MuiAppBar from './components/AppBar/MuiAppBar';
import './App.css';


function App() {

  console.log("***APP RENDER***");
  return (
    <div className="App">
      <header className="App-header">
        <MuiAppBar />
      </header>
      <section className="App-body">
        <TestProvider>
          <TestList />
          <TestInfo />
        </TestProvider>
      </section>
      <footer className="App-footer">
        <StatusBar />
      </footer>
    </div>
  );
}

export default App;