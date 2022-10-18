import { React, useRef, useEffect, useState } from 'react';
import { useTestContext } from '../../contexts/TestContext';
import { readTestList } from '../../database/DatabaseHelper';

import { Box, Stack } from '@mui/system';
import { Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import { TableContainer, IconButton } from '@mui/material';
import { default as Bwrd } from '@mui/icons-material/ArrowBackIos';
import { default as Fwrd } from '@mui/icons-material/ArrowForwardIos';
import SearchBar from './SearchBar';


const ROWS_PER_PAGE = 50;
const columns = [
  { width: 80,  sortable: true,   name: 'id',        label: '№'},
  { width: 230, sortable: true,   name: 'datetest',  label: 'Дата испытания'},
  { width: 160, sortable: false,  name: 'ordernum',  label: 'Наряд-заказ №'},
  { width: 160, sortable: false,  name: 'serial',    label: 'Заводской №'},
];


export default function TestList() {
  const {flagUpdate, loadContext} = useTestContext();
  const [list, setList] = useState([]);

  const lastId = useRef(0);
  const search = useRef('');
  const page = useRef(0);

  async function refreshList() {
    console.log("TEST-LIST reading list from DB...");
    let condition = search.current;
    condition += lastId.current ? ` ID<=${lastId.current} ` : ` ID>0`;
    condition += ` Order By ID Desc Limit ${ROWS_PER_PAGE}`;
    console.log("Search conditions %o", condition);
    let result = await readTestList(condition);
    lastId.current = result[0].id;
    setList(result);
  }

  useEffect(() => {refreshList();}, [flagUpdate]);

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
  const _handlePage = (name) => {
    if (name === 'bkwrd' && page.current === 0) return;
    page.current = page.current + (name === 'bkwrd' ? -1 : 1); 
    lastId.current = page.current ? lastId.current  - ROWS_PER_PAGE * page.current : 0;
    refreshList();
  }
  const _handleSearch = (params) => {
    const {key, val} = params;
    search.current = [key, val].every(i => i) ?
      ` ${key} Like '%${val}%' And` :
      '';
    refreshList();
  }

  const _createRow = (data, onSelect) => {
    console.log("*** TEST-LIST ROW CREATE");
    return (
      <TableRow hover tabIndex={-1} key={data.id} onClick={e => onSelect(data)}
        sx={{
          '&.MuiTableRow-root:hover': { backgroundColor: '#505050' },
          '&.MuiTableRow-root:focus': { backgroundColor: '#1976d2' },
        }}
      >
        {columns
          // .filter(column => column.name !== 'id')
          .map((column) => {
            const cell_val = data[column.name]
            const cell_key = `${column.name}-${cell_val}`
            return (
              <TableCell key={cell_key} sx={{width: column.width, color: 'white' }}>
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
      <TableBody>{list.map((row) => _createRow(row, _handleSelect))}</TableBody>
    );
  }
  const _createOptions = () => {
    return (
      <Stack direction='row' sx={{ justifyContent: 'space-between', pt: 1 }}>
        <SearchBar onSubmit={_handleSearch}/>
        <Stack direction='row'>
          <IconButton onClick={e => _handlePage('bkwrd')}><Bwrd/></IconButton>
          <IconButton onClick={e => _handlePage('frwrd')}><Fwrd/></IconButton>
        </Stack>
      </Stack>
    );
  }

  console.log("***TEST-LIST RENDER***");
  return (
    <Box sx={{
      p: '10px', border: '1px solid white', display: 'flex', flexDirection: 'column',
     
    }}>
      <TableContainer sx={{flex: 1, color: 'white', background: 'linear-gradient(#e66465, #9198e5)'}}>
        <Table stickyHeader aria-label="sticky table" size='small'>
          {_createHeaders()}
          {_createList()}
        </Table>
      </TableContainer>
      {_createOptions()}
    </Box>
  );
}