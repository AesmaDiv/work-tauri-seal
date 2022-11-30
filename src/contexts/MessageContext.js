import { useState, useRef, useContext, createContext } from 'react';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';


const POSITION = {vertical: 'bottom', horizontal: 'right'};
const TIMEOUT = 2000;

/** Провайдер службы сообщений */
const MessageContext = createContext();
export const useMessageContext = () => useContext(MessageContext);

export default function MessageProvider({children}) {
  const message = useRef('Ready');
  const severity = useRef('success');
  const [open, setOpen] = useState(false);

  const showMessage = (message_props) => {
    message.current = message_props.text;
    severity.current = message_props.severity;
    setOpen(true);
  };

  console.log("+++ MESSAGE PROVIDER RENDER +++");
  return (
    <MessageContext.Provider value={{showMessage}}>
      {children}
      <Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={TIMEOUT} anchorOrigin={POSITION}>
        <Alert severity={severity.current}>{message.current}</Alert>
      </Snackbar>
    </MessageContext.Provider>
  )
}