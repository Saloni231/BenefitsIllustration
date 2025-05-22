import { cilCalculator, cilChart, cilHouse, cilWalk } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavItem } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/",
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "policyCalculation",
    to: "/policyCalculation",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Illustration",
    to: "/Illustration",
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Login/Register",
    to: "/login",
    icon: <CIcon icon={cilWalk} customClassName="nav-icon" />,
  },
];

export default _nav;
