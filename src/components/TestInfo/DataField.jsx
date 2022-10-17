import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";


export default function DataField({data, value, type, full}) {
  const [state, setState] = useState('');

  useEffect(() => {
    setState(value);
  }, [value]);

  console.log("***DATA-FIELD RENDER***");
  return (
    <TextField
      key={data.name} 
      name={data.name} 
      label={data.label}
      value={state ? state : ''}
      size='small'
      margin='none'
      variant='outlined'
      type={type}
      multiline={full}
      minRows={full ? 2 : 1}
      maxRows={full ? 2 : 1}
      sx={{ 
        height: 30, borderColor: 'red', 
        gridColumn: data.col, gridRow: data.row,
        gridColumnEnd: full ? 5 : data.col,
        gridRowEnd: full ? 10 : data.row
      }}
      onChange={ e => setState(e.target.value) }
      InputProps={{ style: { color: 'white' } }}
      InputLabelProps={{ style: { color: 'white' }/*, shrink: true*/}}
    />
  )
}