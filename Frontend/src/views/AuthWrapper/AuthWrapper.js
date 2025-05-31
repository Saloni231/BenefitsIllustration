import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSpinner } from "@coreui/react";
import { useAuth } from "../../auth/useAuth";
import DefaultLayout from "../../layout/DefaultLayout";

const AuthWrapper = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth(); // true | false | null

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    );
  }

  return <DefaultLayout />;
};

export default AuthWrapper;
