import { React, useState, useEffect, useRef } from 'react';
import { useTestContext } from '../../contexts/TestContext';
import { readTestList } from '../../database/DatabaseHelper';

import { Box } from '@mui/system';
import { Table,TableHead,TableBody,TableRow,TableCell} from '@mui/material';
import { TableContainer,TablePagination } from '@mui/material';


const columns = [
  { width: 80,  sortable: true,   name: 'id',        label: '№'},
  { width: 230, sortable: true,   name: 'datetest',  label: 'Дата испытания'},
  { width: 160, sortable: false,  name: 'ordernum',  label: 'Наряд-заказ №'},
  { width: 160, sortable: false,  name: 'serial',    label: 'Заводской №'},
];

const ROWS_PER_PAGE = 50;


export default function TestList() {
  const {flag,loadContext} = useTestContext();
  const [list, setList] = useState([]);
  // const [page, setPage] = useState(0);

  const lastId = useRef(0);
  const page = useRef(0);

  async function refresh(last_id) {
      console.log("TEST-LIST creating list...");
      const condidion = last_id ? `ID <= ${last_id} ` : `ID > 0`;
      let result = await readTestList(`${condidion} Order By ID Desc Limit 51`);
      lastId.current = result[0].id;
      console.log("-------- Last id is %o", lastId);
      setList(result);
      //console.log("TEST-LIST creating list...done! %o", result);
    }

  useEffect(() => {
    refresh(0);
  }, [flag]);

  const _handleChangePage = (event, newPage) => {
    lastId.current = newPage > page ? lastId.current  + 50 : lastId.current - 50;
    refresh(lastId.current)
    // setPage(newPage);
    // let result = await readTestList(`ID > 0 Order By ID Desc Limit 100`);
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
    console.log("*** TEST-LIST ROW CREATE");
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
    console.log("*** TEST-LIST HEADERS CREATE");
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
    console.log("*** TEST-LIST CREATE");
    return (
      <TableBody>
        {
          list.slice(page.current * ROWS_PER_PAGE, page.current * ROWS_PER_PAGE + ROWS_PER_PAGE)
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
      {/* <TablePagination
        component="div"
        count={list.length}
        page={page.current}
        rowsPerPage={ROWS_PER_PAGE}
        rowsPerPageOptions={[ROWS_PER_PAGE]}
        onPageChange={_handleChangePage}
        sx={{ height: '35px', color: 'white' }}
      /> */}
    </Box>
  );
}