import { Button } from '@mui/material';
import DataField from '../DataField/DataField';

// import { useRecordContext } from '../../contexts/RecordContext';
import { useDatabase, updateDatabase } from '../../contexts/DatabaseContext';
import { SealTypeProvider, useSealType } from '../../contexts/SealTypesContext';

import { RECORD_COLUMNS, SEALTYPE_COLUMNS } from '../../database/db_tables';
import cls from './RecordInfo.module.css';
// import { getCurrentDate } from '../../aux/aux';


const INITIAL_SEALTYPE = {id: '', pwrlimit: '', tmplimit: '', thrlimit: ''};


export default function RecordInfo() {

  console.log("***TEST-INFO RENDER***");
  return (
    <SealTypeProvider>
      <RecordForm />
    </SealTypeProvider>
  )
}

function RecordForm() {
  // const {record, update} = useRecordContext();
  const record = useDatabase();
  const manageRecord = updateDatabase()
  
  const sealtypes = useSealType();
  
  const onSubmit = (event) => {
    event.preventDefault();
    let form_data = _getFormData(event.target);
    form_data['id'] = record.id;
    // update(form_data);
    manageRecord('update', form_data);
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
    let sealtype = sealtypes.find(item => item.id === record['sealtype']) || INITIAL_SEALTYPE;
    result.push(
      SEALTYPE_COLUMNS.map(item =>
        <DataField
          key={item.name}
          data={item}
          value={sealtype[item.name]}
          selectItems={item.name === 'id' ? sealtypes : []}
          inputProps={{
            InputProps: { style: { color: '#ffc653'} },
            InputLabelProps: { style: { color: 'white' } }
          }}
        />
      )
    )
    result.push(
      <Button key='btn-save-testinfo' type='submit' variant='contained' size='small'
        sx={{ gridColumn: 4, gridRow: 8, gridRowEnd: 10, mt: "1px", mb: "41px", pb: 0}}
      >Сохранить</Button>)
  
    return result;
  }

  return (
    <div className={cls.main}>
      <form className={cls.datafields} onSubmit={onSubmit}>
        {_createForm()}
      </form>
    </div>
  );
}
