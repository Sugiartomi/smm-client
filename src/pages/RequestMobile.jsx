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
} from "react-icons/cg"
import NavbarComponent from "../component/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { BaseHttp } from ".."
import Swal from "sweetalert2"
import { useNavigate } from "react-router"
import NavbarBottom from "../component/NavbarBottom"

export default function RequestMobile() {
  let payload = JSON.parse(localStorage.getItem("payload"))
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("payload")
    navigate("/login")
    window.location.reload()
    setViewSideBar(false)
  }

  const [viewSideBar, setViewSideBar] = useState(false)
  const [goods, setGoods] = useState([])
  const [employees, setEmployees] = useState([])
  const [request, setRequest] = useState([])
  const [tabRequest, setTabRequest] = useState("individu")
  const [viewRequest, setViewRequest] = useState(false)
  const [requestPersonal, setRequestPersonal] = useState([])
  const [requestDiv, setRequestDiv] = useState([])
  const [trigger, setTrigger] = useState(0)
  const [validateSubmit, setValidateSubmit] = useState(false)
  const [inputGoods, setInputGoods] = useState([
    {
      reg: 0,
      barang: "",
      qty: "",
      note: "",
      lokasi: "",
      stock: "",
      scale: "",
      status: "",
    },
  ])

  const [inputUser, setInputUser] = useState({
    id: "",
    NIK: "",
    nama: "",
    departemen: "",
  })

  const [changeStatus, setChangeStatus] = useState({
    id: "",
    user: "",
    qty: "",
    barang: "",
    status: "",
  })

  const handleChangeStatus = () => {
    axios
      .get(BaseHttp + "/request/change/" + changeStatus.id)
      .then((data) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          text: data.data.message,
          showConfirmButton: false,
          timer: 1500,
        })
        setTrigger(trigger + 1)
      })
      .catch((err) => console.log(err))
  }

  // useEffect(() => {
  //   let view = localStorage.getItem("view-sidebar")
  //   if (view === "open") {
  //     setViewSideBar(true)
  //   } else {
  //     setViewSideBar(false)
  //   }
  // }, [])

  useEffect(() => {
    axios
      .get(BaseHttp + "/goods")
      .then((data) => setGoods(data.data))
      .catch((err) => console.log(err))
  }, [])
  useEffect(() => {
    axios
      .get(BaseHttp + "/employees")
      .then((data) => setEmployees(data.data))
      .catch((err) => console.log(err))
  }, [])
  useEffect(() => {
    axios
      .get(BaseHttp + "/request")
      .then((data) => {
        setRequest(data.data)
        let dataPersonal = data.data.filter((e) => e.User.nama == payload.role)
        let dataDiv = data.data.filter(
          (e) => e.User.departemen == payload.department
        )

        setRequestPersonal(dataPersonal)
        setRequestDiv(dataDiv)
      })
      .catch((err) => console.log(err))
  }, [trigger])

  useEffect(() => {
    let flag = false
    inputGoods.forEach((e) => {
      e.barang && e.qty && e.note
        ? +e.qty <= +e.stock
          ? (flag = true)
          : (flag = false)
        : (flag = false)
    })
    flag ? setValidateSubmit(true) : setValidateSubmit(false)
  }, [inputGoods])

  const handleInputUser = (event) => {
    let findUser = employees.find((e) => +e.id === +event.target.value)
    if (findUser) {
      setInputUser({
        id: findUser.id,
        NIK: findUser.NIK,
        nama: findUser.nama,
        departemen: findUser.departemen,
      })
    }
  }

  let newDate = ""
  new Date()
    .toLocaleDateString()
    .split("/")
    .reverse()
    .forEach((e, i) => {
      if (e.toString().length == 1) {
        i !== 2 ? (newDate += `0${e}-`) : (newDate += `0${e}`)
      } else {
        i !== 2 ? (newDate += `${e}-`) : (newDate += `${e}`)
      }
    })

  const handleInputGoods = (event) => {
    let paramsName = event.target.name.split("-")
    let target = paramsName[paramsName.length - 1]
    let findGoods = goods.find((e) => e.id == event.target.value)

    let newArr = []

    inputGoods.forEach((e) => {
      if (e.reg == +target) {
        if (paramsName[1] === "goods") {
          newArr.push({
            ...e,
            reg: e.reg,
            barang: event.target.value,
            lokasi: findGoods.lokasi,
            stock: findGoods.stock,
            scale: findGoods.satuan,
            status: "",
            note: "",
            qty: "",
          })
        } else if (paramsName[1] === "qty") {
          newArr.push({
            ...e,
            reg: e.reg,
            qty: +event.target.value,
            status: +event.target.value
              ? +e.stock >= +event.target.value
                ? "tersedia"
                : "tidak"
              : "-",
          })
        } else if (paramsName[1] === "note") {
          newArr.push({
            ...e,
            reg: e.reg,
            note: event.target.value,
          })
        }
      } else {
        newArr.push(e)
      }
    })
    setInputGoods(newArr)
  }

  const handleDeleteInputGoods = (target) => {
    if (inputGoods.length === 1) {
      setInputGoods([
        {
          reg: 0,
          barang: "",
          qty: "",
          note: "",
          lokasi: "",
          stock: "",
          scale: "",
          status: "",
        },
      ])
    } else {
      let newDelete = inputGoods.filter((e) => e.reg !== target)
      let newArr = []
      for (let i = 0; i < newDelete.length; i++) {
        let perData = newDelete[i]
        perData.reg = i
        newArr.push(perData)
      }
      setInputGoods(newArr)
    }
  }

  const handleSubmitRequest = () => {
    axios
      .post(BaseHttp + "/request", {
        goods: inputGoods,
        userID: inputUser.id,
      })
      .then((data) => {
        setTrigger(trigger + 1)
        Swal.fire({
          position: "top-end",
          icon: "success",
          text: data.data.message,
          showConfirmButton: false,
          timer: 1500,
        })
        setInputGoods([
          {
            reg: 0,
            barang: "",
            qty: "",
            note: "",
            lokasi: "",
            stock: "",
            scale: "",
            status: "",
          },
        ])
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <div className="fs-12 " style={{ height: "90vh" }}>
        {!viewSideBar ? (
          <>
            <div
              className="position-fixed bottom-0 start-0 border border-3 text-dark bg-white rounded-circle ms-2 d-flex align-items-center justify-content-center"
              style={{ width: 40, height: 40, marginBottom: 55, zIndex: 4 }}
              onClick={() => {
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
                    onClick={() => {
                      setViewSideBar(false)
                      navigate("/request")
                    }}
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
                      navigate("/goods")
                    }}
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
                      navigate("/employee")
                    }}
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
                        {payload?.role === "admin"
                          ? "All Request"
                          : `Request Departemen ${payload.department}`}
                      </div>

                      <div
                        className="p-3 cp-bg-6 mt-5 "
                        style={{ borderRadius: 15 }}
                      >
                        {payload?.role === "admin" ? (
                          "admin"
                        ) : (
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="fw-bold">
                              <div className=" align-items-center fs-12">
                                <div className="d-flex">
                                  <div
                                    className={
                                      tabRequest === "individu"
                                        ? "p-2  cp-bg-1 text-dark ps-3"
                                        : "p-2  border bg-white text-secondary ps-3"
                                    }
                                    style={{ borderRadius: "10px 0 0 10px" }}
                                    onClick={() => setTabRequest("individu")}
                                  >
                                    Individu
                                  </div>
                                  <div
                                    className={
                                      tabRequest === "departemen"
                                        ? "p-2  cp-bg-1 text-dark pe-3"
                                        : "p-2 border bg-white text-secondary pe-3"
                                    }
                                    style={{ borderRadius: "0 10px 10px 0" }}
                                    onClick={() => setTabRequest("departemen")}
                                  >
                                    Departemen
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="fs-16 px-3 cp-bg-green text-white  py-2 rounded"
                              onClick={() => setViewRequest(true)}
                            >
                              <CgAdd /> Add
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {!viewRequest ? (
                      <div className="fs-20 fw-bold text-center text-white mt-4 bg-secondary py-3 ps-4">
                        Daftar Permintaan Barang
                      </div>
                    ) : (
                      ""
                    )}

                    {!viewRequest ? (
                      <div className="p-4 px-4 mb-5">
                        {payload?.role === "admin"
                          ? request.length !== 0
                            ? request.map((e, i) => (
                                <>
                                  <div
                                    className="row shadow border border-1 mb-4"
                                    style={{ borderRadius: 20 }}
                                  >
                                    <div
                                      className="cp-bg-3 fs-18 py-3 ps-3 fw-bold"
                                      style={{ borderRadius: "20px 20px 0 0" }}
                                    >
                                      <span className="cp-bg-5 text-white rounded me-2 fs-14 py-1 px-3">
                                        {" "}
                                        {e.User.nama}{" "}
                                      </span>
                                      : {e.Good.nama}
                                    </div>
                                    <div className="row px-3 mt-2">
                                      <div className="col">
                                        <div className="row">
                                          <div className="col"> Lokasi</div>
                                          <div className="col fw-bold">
                                            : {e.Good.lokasi}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div className="row">
                                          <div className="col"> Stock</div>
                                          <div className="col fw-bold">
                                            : {e.Good.stock}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <hr
                                      className="my-2"
                                      style={{ opacity: "10%" }}
                                    />
                                    <div className="row px-3">
                                      <div className="col">
                                        <div className="row">
                                          <div className="col"> Satuan</div>
                                          <div className="col fw-bold">
                                            : {e.Good.satuan}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div className="row">
                                          <div className="col fw-bold">
                                            {" "}
                                            Kuantiti
                                          </div>
                                          <div className="col">: {e.qty}</div>
                                        </div>
                                      </div>
                                    </div>
                                    <hr
                                      className="my-2"
                                      style={{ opacity: "10%" }}
                                    />
                                    <div className="row px-3">
                                      <div className="col">
                                        <div className="row">
                                          <div className="col"> Status</div>
                                          <div className="col fs-12 d-flex">
                                            <div className="me-2"> :</div>
                                            {e.status === "DONE" ? (
                                              <div
                                                className="bg-success rounded-circle"
                                                style={{
                                                  width: 20,
                                                  height: 20,
                                                }}
                                              >
                                                {""}
                                              </div>
                                            ) : (
                                              <div
                                                className="bg-warning rounded-circle"
                                                style={{
                                                  width: 20,
                                                  height: 20,
                                                }}
                                              >
                                                {""}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div className="row">
                                          <div className="col"> note</div>
                                          <div className="col">:</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="px-3">
                                      <div className="px-3 mt-4 border rounded  mb-4">
                                        <div className="p-2"> {e.note}</div>
                                      </div>
                                    </div>
                                    <div className="d-flex justify-content-end mb-3">
                                      <div
                                        className="cp-bg-4 py-2 px-3"
                                        style={{ borderRadius: 15 }}
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() =>
                                          setChangeStatus({
                                            id: e.id,
                                            user: e.User.nama,
                                            qty: e.qty,
                                            barang: e.Good.nama,
                                            status: e.status,
                                          })
                                        }
                                      >
                                        Change Status
                                      </div>
                                      <div
                                        className="cp-bg-red text-white py-2 px-3 ms-3"
                                        style={{ borderRadius: 15 }}
                                        onClick={() =>
                                          Swal.fire({
                                            title: "Are you sure?",
                                            showCancelButton: true,
                                            confirmButtonText: "Delete",
                                            confirmButtonColor: "#DF826C",
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              axios
                                                .get(
                                                  BaseHttp +
                                                    "/request/delete/" +
                                                    e.id
                                                )
                                                .then(() =>
                                                  setTrigger(trigger + 1)
                                                )
                                                .catch((err) =>
                                                  console.log(err)
                                                )
                                              Swal.fire(
                                                "Delete!",
                                                "",
                                                "success"
                                              )
                                            }
                                          })
                                        }
                                      >
                                        Delete
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ))
                            : ""
                          : tabRequest === "individu"
                          ? requestPersonal.map((e, i) => (
                              <>
                                <div
                                  className="row shadow border border-1 mb-4"
                                  style={{ borderRadius: 20 }}
                                >
                                  <div
                                    className="cp-bg-3 fs-18 py-3 ps-3 fw-bold"
                                    style={{ borderRadius: "20px 20px 0 0" }}
                                  >
                                    <span className="cp-bg-5 text-white rounded me-2 fs-14 py-1 px-3">
                                      {" "}
                                      {e.User.nama}{" "}
                                    </span>
                                    : {e.Good.nama}
                                  </div>
                                  <div className="row px-3 mt-2">
                                    <div className="col">
                                      <div className="row">
                                        <div className="col"> Lokasi</div>
                                        <div className="col fw-bold">
                                          : {e.Good.lokasi}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="row">
                                        <div className="col"> Stock</div>
                                        <div className="col fw-bold">
                                          : {e.Good.stock}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <hr
                                    className="my-2"
                                    style={{ opacity: "10%" }}
                                  />
                                  <div className="row px-3">
                                    <div className="col">
                                      <div className="row">
                                        <div className="col"> Satuan</div>
                                        <div className="col fw-bold">
                                          : {e.Good.satuan}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="row">
                                        <div className="col fw-bold">
                                          {" "}
                                          Kuantiti
                                        </div>
                                        <div className="col">: {e.qty}</div>
                                      </div>
                                    </div>
                                  </div>
                                  <hr
                                    className="my-2"
                                    style={{ opacity: "10%" }}
                                  />
                                  <div className="row px-3">
                                    <div className="col">
                                      <div className="row">
                                        <div className="col"> Status</div>
                                        <div className="col fs-12 d-flex">
                                          <div className="me-2"> :</div>
                                          {e.status === "DONE" ? (
                                            <div
                                              className="bg-success rounded-circle"
                                              style={{ width: 20, height: 20 }}
                                            >
                                              {""}
                                            </div>
                                          ) : (
                                            <div
                                              className="bg-warning rounded-circle"
                                              style={{ width: 20, height: 20 }}
                                            >
                                              {""}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="row">
                                        <div className="col"> note</div>
                                        <div className="col">:</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-3">
                                    <div className="px-3 mt-4 border rounded  mb-4">
                                      <div className="p-2"> {e.note}</div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))
                          : requestDiv.map((e, i) => (
                              <>
                                <div
                                  className="row shadow border border-1 mb-4"
                                  style={{ borderRadius: 20 }}
                                >
                                  <div
                                    className="cp-bg-4 fs-18 py-3 ps-3 fw-bold"
                                    style={{ borderRadius: "20px 20px 0 0" }}
                                  >
                                    <span className="cp-bg-5 text-white rounded me-2 fs-14 py-1 px-3">
                                      {" "}
                                      {e.User.nama}{" "}
                                    </span>
                                    : {e.Good.nama}
                                  </div>
                                  <div className="row px-3 mt-2">
                                    <div className="col">
                                      <div className="row">
                                        <div className="col"> Lokasi</div>
                                        <div className="col fw-bold">
                                          : {e.Good.lokasi}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="row">
                                        <div className="col"> Stock</div>
                                        <div className="col fw-bold">
                                          : {e.Good.stock}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <hr
                                    className="my-2"
                                    style={{ opacity: "10%" }}
                                  />
                                  <div className="row px-3">
                                    <div className="col">
                                      <div className="row">
                                        <div className="col"> Satuan</div>
                                        <div className="col fw-bold">
                                          : {e.Good.satuan}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="row">
                                        <div className="col fw-bold">
                                          {" "}
                                          Kuantiti
                                        </div>
                                        <div className="col">: {e.qty}</div>
                                      </div>
                                    </div>
                                  </div>
                                  <hr
                                    className="my-2"
                                    style={{ opacity: "10%" }}
                                  />
                                  <div className="row px-3">
                                    <div className="col">
                                      <div className="row">
                                        <div className="col"> Status</div>
                                        <div className="col fs-12 d-flex">
                                          <div className="me-2"> :</div>
                                          {e.status === "DONE" ? (
                                            <div
                                              className="bg-success rounded-circle"
                                              style={{ width: 20, height: 20 }}
                                            >
                                              {""}
                                            </div>
                                          ) : (
                                            <div
                                              className="bg-warning rounded-circle"
                                              style={{ width: 20, height: 20 }}
                                            >
                                              {""}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="row">
                                        <div className="col"> note</div>
                                        <div className="col">:</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-3">
                                    <div className="px-3 mt-4 border rounded  mb-4">
                                      <div className="p-2"> {e.note}</div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))}
                        {}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {viewRequest ? (
                  <div className="p-4">
                    <div
                      className="border bg-white"
                      style={{ borderRadius: 15, marginBottom: 100 }}
                    >
                      <div
                        className="cp-bg-1 text-white p-4 fs-20"
                        style={{ borderRadius: "15px 15px 0 0" }}
                      >
                        Tambah Permintaan Barang
                      </div>
                      <div className=" mt-4 p-4">
                        <div className="col">
                          <div className="mb-2">NIK Peminta : </div>
                          <select
                            class="form-select shadow-none"
                            // name={`input-goods-id-${i}`}
                            onChange={handleInputUser}
                          >
                            <option
                              selected
                              disabled
                              style={{ display: "none" }}
                            >
                              choose
                            </option>
                            {employees.length !== 0
                              ? employees.map((e, i) => (
                                  <option key={i} value={e.id}>
                                    {e.NIK} ({e.nama})
                                  </option>
                                ))
                              : ""}
                          </select>
                        </div>
                        <div className="col mt-3">
                          <div className="mb-2">Name</div>
                          <input
                            type="text"
                            className="form-control"
                            disabled
                            value={inputUser.nama ? inputUser.nama : ""}
                          />
                        </div>
                        <div className="col mt-3">
                          <div className="mb-2">Departemen :</div>
                          <input
                            type="text"
                            className="form-control"
                            disabled
                            value={
                              inputUser.departemen ? inputUser.departemen : ""
                            }
                          />
                        </div>
                        <div className="col mt-3">
                          <div className="mb-2">Tanggal Permintaan :</div>
                          <input
                            type="date"
                            className="form-control"
                            disabled
                            value={newDate}
                          />
                        </div>
                      </div>
                      {inputUser.id ? (
                        <div className="p-4">
                          <div className="fw-bold mb-4 fs-16">
                            Daftar Barang
                          </div>

                          {inputGoods.map((e, i) => (
                            <div className="row mb-2" key={i}>
                              <div className="border rounded px-2 pb-4 pt-3">
                                <div
                                  className="cp-bg-5 text-white rounded-circle d-flex align-items-center justify-content-center mb-3 fw-bold"
                                  style={{ width: 30, height: 30 }}
                                >
                                  {i + 1}
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="">Barang :</div>
                                  <div className="ms-3">
                                    <select
                                      class="form-select shadow-none"
                                      name={`input-goods-id-${i}`}
                                      onChange={handleInputGoods}
                                      value={e.barang ? e.barang : "none"}
                                    >
                                      <option
                                        selected
                                        disabled
                                        style={{ display: "none" }}
                                        value="none"
                                      >
                                        Open this to select goods.
                                      </option>
                                      {goods.length !== 0
                                        ? goods.map((e, i) => (
                                            <option key={i} value={+e.id}>
                                              {e.nama}
                                            </option>
                                          ))
                                        : ""}
                                    </select>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col">
                                    <div className="row">
                                      <div className="col">lokasi</div>
                                      <div className="col fw-bold">
                                        : {e.lokasi ? e.lokasi : "-"}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="row">
                                      <div className="col"> Stock</div>
                                      <div className="col fw-bold">
                                        : {e.stock ? e.stock : "-"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-2 d-flex align-items-center">
                                  <div className="col">
                                    <div className="row">
                                      <div className="col">Satuan</div>
                                      <div className="col fw-bold">
                                        : {e.scale ? e.scale : "-"}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="row d-flex align-items-center">
                                      <div className="col"> Qty</div>
                                      <div className="col fw-bold">
                                        {e.barang ? (
                                          <input
                                            type="number"
                                            className="form-control shadow-none text-center"
                                            name={`input-qty-id-${i}`}
                                            onChange={handleInputGoods}
                                            value={e.qty ? e.qty : ""}
                                          />
                                        ) : (
                                          <input
                                            type="number"
                                            className="form-control shadow-none text-center"
                                            disabled
                                            value={e.qty ? e.qty : ""}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col">
                                    <div className="row">
                                      <div className="col">Tersedia</div>
                                      <div className="col fw-bold">
                                        :{" "}
                                        {e.status ? (
                                          e.status !== "-" ? (
                                            e.status === "tersedia" ? (
                                              <CgCheckO
                                                size={20}
                                                className="text-success"
                                              />
                                            ) : (
                                              <CgCloseO
                                                size={20}
                                                className="text-danger"
                                              />
                                            )
                                          ) : (
                                            "-"
                                          )
                                        ) : (
                                          "-"
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="row">
                                      <div className="col"> Keterangan</div>
                                      <div className="col fw-bold">:</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex p-1 mt-3">
                                  <div className=" w-100">
                                    {e.barang ? (
                                      <textarea
                                        rows={1}
                                        type="text-area"
                                        className="form-control shadow-none"
                                        name={`input-note-id-${i}`}
                                        onChange={handleInputGoods}
                                        value={e.note ? e.note : ""}
                                      />
                                    ) : (
                                      <textarea
                                        rows={1}
                                        type="text-area"
                                        className="form-control shadow-none"
                                        disabled
                                        value={e.note ? e.note : ""}
                                      />
                                    )}
                                  </div>
                                  <div
                                    className=" border  text-danger ms-3 rounded h-100 text-center py-2"
                                    style={{ width: "10%" }}
                                  >
                                    <CgTrash
                                      size={15}
                                      onClick={() => handleDeleteInputGoods(i)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="d-flex justify-content-between">
                        {inputUser.id ? (
                          <div
                            className="btn ms-4 mb-5 text-white"
                            style={{ backgroundColor: "#4682A9" }}
                            onClick={() =>
                              setInputGoods([
                                ...inputGoods,
                                {
                                  reg:
                                    inputGoods[inputGoods.length - 1]["reg"] +
                                    1,
                                  barang: "",
                                  qty: "",
                                  note: "",
                                },
                              ])
                            }
                          >
                            <CgMathPlus /> barang
                          </div>
                        ) : (
                          <div />
                        )}

                        <div>
                          {inputUser.id ? (
                            validateSubmit ? (
                              <div
                                className="btn btn-success ms-2 mb-5"
                                onClick={() => handleSubmitRequest()}
                              >
                                Submit
                              </div>
                            ) : (
                              <div
                                className="btn btn-secondary ms-2 mb-5"
                                onClick={() => {
                                  Swal.fire({
                                    position: "top-end",
                                    icon: "error",
                                    text: "Periksa kembali input barang",
                                    showConfirmButton: false,
                                    timer: 1500,
                                  })
                                }}
                              >
                                Submit
                              </div>
                            )
                          ) : (
                            ""
                          )}

                          <div
                            className="btn btn-danger ms-2 mb-5 me-4"
                            onClick={() => {
                              setViewRequest(false)
                              setInputUser({
                                id: "",
                                NIK: "",
                                nama: "",
                                departemen: "",
                              })
                            }}
                          >
                            Cancel
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Change Status
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() =>
                  setChangeStatus({
                    id: "",
                    user: "",
                    qty: "",
                    barang: "",
                    status: "",
                  })
                }
              ></button>
            </div>
            <div class="modal-body">
              <div>
                Request {changeStatus.barang} oleh {changeStatus.user} sejumlah{" "}
                {changeStatus.qty}
              </div>
              <div className="d-flex align-items-center mt-2">
                <div>Status saat ini :</div>
                {changeStatus.status === "DONE" ? (
                  <div className="px-2  ms-3 py-1 cp-bg-green text-white rounded">
                    {changeStatus.status}
                  </div>
                ) : (
                  <div className="px-2  ms-3 py-1 cp-bg-yellow text-white rounded">
                    {changeStatus.status}
                  </div>
                )}
              </div>

              <div className="mt-5">
                Apakah anda yakin meruab menjadi{" "}
                <strong>
                  {changeStatus.status === "WAITING" ? "DONE" : "WAITING"}
                </strong>{" "}
                ?
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => handleChangeStatus()}
              >
                Yes
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() =>
                  setChangeStatus({
                    id: "",
                    user: "",
                    qty: "",
                    barang: "",
                    status: "",
                  })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {!viewSideBar ? <NavbarBottom /> : ""}
    </>
  )
}
