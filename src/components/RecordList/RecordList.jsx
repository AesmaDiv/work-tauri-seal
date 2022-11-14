import { React, useRef, useEffect, useState, startTransition, useTransition } from 'react';
import { Box, Stack } from '@mui/system';
import { Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import { TableContainer, IconButton } from '@mui/material';
import { default as Bwrd } from '@mui/icons-material/ArrowBackIos';
import { default as Fwrd } from '@mui/icons-material/ArrowForwardIos';

import SearchBar from './SearchBar';
import { useRecordContext } from '../../contexts/RecordContext';
import { readRecordList } from '../../database/DatabaseHelper';

import cls from './RecordList.module.css';


const ROWS_PER_PAGE = 50;
const columns = [
  // { width: 80,  sortable: true,   name: 'id',        label: '№'},
  { width: 180, sortable: true,   name: 'datetest',  label: 'Дата испытания'},
  { width: 160, sortable: false,  name: 'ordernum',  label: 'Наряд-заказ №'},
  { width: 160, sortable: false,  name: 'serial',    label: 'Заводской №'},
];
const full_width = columns.reduce((a, v) => { return a + v.width}, 0);

export default function RecordList() {
  // const manageRecord = updateDatabase();
  const {read} = useRecordContext();
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState('');
  const [is_reading, startReading] = useTransition();

  const lastId = useRef(0);
  const search = useRef('');
  const page = useRef(0);

  function _refreshList() {
    (async() => {
      let condition = search.current;
      condition += lastId.current ? ` ID<=${lastId.current} ` : ` ID>0`;
      condition += ` Order By ID Desc Limit ${ROWS_PER_PAGE}`;
      let result = await readRecordList(condition);
      lastId.current = result[0].id;

      return result;
    })().then(result => startTransition(() => setList(result)));
  }

  useEffect(() => _refreshList(), []);

  const _handleSelect = async (event, row) => {
    read(row.id);
    setSelected(row.id)
    console.warn("RecordList record changed");
    if (event.ctrlKey) {
      if (await window.confirm(`Do you really want to remove record № ${row.id}`)) {
        // await deleteContext(row.item);
        // setCurrent("");
      };
    }
  }
  const _handlePage = (name) => {
    if (name === 'bkwrd' && page.current === 0) return;
    page.current = page.current + (name === 'bkwrd' ? -1 : 1); 
    lastId.current = page.current ? lastId.current  - ROWS_PER_PAGE * page.current : 0;
    _refreshList();
  }
  const _handleSearch = (params) => {
    const {key, val} = params;
    search.current = [key, val].every(i => i) ?
      ` ${key} Like '%${val}%' And` :
      '';
    _refreshList();
  }

  const _createRow = (data) => {
    return (
      <TableRow hover tabIndex={-1} key={data.id}
        selected={data.id === selected}
        onClick={e => _handleSelect(e, data)}
        sx={{
          '&.MuiTableRow-root:hover': { backgroundColor: '#505050' },
          '&.MuiTableRow-root:focus': { backgroundColor: '#1976d2' },
          '&.Mui-selected': { backgroundColor: '#1464ac' },
        }}
      >
        {columns
          .map((column) => {
            const cell_val = is_reading ? 'loading' : data[column.name];
            const cell_key = `${column.name}-${cell_val}`;
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
      <TableBody>{list.map((row) => _createRow(row))}</TableBody>
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