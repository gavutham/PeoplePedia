import { Link } from "react-router-dom";
import "./friend.css";

const Friend = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Link
      to={"/profile/" + user.username}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            src={
              user.profilePicture ? user.profilePicture : PF + "nouser.png"
            }
            alt=""
            className="rightbarProfileImg"
          />
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </Link>
  );
};

export default Friend;
