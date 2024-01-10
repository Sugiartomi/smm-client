import axios from "axios"
import { useState } from "react"
import { json, useNavigate } from "react-router"
import Swal from "sweetalert2"
import { BaseHttp } from ".."
import logo from "../assets/logo-smm.jpg"
import { CgLock, CgProfile } from "react-icons/cg"

export default function LoginPage() {
  const navigate = useNavigate()
  const [input, setInput] = useState({ username: "", password: "" })
  const handleInput = (e) => {
    let paramInput = e.target.name
    let valueInput = e.target.value
    if (paramInput === "username") {
      setInput({ ...input, username: valueInput })
    } else if (paramInput === "password") {
      setInput({ ...input, password: valueInput })
    }
  }

  const handleLogin = (event) => {
    event.preventDefault()

    let errorInput
    if (!input.username) {
      errorInput = "Username is required!"
    } else if (!input.password) {
      errorInput = "Password is required!"
    }

    if (errorInput) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        text: errorInput,
        showConfirmButton: false,
        timer: 1500,
      })
    } else {
      axios
        .post(BaseHttp + "/login", {
          nama: input.username,
          password: input.password,
        })
        .then((data) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            text: "Login Success",
            showConfirmButton: false,
            timer: 1500,
          })

          localStorage.setItem(
            "payload",
            JSON.stringify({
              id: data.data.id,
              role: data.data.nama,
              department: data.data.departemen,
              NIK: data.data.NIK,
            })
          )
          navigate("/request")
        })
        .catch((err) => {
          if (err.response.data.message) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              text: err.response.data.message,
              showConfirmButton: false,
              timer: 1500,
            })
          }
        })
    }
  }

  return (
    <>
      <div className="container-fluid cp-bg-4" style={{ minHeight: "100vh" }}>
        <div
          className="d-flex align-items-center w-100  justify-content-center"
          style={{ height: "100vh" }}
        >
          <div
            className=" cp-bg-5"
            style={{
              padding: "100px 40px",
              maxWidth: "10cm",
              borderRadius: "25px",
            }}
          >
            <img src={logo} className="img-fluid" alt="" />
            <form action="" className="mt-4" onSubmit={handleLogin}>
              <div className="text-white fw-bold mb-2">Username</div>
              <div className="d-flex border bg-white" style={ { borderRadius : 30}}>
                <div>
                  <div
                    className="rounded-circle cp-bg-1 d-flex align-items-center justify-content-center"
                    style={{ width: 40, height: 40 }}
                  > <CgProfile size={24}/> </div>
                </div>
                <input
                  type="text"
                  className="form-control shadow-none border-0"
                  name="username"
                  onChange={handleInput}
                  style={ { borderRadius : 30}}
                />
              </div>
              <div className="text-white fw-bold mb-2">Username</div>
              <div className="d-flex border bg-white" style={ { borderRadius : 30}}>
                <div>
                  <div
                    className="rounded-circle cp-bg-1 d-flex align-items-center justify-content-center"
                    style={{ width: 40, height: 40 }}
                  > <CgLock size={24}/> </div>
                </div>
                <input
                  type="password"
                  className="form-control shadow-none border-0"
                  name="password"
                  onChange={handleInput}
                  style={ { borderRadius : 30}}
                />
              </div>
        
              <button type="submit" className="cp-bg-1 w-100 mt-4 border-0 text-white fw-bold" style={{ height : 50, borderRadius : 30}}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
