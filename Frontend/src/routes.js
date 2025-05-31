import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Illustration = React.lazy(
  () => import("./views/illustration/Illustration")
);
const policyCalculation = React.lazy(
  () => import("./views/policyCalculation/PolicyCalculation")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/", name: "Dashboard", element: Dashboard },
  { path: "/illustration", name: "Illustration", element: Illustration },
  {
    path: "/policyCalculation",
    name: "policyCalculation",
    element: policyCalculation,
  },
];

export default routes;
