import React, { useEffect, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "react-loader-spinner";
import AppBar from "./components/AppBar";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Container from "./components/Container";
import { fetchCurrentUser } from "./redux/auth/auth-operations";
import { getIsRefreshingUser } from "./redux/auth/auth-selectors";

const HomeView = lazy(() => import("./views/HomeView"));
const RegisterView = lazy(() => import("./views/RegisterView"));
const LoginView = lazy(() => import("./views/LoginView"));
const ContactsView = lazy(() => import("./views/ContactsView"));

export default function App() {
  const isRefreshingUser = useSelector(getIsRefreshingUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    !isRefreshingUser && (
      <Container>
        <AppBar />
        <Suspense
          fallback={
            <Loader
              style={{ display: "flex", justifyContent: "center" }}
              type="Circles"
              color="#23b1e7"
              height={100}
              width={100}
              timeout={3000}
            />
          }
        >
          <Switch>
            <PublicRoute exact path="/">
              <HomeView />
            </PublicRoute>
            <PublicRoute path="/register" restricted>
              <RegisterView />
            </PublicRoute>
            <PublicRoute path="/login" restricted redirectTo="/contacts">
              <LoginView />
            </PublicRoute>
            <PrivateRoute path="/contacts" redirectTo="/login">
              <ContactsView />
            </PrivateRoute>
          </Switch>
        </Suspense>

        <ToastContainer autoClose={3000} />
      </Container>
    )
  );
}
