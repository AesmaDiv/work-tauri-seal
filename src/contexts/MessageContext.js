import { useState, useContext, createContext } from 'react';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';


const POSITION = {vertical: 'bottom', horizontal: 'right'};
const TIMEOUT = 2000;

/** Провайдер службы сообщений */
const MessageContext = createContext();
export const useMessageContext = () => useContext(MessageContext);

export default function MessageProvider({children}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
    text: 'Initial message',
    severity: 'success'
  });

  const showMessage = (message, type="success") => {
    setMessage({text: message, severity: type});
    setOpen(true);
  };

  console.log("+++ MESSAGE PROVIDER RENDER +++");
  return (
    <MessageContext.Provider value={{showMessage}}>
      {children}
      <Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={TIMEOUT} anchorOrigin={POSITION}>
        <Alert severity={message.severity}>{message.text}</Alert>
      </Snackbar>
    </MessageContext.Provider>
  )
}