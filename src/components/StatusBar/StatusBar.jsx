import { message } from '@tauri-apps/api/dialog';
import { React, useCallback, useState } from 'react';
import cls from './StatusBar.module.css';

export const StatusBar = (props) => {
  const [_message, _setMessage] = useState('default message');
  const _callback = useCallback((msg) => {
    _setMessage(msg)
  })[message];

  return (
    <div className={cls.main}>
      {_message}
    </div>
  );
}