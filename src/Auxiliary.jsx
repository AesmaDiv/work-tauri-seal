import { useTestContext } from "./contexts/TestContext"

export default function Auxiliary() {
  const {context} = useTestContext();


  return (
    <div  style={{ width: '100%', height: '400px', overflow: 'scroll' }}>
      <pre>{JSON.stringify(context, null, 2)}</pre>
      {/* <pre>{JSON.stringify(_testData, null, 2)}</pre> */}
    </div>
  )
}