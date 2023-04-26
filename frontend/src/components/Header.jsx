import React from "react"
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    const { name } = user;
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    toast.success(`User ${name} has logged out!`)
  }

  return (
    <header className="header">
      <div className="logo">
        <Link className="companyLogo" to="/">Companies</Link>
        <Link to="/employees">Employees</Link>
      </div>
      <ul>
        { user ? (
          <li>
            <button
              className="btn"
              onClick={ onLogout }
              >
              <FaSignOutAlt/> Logout
            </button>
          </li>
          ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <FaUser/> Signup
              </Link>
            </li>
          </>)}
      </ul>
    </header>
  )
}

export default Header