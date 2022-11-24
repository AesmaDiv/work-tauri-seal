import AppHeader from './components/AppHeader/AppHeader';
import RecordList from './components/RecordList/RecordList';
import RecordInfo from './components/RecordInfo/RecordInfo';
import TestingForm from './components/TestingForms/TestingForm';
import StatusBar from './components/StatusBar';
import AccordionWrapper from './components/AccordionWrapper/AccordionWrapper';
import Auxiliary from './components/Auxiliary';
import PopMessage from './components/PopMessage/PopMessage';
import { HardwareProvider } from './contexts/HardwareContext';

import { PressProps, PRESS_DATANAMES } from './configs/cfg_press';
import { PowerProps, POWER_DATANAMES } from './configs/cfg_power';

import './App.css';


function App() {
  console.log("***APP RENDER***");
  return (
    <div className="App">
      <AppHeader>
        <div style={{width: 600}}>Some item</div>
      </AppHeader>
      <section className="App-body">
        <RecordList/>
        <HardwareProvider>
          <AccordionWrapper direction='column'>
            <RecordInfo  accordion_key='key_testinfo'  accordion_title='Информация об объекте'/>
            <TestingForm accordion_key='key_testpress' accordion_title='Давление диафрагм' props={PressProps} data_fields={PRESS_DATANAMES}/>
            <TestingForm accordion_key='key_testpower' accordion_title='Потребляемая мощность' props={PowerProps} data_fields={POWER_DATANAMES}/>
            <Auxiliary   accordion_key='key_auxiliary' accordion_title='Auxuliary'/>
          </AccordionWrapper>
          <PopMessage/>
        </HardwareProvider>
      </section>
      <footer className="App-footer">
        <StatusBar />
      </footer>
    </div>
  );
}

export default App;