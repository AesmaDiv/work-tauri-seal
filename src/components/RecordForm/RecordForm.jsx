import { Button, FormControl } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import SealTypeInfo from './RFSealTypeInfo';
import RecordInfo from './RFRecordInfo';
import { writeRecord, resetRecord } from '../../redux/recordReducer';
import { RECORD_COLUMNS } from '../../database/db_tables';
import cls from './RecordForm.module.css';


export default function RecordForm() {
  const {record} = useSelector(state => state.recordReducer);
  const dispatch = useDispatch();

  const _handleReset = (event) => {
    event.preventDefault();
    dispatch(resetRecord());
  }
  const _handleSubmit = (event) => {
    event.preventDefault();
    let form_data = _getFormData(event.target);
    console.warn("RecordForm >>", form_data);
    dispatch(writeRecord(form_data));
  }

  const _getFormData = (form) => {
    let data = new FormData(form);
    let result = RECORD_COLUMNS.reduce((obj, item) => {
      obj[item.name] = data.get(item.name);
      return obj;
    }, {});
    result.id = record.id;
    result.sealtype = parseInt(data.get('id'), 10);

    return result;
  }
  function InvalidMsg(textbox) {
    if (textbox.value == '') {
        textbox.setCustomValidity('Lütfen işaretli yerleri doldurunuz');
    }
    else if (textbox.validity.typeMismatch){
        textbox.setCustomValidity('Lütfen işaretli yere geçerli bir email adresi yazınız.');
    }
    else {
       textbox.setCustomValidity('');
    }
    return true;
}
  console.log("*** RECORD-INFO RENDER ***");
  return (
    <div className={cls.main}>
      <form className={cls.datafields} onSubmit={_handleSubmit} onReset={_handleReset} aria-errormessage="msgID">
	      <RecordInfo record={record} />
        <SealTypeInfo />
        <Button key='btn-reset-testinfo' type='reset' variant='contained' size='small' color='warning'
          sx={{ gridColumn: 4, gridRow: 6, gridRowEnd: 8, mt: "1px", mb: "41px", pb: 0}}
        >Сброс</Button>
        <Button key='btn-save-testinfo' type='submit' variant='contained' size='small' color='primary'
          sx={{ gridColumn: 4, gridRow: 8, gridRowEnd: 10, mt: "1px", mb: "41px", pb: 0}}
        >Сохранить</Button>
      </form>
    </div>
  );
}