import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ReqAuth = ({ children }) => {
  let location = useLocation();

  let isAuth = useSelector((state) => state.AuthReducer.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
