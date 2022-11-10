import { useRecordContext } from "../contexts/RecordContext";

export default function Auxiliary() {
  const {record} = useRecordContext();

  return (
    <div  style={{ width: '100%', height: '400px', overflow: 'scroll' }}>
      <pre>{JSON.stringify(record, null, 2)}</pre>
      {/* <pre>{JSON.stringify(_testData, null, 2)}</pre> */}
    </div>
  )
}