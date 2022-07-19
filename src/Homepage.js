import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./Homepage.css";
import UserContext from "./auth/UserContext";

const Homepage = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <h1>Jobly</h1>
      <p>Where winners find jobs.</p>
      {currentUser ? (
        <h2>Welcome back {currentUser.firstName}!</h2>
      ) : (
        <div>
          <div className="Homepage-button-container">
            <Button variant="contained">
              <Link to="/login" className="Homepage-button">
                Log in
              </Link>
            </Button>
          </div>

          <div className="Homepage-button-container">
            <Button variant="contained">
              <Link to="/signup" className="Homepage-button">
                Sign up
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
