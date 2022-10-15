import { useNavigate } from "react-router-dom";

export const NavBar = ({u_info}) => {
  const { u_role, u_firstname, u_email } = u_info;
  const navigate = useNavigate();
  return (
    <div className="navbar">
        <div className="navbar__logo" onClick={() => 
        {
          if (window.location.pathname === "/barber-dashboard" || window.location.pathname === "/customer-dashboard") {
            return;
          }
          if (u_role === "barber") {
              navigate("/barber-dashboard", { state: { u_email: u_email } })
          }
          else if (u_role === "customer") {
              navigate("/customer-dashboard", { state: { u_email: u_email } })
          }
        }
        }>
          <h1>Book<span>Barber</span></h1>
        </div>
        <div className="user__name">
          { window.location.pathname === "/barber-dashboard" || window.location.pathname === "/customer-dashboard" && (<h3>Hi, <span>{u_firstname}</span></h3>)}
        </div>
        <div className="logout-btn">
          <button style={{width:"10rem"}}
            onClick={() => {
              window.location.href = "/";
            }}
          >Logout</button>
        </div>
      </div>
  )};
