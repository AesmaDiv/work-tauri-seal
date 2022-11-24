
import { useState } from 'react';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const POSITION = {vertical: 'bottom', horizontal: 'right'};
const TIMEOUT = 2000;

/** Провайдер службы сообщений */
export default function PopMessage() {
  const [open, setOpen] = useState(false);
  const {message} = useSelector(state => state.messageReducer);

  useEffect(() => {
    setOpen(true);
  }, [message])

  return (
    <Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={TIMEOUT} anchorOrigin={POSITION}>
      <Alert severity={message.severity}>{message.text}</Alert>
    </Snackbar>
  )
}