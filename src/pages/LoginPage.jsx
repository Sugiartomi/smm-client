import axios from "axios"
import { useState } from "react"
import { json, useNavigate } from "react-router"
import Swal from "sweetalert2"

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
        .post("http://localhost:8080/login", {
          nama: input.username,
          password: input.password,
        })
        .then((data) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            text: "Login Success",
            showConfirmButton: false,
            timer: 800,
          })

          localStorage.setItem(
            "payload",
            JSON.stringify({
              role: data.data.nama,
              department: data.data.departemen,
              NIK: data.data.NIK,
            })
          )
          navigate("/dashboard")
        })
        .catch((err) => {
          if (err.response.data.message) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              text: err.response.data.message,
              showConfirmButton: false,
              timer: 800,
            })
          }
        })
    }
  }

  return (
    <>
      <div className="container">
        <div className="w-50">
          <form action="" onSubmit={handleLogin}>
            <div className="text-primary fw-bold">Username</div>
            <input
              type="text"
              className="form-control shadow-none"
              name="username"
              onChange={handleInput}
            />
            <div className="text-primary fw-bold">Password</div>
            <input
              type="password"
              className="form-control shadow-none"
              name="password"
              onChange={handleInput}
            />
            <button type="submit" className="btn btn-primary w-100 mt-4">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
