import { TableRow, TableCell } from "@mui/material";


export default function RLRow({data, selected, columns, handleSelect}) {
  return (
    <TableRow hover tabIndex={-1} key={data.id}
      selected={selected}
      onClick={e => handleSelect(e, data)}
      sx={{
        '&.MuiTableRow-root:hover': { backgroundColor: '#505050' },
        '&.MuiTableRow-root:focus': { backgroundColor: '#1976d2' },
        '&.Mui-selected': { backgroundColor: '#1464ac' },
        // '&.Mui-selected': { backgroundColor: '#ffaabb' },
      }}
      >
        {columns
          .map((column) => {
            const cell_val = data[column.name];
            const cell_key = `${column.name}-${cell_val}`;
            return (
              <TableCell key={cell_key} sx={{width: column.width, color: 'white' }}>
                {cell_val}
              </TableCell>
            );
          })}
    </TableRow>
  )
};