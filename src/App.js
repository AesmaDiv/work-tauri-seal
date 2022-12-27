import AppHeader from './components/AppHeader/AppHeader';
import RecordList from './components/RecordList/RecordList';
import RecordForm from './components/RecordForm/RecordForm';
import TestingForm from './components/TestingForms/TestingForm';
import Protocol from './components/Protocol/Protocol';
import StatusBar from './components/StatusBar';
import AccordionWrapper from './components/AccordionWrapper/AccordionWrapper';
import { HardwareProvider } from './contexts/HardwareContext';
import MessageProvider from './contexts/MessageContext';

import { PressProps, PRESS_DATANAMES } from './shared/cfg_press';
import { PowerProps, POWER_DATANAMES } from './shared/cfg_power';

import { useDispatch } from 'react-redux';
import { readDictionaries } from './redux/recordReducer';

import './App.css';



function App() {
  useDispatch()(readDictionaries())

  console.log("*** APP RENDER ***");
  return (
    <div className="App">
      <MessageProvider>
      <AppHeader>
        <div style={{width: 600}}>Some item</div>
      </AppHeader>
      <section className="App-body">
        <RecordList/>
        <HardwareProvider>
          <AccordionWrapper direction='column'>
            <RecordForm  accordion_key='key_testinfo'  accordion_title='Информация об объекте'/>
            <TestingForm accordion_key='key_testpress' accordion_title='Давление диафрагм' props={PressProps} data_fields={PRESS_DATANAMES}/>
            <TestingForm accordion_key='key_testpower' accordion_title='Потребляемая мощность' props={PowerProps} data_fields={POWER_DATANAMES}/>
            <Protocol    accordion_key='key_protocol'  accordion_title='Протокол'/>
          </AccordionWrapper>
        </HardwareProvider>
      </section>
      {/* <footer className="App-footer">
        <StatusBar />
      </footer> */}
      </MessageProvider>
    </div>
  );
}

export default App;