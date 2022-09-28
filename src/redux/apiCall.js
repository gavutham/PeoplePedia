import { apiRequest } from "../apiRequest";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const loginCall = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await apiRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (e) {
    dispatch(loginFailure());
  }
};
