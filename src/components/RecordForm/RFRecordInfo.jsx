import DataField from '../DataField/DataField';
import { RECORD_COLUMNS } from '../../database/db_tables';


export default function RecordInfo({record}) {
  return (
    RECORD_COLUMNS
      .filter(item => item.col > 0)
      .map(item => 
        <DataField
          required={item.required}
          key={item.name}
          data={item}
          value={record[item.name]}
          full={item.name === 'comments'}
          selectItems={item.items}
          inputProps={{
            InputProps: { style: { color: '#ffc653'}, },
            InputLabelProps: { style: { color: 'white' }, },
          }}
        />
      )
  )
}