// import { useRecordContext } from "../contexts/RecordContext";
import { useDatabase } from "../contexts/DatabaseContext";

export default function Auxiliary() {
  // const {record} = useRecordContext();
  const record = useDatabase();

  return (
    <div  style={{ width: '100%', height: '400px', overflow: 'scroll' }}>
      {/* <pre>{JSON.stringify(record, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(_testData, null, 2)}</pre> */}
    </div>
  )
}