import { TableCell, TableRow, TableHead } from "@mui/material";


export default function RLHeaders({columns}) {
  return (
    <TableHead>
      <TableRow>
        {columns
          // .filter(column => column.name !== 'id')
          .map(column => 
            <TableCell key={column.name} 
            sx={{
              color: 'white', backgroundColor: 'rgb(60,60,60)',
              width: column.width}}
              >
              {column.label}
            </TableCell>
          )}
      </TableRow>
    </TableHead>
  );
}