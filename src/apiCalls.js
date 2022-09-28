import { apiRequest } from "./apiRequest";

export const loginCall = async (user, dispatch) => {
  dispatch({ type: "LoginStart" });
  try {
    const res = await apiRequest.post("/auth/login", user);
    dispatch({ type: "LoginSuccess", payload: res.data });
  } catch (e) {
    dispatch({ type: "LoginFailure", payload: e });
  }
};
