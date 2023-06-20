//import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

  let token = localStorage.getItem("loginToken");


  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
