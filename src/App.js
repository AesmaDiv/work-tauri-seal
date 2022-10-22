import { Stack } from '@mui/system';
import AppHeader from './components/AppBar/AppHeader';
import TestList from './components/TestList/TestList';
import TestInfo from './components/TestInfo/TestInfo';
import TestProc from './components/TestProc/TestProc';
import StatusBar from './components/StatusBar';
import AccordionWrapper from './components/AccordionWrapper/AccordionWrapper';
import { TestProvider } from './contexts/TestContext';
import './App.css';
import Auxiliary from './Auxiliary';


function App() {
  console.log("***APP RENDER***");
  return (
    <div className="App">
      <AppHeader>
        <div style={{width: 600}}>Some item</div>
      </AppHeader>
      <section className="App-body">
        <TestProvider>
          <TestList/>
          <AccordionWrapper direction='column'>
            <TestInfo  key='key_testlist'  title='Информация об объекте'/>
            <TestProc  key='key_testpres'  title='Давление диафрагм'/>
            <Auxiliary key='key_auxiliary' title='Auxuliary'/>
          </AccordionWrapper>
        </TestProvider>
      </section>
      <footer className="App-footer">
        <StatusBar />
      </footer>
    </div>
  );
}

export default App;