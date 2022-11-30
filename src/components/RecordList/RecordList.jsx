import { React, useRef, useEffect, useState, useCallback } from 'react';
import { Box } from '@mui/system';
import { Table, TableBody, TableContainer} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useMessageContext } from '../../contexts/MessageContext';
import { readRecord, deleteRecord } from '../../redux/recordReducer';
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
  const {id} = useSelector(state => state.recordReducer.record);
  const refs = useRef({
    page: 0,
    last_id: 0,
    search: ''
  });

  // const {showMessage} = useMessageContext();
  const {is_updated} = useSelector(state => state.recordReducer);
  const dispatch = useDispatch();

  const _refreshList = useCallback(() => {
    console.warn("RecordList >> Refreshing test list...");
    (async() => {
      let condition = refs.current.search;
      condition += refs.current.last_id && id ? ` ID<=${refs.current.last_id} ` : ` ID > 0`;
      condition += ` Order By ID Desc Limit ${ROWS_PER_PAGE}`;
      let result = await helperReadRecordList(condition);
      refs.current.last_id = result[0].id;
 
      return result;
    })().then(result => setList(result));
  },[]);

  const _handleSelect = async (event, row) => {
    if (event.ctrlKey) {
      if (await window.confirm(`Do you really want to remove record № ${row.id}`)) {
        dispatch(deleteRecord(row));
        _refreshList();
        return
      };
    }
    if (row.id === id) return;
    dispatch(readRecord(row.id));
    // showMessage({text:`Выбрана запись № ${row.id}`, severity: 'success'});
    console.warn("RecordList >> Selecting record", row.id);
  }
  const _handlePage = (name) => {
    if (name === 'bkwrd' && refs.current.page === 0) return;
    refs.current.page = refs.current.page + (name === 'bkwrd' ? -1 : 1); 
    refs.current.last_id = refs.current.page ? refs.current.last_id  - ROWS_PER_PAGE * refs.current.page : 0;
    _refreshList();
  }
  const _handleSearch = (params) => {
    const {key, val} = params;
    refs.current.search = [key, val].every(i => i) ?
    ` ${key} Like '%${val}%' And` :
    '';
    _refreshList();
  }

  useEffect(() => _refreshList(), [is_updated]);

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
                selected={row.id === id} 
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
