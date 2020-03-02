import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./_services/userService/auth";

export const UnProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
            //alert("Already sign in, Logout first")
          return (
            <Redirect
              to={{
                pathname: "/dashbord",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};