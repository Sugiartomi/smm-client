import {
  CgCircleci,
  CgLogOut,
  CgProfile,
  CgQuoteO,
  CgRing,
} from "react-icons/cg"
import logoSMM from "../assets/logo-smm.jpg"
import { useNavigate } from "react-router"

export default function NavbarComponent() {
  let loginUSer = JSON.parse(localStorage.getItem("payload")).role
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("payload")
    navigate("/login")
    window.location.reload()
  }

  return (
    <>
      <nav class="navbar bg-body-tertiary position-fixed w-100" style={{ zIndex : 4}}>
        <div class="container-fluid">
          <a class="navbar-brand d-flex align-items-center" href="#">
            <img
              src={logoSMM}
              alt="Logo"
              width="auto"
              height="25"
              class="d-inline-block align-text-top"
            />
            <span className="ms-4 fs-14 fw-bold text-secondary">
              PT. Sarana Makin Mulya
            </span>
          </a>
          <div className="d-flex align-items-center">
            <div className="me-4">
              Login as :{" "}
              <strong>
                {loginUSer} <CgCircleci className="text-success ms-2" />{" "}
              </strong>{" "}
            </div>
            <div class="nav-item dropdown ">
              <a
                class=""
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div
                  className="border border-2 rounded-circle d-flex align-items-center justify-content-center text-secondary"
                  style={{ width: 35, height: 35 }}
                >
                  <CgProfile size="30px" />
                </div>
              </a>
              <ul class="dropdown-menu dropdown-menu-end mt-3">
                <li>
                  <a class="dropdown-item">Fiture - 1</a>
                </li>
                <li>
                  <a class="dropdown-item">Fiture - 2</a>
                </li>
                <li>
                  <a class="dropdown-item">Fiture - 3</a>
                </li>
                <li>
                  <a class="dropdown-item">Fiture - 4</a>
                </li>
                <li>
                  <a class="dropdown-item">Fiture - 5</a>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" onClick={() => handleLogout()}>
                    <CgLogOut className="me-2" /> Log Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
