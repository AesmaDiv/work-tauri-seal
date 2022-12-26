import { Button } from '@mui/material';
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
    result.sealtype   = parseInt(data.get('id'), 10);
    result.shaft_rotation   = parseInt(data.get('shaft_rotation'), 10);
    result.shaft_connection = parseInt(data.get('shaft_connection'), 10);

    return result;
  }

  const buttons_style = {width: '100%', mt: '1px', pb: 0}
  console.log("*** RECORD-INFO RENDER ***");
  return (
    <div className={cls.main}>
      <form onSubmit={_handleSubmit} onReset={_handleReset}>
        <div className={cls.datafields}>
          <RecordInfo record={record} />
          <SealTypeInfo />
        </div>
        <div className={cls.buttons}>
          <Button sx={{...buttons_style, gridColumn: 1}} variant='contained' size='small' key='btn-reset-testinfo' type='reset' color='warning'>Сброс</Button>
          <Button sx={{...buttons_style, gridColumn: 4}} variant='contained' size='small' key='btn-save-testinfo' type='submit' color='primary'>Сохранить</Button>
        </div>
      </form>
    </div>
  );
}