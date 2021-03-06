// to - toRoute, Component - Component to be rendered

import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { selectUser } from "../features/userSlice";

// if user is logged in then that component can be shown else /login
const AuthRoute = ({ path, Component }) => {
  const user = useSelector(selectUser);
  return (
    <Route
      render={() =>
        user ? (
          <Route path={path}>
            <Component />
          </Route>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AuthRoute;
