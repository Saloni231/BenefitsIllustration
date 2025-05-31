import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CSpinner } from "@coreui/react";
import "./scss/style.scss";

const Login = React.lazy(() => import("./views/login/Login"));
const Register = React.lazy(() => import("./views/register/Register"));
const AuthWrapper = React.lazy(() => import("./views/AuthWrapper/AuthWrapper")); // Use AuthWrapper

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<AuthWrapper />} />{" "}
          {/* Home Calls AuthWrapper */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
