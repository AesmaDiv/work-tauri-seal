import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";


export default function DataField(props) {
  const [_value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const _handleChange = (e) => {
    let new_value = e.target.value;
    setValue(new_value);
    if (props.onValueChange) {
      props.onValueChange(new_value);
    }
  }

  // console.log("***DATA-FIELD RENDER***");
  return (
    <TextField
    key={props.data?.name} 
    name={props.data?.name} 
    label={props.data?.label}
    value={_value ? _value : ''}
    size='small'
    margin='none'
      variant='outlined'
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
    />
  )
}