import { Button } from '@mui/material';
import { RECORD_COLUMNS } from '../../database/db_tables';
import { useTestContext } from '../../contexts/TestContext';
import DataField from './DataField';
import cls from './TestInfo.module.css';
import { useEffect, useRef } from 'react';
// import { getCurrentDate } from '../../aux/aux';


export default function TestInfo() {
  const {context, updateContext} = useTestContext();

  const onSubmit = (event) => {
    event.preventDefault();
    let form_data = _getFormData(event.target);
    form_data['id'] = context.id;
    updateContext(form_data);
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
        value={context[item.name]}
        full={item.name === 'comments'}
      />
    );
    result.push(
      <Button key='btn-save-testinfo' type='submit' variant='contained' size='small'
        sx={{ gridColumn: 4, gridRow: 8, gridRowEnd: 10, mt: "1px", mb: "41px", pb: 0}}
      >Сохранить</Button>)
    return result;
  }

  console.log("***TEST-INFO RENDER***");
  return (
    <div className={cls.main}>
      <form className={cls.datafields} onSubmit={onSubmit}>
        {_createForm()}
      </form>
      {/* <pre>{JSON.stringify(context, null, 2)}</pre> */}
    </div>
  );
}