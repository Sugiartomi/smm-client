import { useEffect, useState } from "react"
import RequestWeb from "./RequestWeb"
import RequestMobile from "./RequestMobile"
import GoodsWeb from "./GoodsWeb"
import GoodsMobile from "./GoodsMobile"
import EmployeeWeb from "./EmployeeWeb"
import EmployeeMobile from "./EmployeeMobile"

export default function IndexEmployee() {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  return <>{windowSize[0] > 1000 ? <EmployeeWeb /> : <EmployeeMobile />}</>
}
