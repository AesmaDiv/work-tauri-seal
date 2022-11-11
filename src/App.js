import AppHeader from './components/AppBar/AppHeader';
import RecordList from './components/RecordList/RecordList';
import RecordInfo from './components/RecordInfo/RecordInfo';
import PowerForm from './components/TestForms/Power/PowerForm';
import PressForm from './components/TestForms/Pressure/PressForm';
import StatusBar from './components/StatusBar';
import AccordionWrapper from './components/AccordionWrapper/AccordionWrapper';
import Auxiliary from './components/Auxiliary';
import RecordProvider from './contexts/RecordContext';
import { SealTypeProvider } from './contexts/SealTypesContext';
import { HardwareProvider } from './contexts/HardwareContext';

import './App.css';
import { TestingProvider } from './contexts/TestingContext';


function App() {
  console.log("***APP RENDER***");
  return (
    <div className="App">
      <AppHeader>
        <div style={{width: 600}}>Some item</div>
      </AppHeader>
      <section className="App-body">
          <RecordProvider>
            <RecordList/>
            <HardwareProvider>
              <TestingProvider>
                <AccordionWrapper direction='column'>
                  <SealTypeProvider accordion_key='key_testinfo' accordion_title='Информация об объекте'>
                    <RecordInfo/>
                  </SealTypeProvider>
                    <PressForm accordion_key='key_testpress' accordion_title='Давление диафрагм'/>
                    <PowerForm accordion_key='key_testpower' accordion_title='Потребляемая мощность'/>
                  <Auxiliary accordion_key='key_auxiliary' accordion_title='Auxuliary'/>
                </AccordionWrapper>
              </TestingProvider>
            </HardwareProvider>
          </RecordProvider>
      </section>
      <footer className="App-footer">
        <StatusBar />
      </footer>
    </div>
  );
}

export default App;