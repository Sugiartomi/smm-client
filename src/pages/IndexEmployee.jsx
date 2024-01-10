import { useEffect, useState } from "react"
import RequestWeb from "./RequestWeb"
import RequestMobile from "./RequestMobile"
import GoodsWeb from "./GoodsWeb"
import GoodsMobile from "./GoodsMobile"
import EmployeeWeb from "./EmployeeWeb"
import EmployeeMobile from "./EmployeeMobile"
import { useNavigate } from "react-router"

export default function IndexEmployee() {
  const [payload, setPayload] = useState(localStorage.getItem('payload'))
  
  
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ])
  const navigate = useNavigate()
  useEffect(() => {
    if( !(localStorage.getItem("payload"))) {
      navigate("/login")
    } else {
      setPayload(JSON.parse(localStorage.getItem('payload')))
    }
  }, [])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  return (<>
  <div>
    { payload ? windowSize[0] > 1000 ? <EmployeeWeb /> : <EmployeeMobile /> : ""}
  </div>
  </>)
}
