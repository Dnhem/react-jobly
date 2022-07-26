import UserContext from "./auth/UserContext";
import { useContext } from "react";

const Welcome = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      <h1>Welcome {currentUser ? currentUser.username : null}!</h1>
      <p>Start exploring jobs</p>
    </div>
  );
};

export default Welcome;
