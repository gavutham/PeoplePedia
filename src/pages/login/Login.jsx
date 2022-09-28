import { useRef } from "react";
import "./login.css";
import { loginCall } from "../../redux/apiCall";
import { CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const isFetching = useSelector((state) => state.isFetching);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">PeoplePedia</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on PeoplePedia.
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleClick} className="loginBox">
            <input
              required
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength={4}
              className="loginInput"
              ref={password}
            />

            <button className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
