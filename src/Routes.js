import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./companies/CompanyList";
import CompanyDetails from "./companies/CompanyDetails";
import JobsList from "./jobs/JobsList";
import Profile from "./Profile";
import SignupForm from "./auth/SignupForm";
import LoginForm from "./auth/LoginForm";
import PrivateRoute from "./PrivateRoute";

const Routes = ({ login, signup }) => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <PrivateRoute exact path="/companies">
          <CompanyList />
        </PrivateRoute>

        <PrivateRoute exact path="/companies/:handle">
          <CompanyDetails />
        </PrivateRoute>

        <PrivateRoute exact path="/jobs">
          <JobsList />
        </PrivateRoute>

        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>

        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default Routes;
