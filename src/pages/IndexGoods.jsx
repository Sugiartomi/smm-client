import { useEffect, useState } from "react"
import RequestWeb from "./RequestWeb"
import RequestMobile from "./RequestMobile"
import GoodsWeb from "./GoodsWeb"
import GoodsMobile from "./GoodsMobile"

export default function IndexGoods() {
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

  return <>{windowSize[0] > 1000 ? <GoodsWeb /> : <GoodsMobile />}</>
}
