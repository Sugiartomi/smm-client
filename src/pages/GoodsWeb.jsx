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

export default function GoodsWeb() {
  let loginUSer = JSON.parse(localStorage.getItem("payload")).role
  let payload = JSON.parse(localStorage.getItem("payload"))

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("payload")
    navigate("/login")
    window.location.reload()
  }

  const [viewSideBar, setViewSideBar] = useState(false)
  const [goods, setGoods] = useState([])

  const randomNumber = () => {
    return Math.floor(Math.random() * (9 - 0) + 0)
  }
  const randomDescription = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, minima?",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, dolore similique!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia fuga blanditiis perspiciatis.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti fugiat sit doloribus sequi?",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rem natus nobis debitis veniam!",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem tempore id eum voluptates laboriosam vero.",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus ipsum vero aspernatur laborum error id nobis.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut iste, cupiditate excepturi explicabo ipsa repellat accusamus omnis?",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id error iste maiores temporibus totam consequatur, impedit perspiciatis vero!",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta natus itaque architecto magni ratione quasi laudantium a nulla consequuntur?",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed aspernatur labore odio necessitatibus voluptate? Cupiditate beatae a perspiciatis adipisci sint.",
  ]

  useEffect(() => {
    axios
      .get(BaseHttp + "/goods")
      .then((data) => setGoods(data.data))
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
                    Daftar Barang
                  </div>
                  <div class="row p-4">
                    {goods.length !== 0
                      ? goods.map((e) => (
                          <div class="col-sm-3 mb-3">
                            <div class="card h-100">
                              <div
                                class="card-body d-flex justify-content-between"
                                style={{ flexDirection: "column" }}
                              >
                                <div>
                                  <h5 class="card-title">{e.nama}</h5>
                                  <div className=" rounded cp-bg-3 p-5 text-center"> 
                                  <CgEreader/>
                                  <div className="mt-2">No Image</div>
                                  </div>
                                  <p className="mb-1">Deskripsi : </p>
                                  <p class="card-text">
                                    {randomDescription[randomNumber()]}
                                  </p>
                                </div>
                                <div>
                                  <div> Lokasi : <strong>{e.lokasi}</strong></div>
                                  <hr />
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className="">
                                      <div>stock : <span className="fw-bold fs-30">{e.stock}</span></div>
                                    </div>
                                    <div className="mt-1">
                                      <div>satuan : <span className="fw-bold fs-20 text-secondary">{e.satuan}</span></div>
                                    </div>
                                  
                                  </div>
                                  <hr />
                                  <div className="cp-bg-4 w-100 text-center py-2 rounded">
                                    Detail
                                  </div>
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
