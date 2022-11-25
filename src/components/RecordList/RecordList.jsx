import { React, useRef, useEffect, useState, useCallback } from 'react';
import { Box } from '@mui/system';
import { Table, TableBody, TableContainer} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { readRecord } from '../../redux/recordReducer';
import { showMessage } from '../../redux/messageReducer';
import { helperReadRecordList } from '../../database/DatabaseHelper';

import cls from './RecordList.module.css';
import RLHeaders from './RLHeaders';
import RLOptions from './RLOptions';
import RLRow from './RLRow';


const ROWS_PER_PAGE = 50;
const COLUMNS = [
  // { width: 80,  sortable: true,   name: 'id',        label: '№'},
  { width: 180, sortable: true,   name: 'datetest',  label: 'Дата испытания'},
  { width: 160, sortable: false,  name: 'ordernum',  label: 'Наряд-заказ №'},
  { width: 160, sortable: false,  name: 'serial',    label: 'Заводской №'},
];
const full_width = COLUMNS.reduce((a, v) => { return a + v.width}, 0);


export default function RecordList() {
  const [list, setList] = useState([]);
  const last_id = useRef(0);
  const search = useRef('');
  const page = useRef(0);

  const {is_updated, record} = useSelector(state => state.recordReducer);
  const dispatch = useDispatch();

  const _refreshList = useCallback(() => {
    console.warn("Refreshing test list");
    (async() => {
      let condition = search.current;
      condition += last_id.current && record.id ? ` ID<=${last_id.current} ` : ` ID>0`;
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

  useEffect(() => _refreshList(), [is_updated, _refreshList]);

  console.log("%c *** RECORD-LIST RENDER ***", 'color: #ff4fff');
  return (
    <Box className={cls.testlist_root}>
      <TableContainer className={cls.testlist_container}>
        <Table stickyHeader aria-label="sticky table" size='small'>
          <RLHeaders columns={COLUMNS}/> 
          <TableBody>
            {list.map((row) => 
              <RLRow
                key={row.id}
                data={row}
                columns={COLUMNS}
                selected={row.id === record.id} 
                handleSelect={_handleSelect}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <RLOptions handleSearch={_handleSearch} handlePage={_handlePage} fullWidth={full_width}/>
    </Box>
  );
}