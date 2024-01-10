import {
  CgCheckO,
  CgChevronDoubleLeft,
  CgChevronDoubleRight,
  CgTrash,
  CgCloseO,
  CgMathPlus,
  CgGoogleTasks,
  CgAdd,
  CgChevronRight,
  CgChart,
  CgDollar,
  CgFramer,
  CgProfile,
  CgLock,
  CgUser,
  CgMail,
  CgLogOut,
  CgEreader,
} from "react-icons/cg"
import NavbarComponent from "../component/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { BaseHttp } from ".."
import Swal from "sweetalert2"
import { useNavigate } from "react-router"
import NavbarBottom from "../component/NavbarBottom"

export default function EmployeeMobile() {
  let loginUSer = JSON.parse(localStorage.getItem("payload")).role
  let payload = JSON.parse(localStorage.getItem("payload"))
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("payload")
    navigate("/login")
    window.location.reload()
    setViewSideBar(false)
  }
  const [viewSideBar, setViewSideBar] = useState(false)

  const [employee, setEmployee] = useState([])



  useEffect(() => {
    axios
      .get(BaseHttp + "/employees")
      .then((data) => setEmployee(data.data))
      .catch((err) => console.log(err))
  }, [])





  return (
    <>
      <div className="fs-12 " style={{ height: "90vh" }}>
        {!viewSideBar ? (
          <>
            <div
              className="position-fixed bottom-0 start-0 border border-3 text-dark bg-white rounded-circle ms-2 d-flex align-items-center justify-content-center"
              style={{ width: 40, height: 40, marginBottom: 55, zIndex: 4 }}
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
                style={{ width: "100vw", minHeight: "100vh" }}
              >
                <div
                  className="position-fixed bottom-0 start-50 border border-3 text-white   rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 40, height: 40, marginBottom: 55, zIndex: 4 }}
                  onClick={() => {
             
                    setViewSideBar(false)
                  }}
                >
                  <CgChevronDoubleLeft size={25} />
                </div>

                <div
                  className="mt-2"
                  style={{ width: "100vw", paddingTop: "20px" }}
                >
                  <div
                    className="d-flex p-3 align-items-center justify-content-between w-100"
                    onClick={() =>{
                      setViewSideBar(false)
                      navigate("/request")}}
                  >
                    <div className="fs-14">
                      <CgAdd size={20} className="me-2" /> Request
                    </div>
                    <CgChevronRight />
                  </div>
                  <div
                    className="d-flex p-3 align-items-center justify-content-between w-100"
                    onClick={() => {
                      setViewSideBar(false)
                      navigate("/goods")}}
                  >
                    <div className="fs-14">
                      <CgFramer size={20} className="me-2" /> Barang
                    </div>
                    <CgChevronRight />
                  </div>
                  <div
                    className="d-flex p-3 align-items-center justify-content-between w-100"
                    onClick={() => {
                      setViewSideBar(false)
                      navigate("/employee")}}
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

            {!viewSideBar ? (
              <div
                className="w-100 border"
                style={{
                  paddingTop: "",
                  backgroundColor: "#F0F0F0",
                  minHeight: "100vh",
                }}
              >
                <div className="">
                  <div className="" style={{ borderRadius: 15 }}>
                    <div
                      className="cp-bg-5 text-white fs-30 fw-bold p-3"
                      style={{ borderRadius: "0 0 25px 25px" }}
                    >
                      <div className="ps-4">
                        Employee - SMM 
                      </div>

                      <div
                        className="p-3 cp-bg-6 mt-5 "
                        style={{ borderRadius: 15 }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                      
                            <div className="text-center w-100 fs-12">
                      -------------------
                            </div>
                          </div>
                     
                    
                      </div>
                    </div>

                  
                      <div className="fs-20 fw-bold text-center text-white mt-4 bg-secondary py-3 ps-4">
                        Daftar Semua Pegawai
                      </div>

                      <div class="row p-4 mb-5 mx-0 px-0">
                    {employee.length !== 0
                      ? employee.map((e) => (
                          <div class="col-sm-6 mb-3">
                            <div class="card h-100">
                              <div
                                class="card-body d-flex justify-content-between"
                                style={{ flexDirection: "column" }}
                              >
                                <div>
                                  <div className=" rounded cp-bg-yellow p-5 text-center"> 
                                  <CgEreader/>
                                  <div className="mt-2">No Image</div>
                                  </div>
                                  <h5 class="card-title mt-3">{e.nama}</h5>
                               
                                </div>
                                <div>
                                  <div> NIK : <strong>{e.NIK}</strong></div>
                                  <hr />
                                  <div> Departemen : </div>
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
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {!viewSideBar ? <NavbarBottom /> : ""}
    </>
  )
}
