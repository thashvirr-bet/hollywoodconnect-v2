import CheckCoverage from '@/components/CheckCoverage'
import { useAppSelector } from '@/redux/store'
import {clearProvider, setProvider} from "@/redux/features/providerSlice"
import {useDispatch, useSelector} from "react-redux"

export default function Home() {
  const providerName = useAppSelector((state) => state.providerReducer.value.providerName)
  const dispatch = useDispatch()
  const removeProvider = () => {
    dispatch(clearProvider())
  } 
  return (
    <main>
      <div><h1>Heading 1</h1></div>
      <div><h2>Heading 2</h2></div>
      <div><h3>Heading 3</h3></div>
      <div><h4>Heading 4</h4></div>
      <div><h5>Heading 5</h5></div>
      <div><h6>Heading 6</h6>  </div>
      <div><p>{providerName}</p></div>
      <button onClick={removeProvider}>Click Me</button>

      <CheckCoverage />
    </main>
  )
}
