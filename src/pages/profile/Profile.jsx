import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiRequest } from "../../apiRequest";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);
  const username = useParams().username;



  useEffect(() => {
    const fetchUser = async () => {
      const res = await apiRequest.get(
        "/users/?username=" +
          encodeURIComponent(username)
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        {user !== null && (
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  className="profileCoverImg"
                  src={
                    user.coverPicture
                      ? user.coverPicture
                      : PF + "nocover.png"
                  }
                  alt=""
                />
                <img
                  className="profileUserImg"
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : PF + "nouser.png"
                  }
                  alt=""
                />
              </div>
              <div className="profileInfo">
                <h4 className="profileInfoName">{user?.username}</h4>
                <span className="profileInfoDesc">{user?.desc}</span>
              </div>
            </div>
            <div className="profileRightBottom">
            <div className="profileRightBottomFeed"><Feed username={username} /></div>
            <div className="profileRightBottomRight"><Rightbar user={user} /></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
