import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "./auth/UserContext";

const Navbar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  const loggedInNavbar = () => {
    return (
      <nav>
        <NavLink to="/companies">Companies</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/" onClick={logout}>
          Log out {currentUser.username}
        </NavLink>
      </nav>
    );
  };

  const loggedOutNavbar = () => {
    return (
      <nav>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </nav>
    );
  };

  return (
    <nav>
      <Link to="/">Jobly</Link>
      {currentUser ? loggedInNavbar() : loggedOutNavbar()}
    </nav>
  );
};

export default Navbar;
