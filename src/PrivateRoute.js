import { useContext } from "react";
import UserContext from "./auth/UserContext";
import { Route, Redirect } from "react-router-dom";

/** Higher order wrapper component subscribing to UserContext to validate if user is logged in before allowing access to sensitive routes. */

const PrivateRoute = ({ children, exact, path }) => {
  debugger;
  const { currentUser } = useContext(UserContext);

  if (!currentUser) return <Redirect to="/login" />;

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
};

export default PrivateRoute;
