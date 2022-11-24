import { React, useRef, useEffect, useState, useCallback } from 'react';
import { Box, Stack } from '@mui/system';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, IconButton} from '@mui/material';
import { default as Bwrd } from '@mui/icons-material/ArrowBackIos';
import { default as Fwrd } from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from './SearchBar';
import { readRecord } from '../../redux/recordReducer';
import { showMessage } from '../../redux/messageReducer';
import { helperReadRecordList } from '../../database/DatabaseHelper';

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
  const [list, setList] = useState([]);
  const last_id = useRef(0);
  const search = useRef('');
  const page = useRef(0);

  const {is_updated, record} = useSelector(state => state.recordReducer);
  const dispatch = useDispatch();

  useEffect(() => _refreshList(), [is_updated]);

  const _refreshList = useCallback(() => {
    console.warn("Refreshing test list");
    (async() => {
      let condition = search.current;
      condition += last_id.current ? ` ID<=${last_id.current} ` : ` ID>0`;
      condition += ` Order By ID Desc Limit ${ROWS_PER_PAGE}`;
      let result = await helperReadRecordList(condition);
      last_id.current = result[0].id;

      return result;
    })().then(result => setList(result));
  },[]);

  const _handleSelect = async (event, row) => {
    console.warn("Record List select", row.id);
    dispatch(showMessage({text:`Выбрана запись № ${row.id}`, severity: 'success'}));
    dispatch(readRecord(row.id));
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
    last_id.current = page.current ? last_id.current  - ROWS_PER_PAGE * page.current : 0;
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
        selected={data.id === record.id}
        onClick={e => _handleSelect(e, data)}
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

  console.log("%c *** RECORD-LIST RENDER ***", 'color: #ff4fff');
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