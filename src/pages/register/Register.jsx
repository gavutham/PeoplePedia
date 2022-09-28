import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import {apiRequest} from "../../apiRequest"

const Register = () => {
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const username = useRef();
  const navigate = useNavigate();


  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords Don't Match");
    } else {
      const user = {
        username: username.current.value,
        password: password.current.value,
        email: email.current.value,
      };


      try {
        await apiRequest.post("/auth/register", user);
        navigate("/login");
      } catch (e) {
        console.log(e);
      }

    }
  };

  return (
    <div className="Rlogin">
      <div className="RloginWrapper">
        <div className="RloginLeft">
          <h3 className="RloginLogo">PeoplePedia</h3>
          <span className="RloginDesc">
            Connect with friends and the world around you on PeoplePedia.
          </span>
        </div>
        <div className="RloginRight">
          <form className="RloginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              type="text"
              className="RloginInput"
              ref={username}
            />
            <input
              placeholder="Email"
              required
              type="email"
              className="RloginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              required
              type="password"
              className="RloginInput"
              minLength={6}
              ref={password}
            />
            <input
              placeholder="Password Again"
              required
              type="password"
              className="RloginInput"
              ref={passwordAgain}
            />
            <button className="RloginButton" type="submit">
              Sign Up
            </button>
            <button className="RloginRegisterButton">
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Log into Account
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
