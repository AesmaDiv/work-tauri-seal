import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import DataField from '../DataField/DataField';
import { RECORD_COLUMNS, SEALTYPE_COLUMNS } from '../../database/db_tables';
import { writeRecord } from '../../redux/recordReducer';

import cls from './RecordInfo.module.css';
// import { getCurrentDate } from '../../aux/aux';

const INITIAL_SEALTYPE = {id: '', pwrlimit: '', tmplimit: '', thrlimit: ''};


export default function RecordInfo() {
  const dispatch = useDispatch();
  const record = useSelector((state) => state.recordReducer.record);

  const _handleSubmit = (event) => {
    event.preventDefault();
    let form_data = _getFormData(event.target);
    form_data['id'] = record.id;
    dispatch(writeRecord(form_data));
  }

  const _getFormData = (form) => {
    let data = new FormData(form);
    let result = RECORD_COLUMNS.reduce((obj, item) => {
      obj[item.name] = data.get(item.name);
      return obj;
    }, {} );
  
    return result;
  }
  const _createForm = () => {
    let result = RECORD_COLUMNS
    .filter(item => item.col > 0)
    .map(item => 
      <DataField
        key={item.name}
        data={item}
        value={record[item.name]}
        full={item.name === 'comments'}
        inputProps={{
          InputProps: { style: { color: '#ffc653'} },
          InputLabelProps: { style: { color: 'white' } }
        }}
      />
    );
    // let sealtype = sealtypes.find(item => item.id === record['sealtype']) || INITIAL_SEALTYPE;
    // result.push(
    //   SEALTYPE_COLUMNS.map(item =>
    //     <DataField
    //       key={item.name}
    //       data={item}
    //       value={sealtype[item.name]}
    //       selectItems={item.name === 'id' ? sealtypes : []}
    //       inputProps={{
    //         InputProps: { style: { color: '#ffc653'} },
    //         InputLabelProps: { style: { color: 'white' } }
    //       }}
    //     />
    //   )
    // )
    result.push(
      <Button key='btn-save-testinfo' type='submit' variant='contained' size='small'
        sx={{ gridColumn: 4, gridRow: 8, gridRowEnd: 10, mt: "1px", mb: "41px", pb: 0}}
      >Сохранить</Button>)
  
    return result;
  }

  console.log("*** RECORD-INFO RENDER ***");
  return (
    <div className={cls.main}>
      <form className={cls.datafields} onSubmit={_handleSubmit}>
        {_createForm()}
      </form>
    </div>
  );
}
