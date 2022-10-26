import { useRecordContext } from "./contexts/RecordContext"

export default function Auxiliary() {
  const {context} = useRecordContext();


  return (
    <div  style={{ width: '100%', height: '400px', overflow: 'scroll' }}>
      <pre>{JSON.stringify(context, null, 2)}</pre>
      {/* <pre>{JSON.stringify(_testData, null, 2)}</pre> */}
    </div>
  )
}