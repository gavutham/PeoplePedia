import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userRedux";

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logoutUser());
  return <Navigate to={"/"} />;
};

export default Logout;
