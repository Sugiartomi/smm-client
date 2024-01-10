import {
  CgAttribution,
  CgBriefcase,
  CgEventbrite,
  CgHome,
  CgProfile,
  CgSpinnerTwo,
} from "react-icons/cg"
import { useNavigate } from "react-router"

function NavbarBottom() {
  const navigate = useNavigate()
  return (
    <>
      <div
        className={"fixed-navbar col-12 width-breakpoint text-white"}
        style={{
          height: 78,
          maxWidth: "100vw",
          borderTop: "1.5px solid rgba(128, 128, 128, 0.25)",
        }}
      >
        <div className="d-flex align-items-center justify-content-evenly h-100  cp-bg-5">
          {/* HOME */}

          <div className="h-100 d-flex align-items-center">
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ flexDirection: "column" }}
            >
              <CgHome />
              <div className=" font-12 mt-2  ">Home</div>
            </div>
          </div>

          <div className="h-100 d-flex align-items-center">
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ flexDirection: "column" }}
              onClick={() => navigate("/request")}
            >
              <CgBriefcase />
              <div className=" font-12 mt-1  mt-2">Request</div>
            </div>
          </div>

          <div className="h-100 d-flex align-items-center">
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ flexDirection: "column" }}
              onClick={() => navigate("/goods")}
            >
              <CgSpinnerTwo />

              <div className=" font-12 mt-1  mt-2">Goods</div>
            </div>
          </div>

          <div className="h-100 d-flex align-items-center">
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ flexDirection: "column" }}
              onClick={() => navigate("/employee")}
            >
              <CgProfile />
              <div className=" font-12 mt-1  mt-2">User</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavbarBottom
