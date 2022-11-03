import { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";


/** Компонент универсального поля данных */
export default function DataField(props) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value])

  const _handleChange = (evt) => {
    let new_value = evt.target.value;
    setValue(new_value);
    props.onValueChange && props.onValueChange(new_value);
  }

  let items = props.selectItems?.map(item => (
    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
  ));

  // console.log("***DATA-FIELD RENDER***");
  return (
    <TextField
      key={props.data?.name} 
      name={props.data?.name} 
      label={props.data?.label}
      value={value}
      size='small'
      margin='none'
      variant='outlined'
      select={props.selectItems?.length > 0}
      type={props.type}
      multiline={props.full}
      minRows={props.full ? 2 : 1}
      maxRows={props.full ? 2 : 1}
      sx={{ 
        height: 30, 
        gridColumn: props.data?.col, gridRow: props.data?.row,
        gridColumnEnd: props.full ? 5 : props.data?.col,
        gridRowEnd: props.full ? 10 : props.data?.row
      }}
      onChange={_handleChange}
      {...props.inputProps}
    >{items}</TextField>
  )
}