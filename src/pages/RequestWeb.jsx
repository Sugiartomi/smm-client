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

export default function RequestWeb() {
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

  useEffect(() => {
    let view = localStorage.getItem("view-sidebar")
    if (view === "open") {
      setViewSideBar(true)
    } else {
      setViewSideBar(false)
    }
  }, [])
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

  const handleChangeStatus = () => {
    axios
      .get(BaseHttp + "/request/change/" + changeStatus.id)
      .then((data) =>{

        Swal.fire({
          position: "top-end",
          icon: "success",
          text: data.data.message,
          showConfirmButton: false,
          timer: 1500,
        })
        setTrigger(trigger+1)
      }
      )
      .catch((err) => console.log(err))
  }

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
                    Request Departemen {payload.department}
                  </div>
                  <div className="p-4 px-5 mb-5">
                    <div className="d-flex justify-content-between">
                      <div className="">Daftar Permintaan Barang</div>
                      <div className="fw-bold">
                        {loginUSer === "admin" ? (
                          ""
                        ) : (
                          <div className="d-flex  align-items-center fs-12">
                            <div className="me-4">filter :</div>
                            <div
                              className={
                                tabRequest === "individu"
                                  ? "p-2 border bg-secondary text-white ps-3"
                                  : "p-2 border text-secondary ps-3"
                              }
                              style={{ borderRadius: "10px 0 0 10px" }}
                              onClick={() => setTabRequest("individu")}
                            >
                              Individu
                            </div>
                            <div
                              className={
                                tabRequest === "departemen"
                                  ? "p-2 border bg-secondary text-white pe-3"
                                  : "p-2 border text-secondary pe-3"
                              }
                              style={{ borderRadius: "0 10px 10px 0" }}
                              onClick={() => setTabRequest("departemen")}
                            >
                              Departemen
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="d-flex fw-bold border text-center mt-4">
                      <div className="border py-2" style={{ width: "5%" }}>
                        #
                      </div>
                      <div className="border py-2" style={{ width: "30%" }}>
                        Barang
                      </div>
                      <div className="border py-2" style={{ width: "10%" }}>
                        Lokasi
                      </div>
                      <div className="border py-2" style={{ width: "10%" }}>
                        Stock
                      </div>
                      <div className="border py-2" style={{ width: "10%" }}>
                        Kuantiti
                      </div>
                      <div className="border py-2" style={{ width: "10%" }}>
                        Satuan
                      </div>
                      <div className="border py-2" style={{ width: "10%" }}>
                        User
                      </div>
                      <div className="border py-2" style={{ width: "20%" }}>
                        Keterangan
                      </div>
                      <div className="border py-2" style={{ width: "10%" }}>
                        Status
                      </div>
                      <div className="border py-2" style={{ width: "5%" }}>
                      -
                      </div>
                    </div>

                    {loginUSer === "admin"
                      ? request.length !== 0
                        ? request.map((e, i) => (
                            <div className="d-flex" key={i}>
                              <div
                                className="border py-1 text-center  d-flex align-items-center justify-content-center"
                                style={{ width: "5%" }}
                              >
                                {i + 1}
                              </div>
                              <div
                                className="border py-1 px-1  d-flex align-items-center ps-2"
                                style={{ width: "30%" }}
                              >
                                {e.Good.nama}
                              </div>
                              <div
                                className="border py-1 text-center d-flex align-items-center justify-content-center"
                                style={{ width: "10%" }}
                              >
                                {e.Good.lokasi}
                              </div>

                              <div
                                className="border py-1 text-center  d-flex align-items-center justify-content-center"
                                style={{ width: "10%" }}
                              >
                                {e.Good.stock}
                              </div>

                              <div
                                className="border p-1  d-flex align-items-center justify-content-center"
                                style={{ width: "10%" }}
                              >
                                {e.qty}
                              </div>

                              <div
                                className="border py-1 text-center  d-flex align-items-center justify-content-center"
                                style={{ width: "10%" }}
                              >
                                {e.Good.satuan}
                              </div>
                              <div
                                className="border py-1 text-center  d-flex align-items-center justify-content-center"
                                style={{ width: "10%" }}
                              >
                                {e.User.nama}
                              </div>

                              <div
                                className="border p-1  d-flex align-items-center ps-2"
                                style={{ width: "20%" }}
                              >
                                {e.note}
                              </div>

                              <div
                                className="border p-1  d-flex align-items-center fs-12 justify-content-center fw-bold text-center"
                                style={{ width: "10%" }}
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
                                {e.status === "WAITING" ? (
                                  <div className="px-2 w-100 py-1 cp-bg-yellow text-white rounded">
                                    {e.status}
                                  </div>
                                ) : (
                                  <div className="px-2 w-100 py-1 cp-bg-green text-white rounded">
                                    {e.status}
                                  </div>
                                )}
                              </div>
                              <div
                              className="border py-1 text-center  d-flex align-items-center justify-content-center text-danger"
                              style={{ width: "5%" }}
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
                              <CgTrash/>
                            </div>
                            </div>
                          ))
                        : ""
                      : tabRequest === "individu"
                      ? requestPersonal.map((e, i) => (
                          <div className="d-flex" key={i}>
                            <div
                              className="border py-1 text-center  d-flex align-items-center justify-content-center"
                              style={{ width: "5%" }}
                            >
                              {i + 1}
                            </div>
                            <div
                              className="border py-1 px-1  d-flex align-items-center ps-2"
                              style={{ width: "30%" }}
                            >
                              {e.Good.nama}
                            </div>
                            <div
                              className="border py-1 text-center d-flex align-items-center justify-content-center"
                              style={{ width: "10%" }}
                            >
                              {e.Good.lokasi}
                            </div>

                            <div
                              className="border py-1 text-center  d-flex align-items-center justify-content-center"
                              style={{ width: "10%" }}
                            >
                              {e.Good.stock}
                            </div>

                            <div
                              className="border p-1  d-flex align-items-center justify-content-center"
                              style={{ width: "10%" }}
                            >
                              {e.qty}
                            </div>

                            <div
                              className="border py-1 text-center  d-flex align-items-center justify-content-center"
                              style={{ width: "10%" }}
                            >
                              {e.Good.satuan}
                            </div>
                            <div
                              className="border py-1 text-center  d-flex align-items-center justify-content-center"
                              style={{ width: "10%" }}
                            >
                              {e.User.nama}
                            </div>

                            <div
                              className="border p-1  d-flex align-items-center ps-2"
                              style={{ width: "20%" }}
                            >
                              {e.note}
                            </div>

                            <div
                              className="border p-1  d-flex align-items-center fs-12 justify-content-center fw-bold text-center"
                              style={{ width: "10%" }}
                            >
                              {e.status === "WAITING" ? (
                                <div className="px-2 w-100 py-1 cp-bg-yellow text-white rounded">
                                  {e.status}
                                </div>
                              ) : (
                                <div className="px-2 w-100 py-1 cp-bg-green text-white rounded">
                                  {e.status}
                                </div>
                              )}
                            </div>
                            
                          </div>
                        ))
                      : requestDiv.map((e, i) => (
                          <div className="d-flex" key={i}>
                            <div
                              className="border py-1 text-center  d-flex align-items-center justify-content-center"
                              style={{ width: "5%" }}
                            >
                              {i + 1}
                            </div>
                            <div
                              className="border py-1 px-1  d-flex align-items-center ps-2"
                              style={{ width: "30%" }}
                            >
                              {e.Good.nama}
                            </div>
                            <div
                              className="border py-1 text-center d-flex align-items-center justify-content-center"
                              style={{ width: "10%" }}
                            >
                              {e.Good.lokasi}
                            </div>

                            <div
                              className="border py-1 text-center  d-flex align-items-center justify-content-center"
                              style={{ width: "10%" }}
                            >
                              {e.Good.stock}
                            </div>

                            <div
                              className="border p-1  d-flex align-items-center justify-content-center"
                              style={{ width: "10%" }}
                            >
                              {e.qty}
                            </div>

                            <div
                              className="border py-1 text-center  d-flex align-items-center justify-content-center"
                              style={{ width: "10%" }}
                            >
                              {e.Good.satuan}
                            </div>
                            <div
                              className="border py-1 text-center  d-flex align-items-center justify-content-center"
                              style={{ width: "10%" }}
                            >
                              {e.User.nama}
                            </div>

                            <div
                              className="border p-1  d-flex align-items-center ps-2"
                              style={{ width: "20%" }}
                            >
                              {e.note}
                            </div>

                            <div
                              className="border p-1  d-flex align-items-center fs-12 fw-bold justify-content-center text-center"
                              style={{ width: "10%" }}
                            >
                              {e.status === "WAITING" ? (
                                <div className="px-2 w-100 py-1 bg-warning text-white rounded">
                                  {e.status}
                                </div>
                              ) : (
                                <div className="px-2 w-100 py-1 bg-success text-white rounded">
                                  {e.status}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}

                    {!viewRequest && loginUSer !== "admin" ? (
                      <div className="d-flex justify-content-end">
                        <div
                          className="mt-5 px-3 cp-bg-5 text-white py-2 rounded mb-3"
                          onClick={() => setViewRequest(true)}
                        >
                          Request Barang
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              {viewRequest ? (
                <div className="p-4">
                  <div className="border bg-white" style={{ borderRadius: 15 }}>
                    <div
                      className="cp-bg-1 text-white p-4"
                      style={{ borderRadius: "15px 15px 0 0" }}
                    >
                      Tambah Permintaan Barang
                    </div>
                    <div className="row mt-4 p-4">
                      <div className="col">
                        <div>NIK Peminta : </div>
                        <select
                          class="form-select shadow-none"
                          // name={`input-goods-id-${i}`}
                          onChange={handleInputUser}
                        >
                          <option selected disabled style={{ display: "none" }}>
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
                      <div className="col">
                        <div>Name</div>
                        <input
                          type="text"
                          className="form-control"
                          disabled
                          value={inputUser.nama ? inputUser.nama : ""}
                        />
                      </div>
                      <div className="col">
                        <div>Departemen :</div>
                        <input
                          type="text"
                          className="form-control"
                          disabled
                          value={
                            inputUser.departemen ? inputUser.departemen : ""
                          }
                        />
                      </div>
                      <div className="col">
                        <div>Tanggal Permintaan :</div>
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
                        <div className="fw-bold">Daftar Barang</div>
                        <div className="d-flex fw-bold border text-center mt-4">
                          <div className="border py-2" style={{ width: "5%" }}>
                            #
                          </div>
                          <div className="border py-2" style={{ width: "30%" }}>
                            Barang
                          </div>
                          <div className="border py-2" style={{ width: "10%" }}>
                            Lokasi
                          </div>
                          <div className="border py-2" style={{ width: "10%" }}>
                            Stock
                          </div>
                          <div className="border py-2" style={{ width: "10%" }}>
                            Kuantiti
                          </div>
                          <div className="border py-2" style={{ width: "10%" }}>
                            Satuan
                          </div>
                          <div className="border py-2" style={{ width: "20%" }}>
                            Keterangan
                          </div>
                          <div className="border py-2" style={{ width: "10%" }}>
                            Tersedia
                          </div>
                          <div className="border py-2" style={{ width: "5%" }}>
                            -
                          </div>
                        </div>
                        {inputGoods.map((e, i) => (
                          <div className="d-flex" key={i}>
                            <div
                              className="border py-1 text-center  d-flex align-items-center justify-content-center"
                              style={{ width: "5%" }}
                            >
                              {i + 1}
                            </div>
                            <div
                              className="border py-1 px-1  d-flex align-items-center justify-content-center"
                              style={{ width: "30%" }}
                            >
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
                            <div
                              className="border py-1 text-center d-flex align-items-center justify-content-center"
                              style={{ width: "10%" }}
                            >
                              {e.lokasi ? e.lokasi : "-"}
                            </div>

                            <div
                              className="border py-1 text-center  d-flex align-items-center justify-content-center"
                              style={{ width: "10%" }}
                            >
                              {e.stock ? e.stock : "-"}
                            </div>
                            {e.barang ? (
                              <div
                                className="border p-1  d-flex align-items-center justify-content-center"
                                style={{ width: "10%" }}
                              >
                                <input
                                  type="number"
                                  className="form-control shadow-none text-center"
                                  name={`input-qty-id-${i}`}
                                  onChange={handleInputGoods}
                                  value={e.qty ? e.qty : ""}
                                />
                              </div>
                            ) : (
                              <div
                                className="border p-1  d-flex align-items-center justify-content-center"
                                style={{ width: "10%" }}
                              >
                                <input
                                  type="number"
                                  className="form-control shadow-none text-center"
                                  disabled
                                  value={e.qty ? e.qty : ""}
                                />
                              </div>
                            )}

                            <div
                              className="border py-1 text-center  d-flex align-items-center justify-content-center"
                              style={{ width: "10%" }}
                            >
                              {e.scale ? e.scale : "-"}
                            </div>
                            {e.barang ? (
                              <div
                                className="border p-1"
                                style={{ width: "20%" }}
                              >
                                <textarea
                                  rows={1}
                                  type="text-area"
                                  className="form-control shadow-none"
                                  name={`input-note-id-${i}`}
                                  onChange={handleInputGoods}
                                  value={e.note ? e.note : ""}
                                />
                              </div>
                            ) : (
                              <div
                                className="border p-1  d-flex align-items-center justify-content-center"
                                style={{ width: "20%" }}
                              >
                                <textarea
                                  rows={1}
                                  type="text-area"
                                  className="form-control shadow-none"
                                  disabled
                                  value={e.note ? e.note : ""}
                                />
                              </div>
                            )}

                            <div
                              className="border py-1  d-flex align-items-center justify-content-center"
                              style={{ width: "10%" }}
                            >
                              {e.status ? (
                                e.status !== "-" ? (
                                  e.status === "tersedia" ? (
                                    <CgCheckO className="text-success" />
                                  ) : (
                                    <CgCloseO className="text-danger" />
                                  )
                                ) : (
                                  "-"
                                )
                              ) : (
                                "-"
                              )}
                            </div>
                            <div
                              className="border py-1 text-center text-danger  d-flex align-items-center justify-content-center"
                              style={{ width: "5%" }}
                            >
                              <CgTrash
                                onClick={() => handleDeleteInputGoods(i)}
                              />
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
                                  inputGoods[inputGoods.length - 1]["reg"] + 1,
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
                            setInputUser({
                              id: "",
                              NIK: "",
                              nama: "",
                              departemen: "",
                            })
                            setViewRequest(false)
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
    </>
  )
}
