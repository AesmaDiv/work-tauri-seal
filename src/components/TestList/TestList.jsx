import { React, useState, useEffect } from 'react';
import { useTestContext } from '../../contexts/TestContext';
import { readTestList } from '../../database/DatabaseHelper';

import { Box } from '@mui/system';
import { Table,TableHead,TableBody,TableRow,TableCell} from '@mui/material';
import { TableContainer,TablePagination } from '@mui/material';
// import TestListRow from './TestListRow';


const columns = [
  { width: 80,  sortable: true,   name: 'id',        label: '№'},
  { width: 230, sortable: true,   name: 'datetest',  label: 'Дата испытания'},
  { width: 160, sortable: false,  name: 'ordernum',  label: 'Наряд-заказ №'},
  { width: 160, sortable: false,  name: 'serial',    label: 'Заводской №'},
];


export default function TestList() {
  const {flag, loadContext, deleteContext} = useTestContext();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);


  useEffect(() => {
    async function refresh() {
      console.log("TEST-LIST creating list...");
      let result = await readTestList(`ID > 0 Order By ID Desc Limit 1000`);
      setList(prev => [...prev, ...result]);
      //console.log("TEST-LIST creating list...done! %o", result);
    }
    refresh();
  }, [page]);

  const _handleChangePage = (event, newPage) => {
    setPage(newPage);
    // let result = await readTestList(`ID > 0 Order By ID Desc Limit 100`);
  };

  const _handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const _handleSelect = async (row) => {
    console.log("Selected row %o", row);
    await loadContext(row.id);
    // if (event.ctrlKey) {
    //   if (await window.confirm(`Do you really want to remove record № ${row.item.id}`)) {
    //     await deleteContext(row.item);
    //     setCurrent("");
    //   };
    // }
  }


  const _createRow = (data, onSelect) => {
    console.log("*** TEST-LIST ROW RENDER");
    return (
      <TableRow hover tabIndex={-1} key={data.id} onClick={e => onSelect(data)}>
        {columns
          // .filter(column => column.name !== 'id')
          .map((column) => {
            const cell_val = data[column.name]
            const cell_key = `${column.name}-${cell_val}`
            return (
              <TableCell key={cell_key}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  width: column.width, color: 'white' }}
              >
                {cell_val}
              </TableCell>
            );
        })}
      </TableRow>
    )
  }

  const _createHeaders = () => {
    return (
      <TableHead>
        <TableRow>
          {columns
            // .filter(column => column.name !== 'id')
            .map(column => 
              <TableCell key={column.name} 
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  color: 'white', backgroundColor: 'rgb(60,60,60)', width: column.width}}
              >
                {column.label}
              </TableCell>
            )}
        </TableRow>
      </TableHead>
    );
  }
  const _createList = () => {
    return (
      <TableBody>
        {
          list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => _createRow(row, _handleSelect))
        }
      </TableBody>
    );
  }
  
  console.log("***TEST-LIST RENDER***");
  return (
    <Box sx={{
      p: '10px', border: '1px solid white', display: 'flex', flexDirection: 'column'
    }}>
      <TableContainer sx={{flex: 1, color: 'white'}}>
        <Table stickyHeader aria-label="sticky table" size='small'>
          {_createHeaders()}
          {_createList()}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[50, 100]}
        component="div"
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={_handleChangePage}
        onRowsPerPageChange={_handleChangeRowsPerPage}
        sx={{ height: '35px', color: 'white' }}
      />
    </Box>
  );
}