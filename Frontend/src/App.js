import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import React from "react";

const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const PolicyCalculation = React.lazy(
  () => import("./views/pages/policyCalculation/PolicyCalculation")
);
const Illustration = React.lazy(
  () => import("./views/pages/illustration/Illustration")
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/policyCalculation" element={<PolicyCalculation />} />
        <Route path="/Illustration" element={<Illustration />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
