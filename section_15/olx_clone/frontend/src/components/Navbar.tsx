import logo from '../assets/logo.svg'
import { MdGridView } from "react-icons/md";
import { CiBellOn } from "react-icons/ci";

import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { logout, authenticated } = useContext(UserContext);

  return (
    <nav id="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="OLX Clone" height={60} width={60} />
        </Link>

        {authenticated && (
          <ul className="navbar-nav middle">
            <li className="nav-item">
              <Link to="/my-items" className="nav-link">
                <MdGridView /> My Items
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/my-trades" className="nav-link">
                <CiBellOn /> My Trades
              </Link>
            </li>
          </ul>
        )}

        <ul className="navbar-nav">
          {authenticated ? (
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-link button primary">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link button" onClick={logout}>
                  Logout
                </span>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link button">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link button primary">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;