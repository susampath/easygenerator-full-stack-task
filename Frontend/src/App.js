import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./helpers/routes";

import { AuthProvider } from "./containers/auth/AuthProvider";
import UnAuthenticatedWrapper from "./containers/auth/authenticationWrappers/UnAuthenticated";
import AuthenticatedWrapper from "./containers/auth/authenticationWrappers/Authenticated";

import Loading from "./components/common/loading/Loading";
import ToastAlerts from "./components/common/toastAlerts/ToastAlerts";
import Layout from "./components/layout/Layout";

const SignUp = React.lazy(() => import("./containers/auth/signUp/SignUp"));
const Login = React.lazy(() => import("./containers/auth/login/Login"));
const Home = React.lazy(() => import("./containers/home/Home"));
const NotFoundPage = React.lazy(() =>
  import("./components/auth/notFoundPage/NotFoundPage")
);

function App() {
  return (
    <div>
      <AuthProvider>
        <UnAuthenticatedWrapper>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                path={routes.UN_AUTHENTICATED.LOGIN.PATH}
                element={<Login />}
              />
              <Route
                path={routes.UN_AUTHENTICATED.REGISTER.PATH}
                element={<SignUp />}
              />
              <Route path={routes.ROOT.PATH} element={<Login />} />
              <Route path={routes.ALL.PATH} element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </UnAuthenticatedWrapper>
        <AuthenticatedWrapper>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path={routes.ROOT.PATH} element={<Layout />}>
                <Route path={routes.ROOT.PATH} element={<Home />} />
              </Route>
              <Route path={routes.ALL.PATH} element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AuthenticatedWrapper>
        <ToastAlerts />
      </AuthProvider>
    </div>
  );
}

export default App;
