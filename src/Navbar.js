import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "./auth/UserContext";
import "./Navbar.css";

const Navbar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  const loggedInNavbar = () => {
    return (
      <nav>
        <NavLink className="nav-link" to="/companies">
          Companies
        </NavLink>
        <NavLink className="nav-link" to="/jobs">
          Jobs
        </NavLink>
        <NavLink className="nav-link" to="/profile">
          Profile
        </NavLink>
        <NavLink className="nav-link" to="/" onClick={logout}>
          Log out {currentUser.username}
        </NavLink>
      </nav>
    );
  };

  const loggedOutNavbar = () => {
    return (
      <nav>
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-link" to="/signup">
          Sign Up
        </NavLink>
      </nav>
    );
  };

  return (
    <nav>
      <div className="Navigation">
        <div>
          <Link className="nav-link" to="/">
            Jobly
          </Link>
        </div>
        <div>{currentUser ? loggedInNavbar() : loggedOutNavbar()}</div>
      </div>
    </nav>
  );
};

export default Navbar;
