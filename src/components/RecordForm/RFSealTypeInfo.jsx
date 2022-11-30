import { useSelector, useDispatch } from 'react-redux';

import DataField from '../DataField/DataField';
import { setCurrentType} from '../../redux/recordReducer';
import { SEALTYPE_COLUMNS } from "../../database/db_tables"


export default function SealTypeInfo(){
  const {sealtypes, current_type} = useSelector((state) => state.recordReducer);
  const dispatch = useDispatch();

  return (
    SEALTYPE_COLUMNS.map(item =>
      <DataField
        required={item.required}
        key={item.name}
        data={item}
        value={current_type[item.name]}
        selectItems={item.name === 'id' ? sealtypes : []}
        onValueChange={value => dispatch(setCurrentType(value))}
        inputProps={{
          InputProps: { style: { color: '#ffc653'}, readOnly: item.name !== 'id' },
          InputLabelProps: { style: { color: 'white' } }
        }}
      />
    )
  )
}