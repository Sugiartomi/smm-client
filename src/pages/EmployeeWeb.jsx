import {
  CgChevronDoubleLeft,
  CgChevronDoubleRight,
  CgAdd,
  CgChevronRight,
  CgChart,
  CgDollar,
  CgFramer,
  CgProfile,
  CgUser,
  CgMail,
  CgLogOut,
  CgLock,
  CgErase,
  CgEreader,
} from "react-icons/cg"
import NavbarComponent from "../component/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { BaseHttp } from ".."
import Swal from "sweetalert2"
import { useNavigate } from "react-router"
import { data, error } from "jquery"

export default function EmployeeWeb() {
  let loginUSer = JSON.parse(localStorage.getItem("payload")).role
  let payload = JSON.parse(localStorage.getItem("payload"))

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("payload")
    navigate("/login")
    window.location.reload()
  }

  const [viewSideBar, setViewSideBar] = useState(false)
  const [employee, setEmployee] = useState([])

  useEffect(() => {
    axios
      .get(BaseHttp + "/employees")
      .then((data) => setEmployee(data.data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    let view = localStorage.getItem("view-sidebar")
    if (view === "open") {
      setViewSideBar(true)
    } else {
      setViewSideBar(false)
    }
  }, [])


  return (
    <>
      <div className="" style={{ height: "100vh" }}>
        <NavbarComponent />
        {!viewSideBar ? (
          <>
            <div
              className="position-fixed bottom-0 start-0 border border-3 text-dark rounded-circle m-4 d-flex align-items-center justify-content-center"
              style={{ width: 40, height: 40 }}
              onClick={() => {
                localStorage.setItem("view-sidebar", "open")
                setViewSideBar(true)
              }}
            >
              <CgChevronDoubleRight size={25} />
            </div>
          </>
        ) : (
          ""
        )}

        <div className="container-fluid px-0 mx-0">
          <div className="d-flex h-100">
            {viewSideBar ? (
              <div
                className="cp-bg-5 text-white"
                style={{ width: 225, minHeight: "100vh" }}
              >
                <div
                  className="position-fixed bottom-0 start-0 border border-3 text-white rounded-circle m-4 d-flex align-items-center justify-content-center"
                  style={{ width: 40, height: 40 }}
                  onClick={() => {
                    localStorage.setItem("view-sidebar", "close")
                    setViewSideBar(false)
                  }}
                >
                  <CgChevronDoubleLeft size={25} />
                </div>

                <div className="mt-2" style={{ width: 225, paddingTop: 50 }}>
                  <div
                    className="d-flex p-3 align-items-center justify-content-between w-100"
                    onClick={() => navigate("/request")}
                  >
                    <div className="fs-14">
                      <CgAdd size={20} className="me-2" /> Request
                    </div>
                    <CgChevronRight />
                  </div>
                  <div
                    className="d-flex p-3 align-items-center justify-content-between w-100"
                    onClick={() => navigate("/goods")}
                  >
                    <div className="fs-14">
                      <CgFramer size={20} className="me-2" /> Barang
                    </div>
                    <CgChevronRight />
                  </div>
                  <div
                    className="d-flex p-3 align-items-center justify-content-between w-100"
                    onClick={() => navigate("/employee")}
                  >
                    <div className="fs-14">
                      <CgUser size={20} className="me-2" /> Employees
                    </div>
                    <CgChevronRight />
                  </div>
                  <hr />
                  <div className="d-flex p-3 align-items-center justify-content-between w-100">
                    <div className="fs-14">
                      <CgChart size={20} className="me-2" /> Dashboard
                    </div>
                    <CgChevronRight />
                  </div>
                  <div className="d-flex p-3 align-items-center justify-content-between w-100">
                    <div className="fs-14">
                      <CgMail size={20} className="me-2" /> Mail
                    </div>
                    <CgChevronRight />
                  </div>
                  <div className="d-flex p-3 align-items-center justify-content-between w-100">
                    <div className="fs-14">
                      <CgDollar size={20} className="me-2" /> Finance
                    </div>
                    <CgChevronRight />
                  </div>

                  <div className="d-flex p-3 align-items-center justify-content-between w-100">
                    <div className="fs-14">
                      <CgLock size={20} className="me-2" /> Setting
                    </div>
                    <CgChevronRight />
                  </div>
                  <div className="d-flex p-3 align-items-center justify-content-between w-100">
                    <div className="fs-14" onClick={() => handleLogout()}>
                      <CgLogOut size={20} className="me-2" /> Log Out
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div
              className="w-100 border mt-2 px-3"
              style={{
                paddingTop: 50,
                backgroundColor: "#F0F0F0",
                minHeight: "100vh",
              }}
            >
              <div className="p-4">
                <div className=" border bg-white" style={{ borderRadius: 15 }}>
                  <div
                    className="cp-bg-1 text-white fs-20 fw-bold p-4"
                    style={{ borderRadius: "15px 15px 0 0" }}
                  >
                    Daftar Pegawai
                  </div>
                  <div class="row p-4">
                    {employee.length !== 0
                      ? employee.map((e) => (
                          <div class="col-sm-3 mb-3">
                            <div class="card h-100">
                              <div
                                class="card-body d-flex justify-content-between"
                                style={{ flexDirection: "column" }}
                              >
                                <div>
                                  <div className=" rounded cp-bg-yellow text-white p-5 text-center"> 
                                  <CgEreader/>
                                  <div className="mt-2">No Image</div>
                                  </div>
                                  <h5 class="card-title mt-3">{e.nama}</h5>
                          
                                </div>
                                <div className="mt-4">
                                  <div> NIK : <strong>{e.NIK}</strong></div>
                                  <hr />
                                  <div> Department : </div>
                                  <div><strong>{e.departemen}</strong></div>
                             
                             
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
