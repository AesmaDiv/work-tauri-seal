import { React, useRef, useEffect, useState } from 'react';
import { useRecordContext } from '../../contexts/RecordContext';
import { readTestList } from '../../database/DatabaseHelper';

import { Box, Stack } from '@mui/system';
import { Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import { TableContainer, IconButton } from '@mui/material';
import { default as Bwrd } from '@mui/icons-material/ArrowBackIos';
import { default as Fwrd } from '@mui/icons-material/ArrowForwardIos';
import SearchBar from './SearchBar';

import cls from './TestList.module.css';


const ROWS_PER_PAGE = 50;
const columns = [
  // { width: 80,  sortable: true,   name: 'id',        label: '№'},
  { width: 180, sortable: true,   name: 'datetest',  label: 'Дата испытания'},
  { width: 160, sortable: false,  name: 'ordernum',  label: 'Наряд-заказ №'},
  { width: 160, sortable: false,  name: 'serial',    label: 'Заводской №'},
];
const full_width = columns.reduce((a, v) => { return a + v.width}, 0);

export default function TestList() {
  const {flagUpdate, loadContext} = useRecordContext();
  const [list, setList] = useState([]);

  const lastId = useRef(0);
  const search = useRef('');
  const page = useRef(0);

  async function refreshList() {
    // console.log("TEST-LIST reading list from DB...");
    let condition = search.current;
    condition += lastId.current ? ` ID<=${lastId.current} ` : ` ID>0`;
    condition += ` Order By ID Desc Limit ${ROWS_PER_PAGE}`;
    // console.log("Search conditions %o", condition);
    let result = await readTestList(condition);
    lastId.current = result[0].id;
    setList(result);
  }

  useEffect(() => {refreshList();}, [flagUpdate]);

  const _handleSelect = async (row) => {
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
    // console.log("*** TEST-LIST ROW CREATE");
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
    // console.log("*** TEST-LIST HEADERS CREATE");
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
  const _createList = () => {
    // console.log("*** TEST-LIST CREATE");
    return (
      <TableBody>{list.map((row) => _createRow(row, _handleSelect))}</TableBody>
    );
  }
  const _createOptions = () => {
    return (
      <Stack direction='row' sx={{ maxWidth: {full_width}, justifyContent: 'space-between', pt: 1 }}>
        <SearchBar onSubmit={_handleSearch}/>
        <Stack direction='row'>
          <IconButton sx={{width: 20}} onClick={e => _handlePage('bkwrd')}><Bwrd/></IconButton>
          <IconButton sx={{width: 20}} onClick={e => _handlePage('frwrd')}><Fwrd/></IconButton>
        </Stack>
      </Stack>
    );
  }

  console.log("***TEST-LIST RENDER***");
  return (
    <Box className={cls.testlist_root}>
      <TableContainer className={cls.testlist_container}>
        <Table stickyHeader aria-label="sticky table" size='small'>
          {_createHeaders()}
          {_createList()}
        </Table>
      </TableContainer>
      {_createOptions()}
    </Box>
  );
}