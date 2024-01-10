import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export default function HomePage() {
  const [payload, setPayload] = useState(localStorage.getItem("payload"))
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("payload")) {
      navigate("/login")
    } else {
      navigate("/request")
      setPayload(JSON.parse(localStorage.getItem("payload")))
    }
  }, [])
  return (
    <>
      <div>{""}</div>
    </>
  )
}
