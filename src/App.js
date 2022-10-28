import AppHeader from './components/AppBar/AppHeader';
import TestList from './components/TestList/TestList';
import TestInfo from './components/TestInfo/TestInfo';
import PowerForm from './components/TestForms/Power/PowerForm';
import PressForm from './components/TestForms/Pressure/PressForm';
import StatusBar from './components/StatusBar';
import AccordionWrapper from './components/AccordionWrapper/AccordionWrapper';
import RecordProvider from './contexts/RecordContext';
import Auxiliary from './Auxiliary';
import './App.css';


function App() {
  

  console.log("***APP RENDER***");
  return (
    <div className="App">
      <AppHeader>
        <div style={{width: 600}}>Some item</div>
      </AppHeader>
      <section className="App-body">
        <RecordProvider>
          <TestList/>
          <AccordionWrapper direction='column'>
            <TestInfo  key='key_testlist'  title='Информация об объекте'/>
            <PressForm key='key_testpress' title='Давление диафрагм'/>
            <PowerForm key='key_testpower' title='Потребляемая мощность'/>
            <Auxiliary key='key_auxiliary' title='Auxuliary'/>
          </AccordionWrapper>
        </RecordProvider>
      </section>
      <footer className="App-footer">
        <StatusBar />
      </footer>
    </div>
  );
}

export default App;