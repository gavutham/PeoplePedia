import "./rightbar.css";
import Friend from "../friend/Friend";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Add, Remove, Edit } from "@mui/icons-material";
import { apiRequest } from "../../apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { unfollowUser, followUser } from "../../redux/userRedux";

const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const state = user
    ? currentUser.followings.filter((f) => f === user._id).length === 1
    : "";
  const [followed, setFollowed] = useState(state);
  followed !== state && setFollowed(state);

  

  const handleClick = async () => {
    try {
      if (followed) {
        await apiRequest.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch(unfollowUser(user._id));
      } else {
        await apiRequest.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch(followUser(user._id));
      }
    } catch (e) {
      console.log(e);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
      const getFriends = async () => {
        const res = await apiRequest.get("/users/friends/" + currentUser._id);
        const list = res.data.reverse();
        if (list > 10) {
          setFriends(list.slice(0, 10));
        } else {
          setFriends(list);
        }
      };
      getFriends();
    }, []);

    return (
      <>
        <div className="homeRightbar">
          <h4 className="rightbarTitle">Birthdays</h4>
          <div className="birthdayContainer">
            <img src="assets/gift.png" alt="" className="birthdayImg" />
            <span className="birthdayText">
              <b>Natasha Romanaff</b> and <b>2 other friends</b> have birthday
              today.
            </span>
          </div>
          <h4 className="rightbarTitle">Recent Friends</h4>
          <ul className="rightbarFriendList">
            {friends.map((user) => (
              <Friend user={user} key={user._id} />
            ))}
          </ul>
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {

    const [friends, setFriends] = useState([]);

    useEffect(() => {
      const getFriends = async () => {
        try {
          const friendList = await apiRequest.get("/users/friends/" + user._id);
          setFriends(
            friendList.data.length > 6
              ? friendList.data.slice(0, 6)
              : friendList.data
          );
        } catch (e) {
          console.log(e);
        }
      };
      user ? getFriends() : console.log();
    }, []);
    return (
      <>
        <div className="profilerightbar">
          {user.username !== currentUser.username ? (
            <button className="rightbarFollowButton" onClick={handleClick}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove /> : <Add />}
            </button>
          ) : (
            <button
              className="rightbarEditButton"
              onClick={() => navigate("/edit")}
            >
              Edit Profile
              <Edit />
            </button>
          )}
          <h4 className="rightbarTitle">User Information</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City: </span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From: </span>
              <span className="rightbarInfoValue">{user.from}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship: </span>
              <span className="rightbarInfoValue">
                {user.relationship === 1
                  ? "Single"
                  : user.relationship === 2
                  ? "Married"
                  : "Not given"}
              </span>
            </div>
          </div>
          <h4 className="rightbarTitle">User friends</h4>
          <div className="rightbarFollowings">
            {friends !== [] &&
              friends.map((friend) => (
                <Link
                  style={{ textDecoration: "inherit", color: "inherit" }}
                  to={"/profile/" + friend.username}
                >
                  <div className="rightbarFollowing" key={friend._id}>
                    <img
                      src={
                        friend.profilePicture !== ""
                          ? friend.profilePicture
                          : PF + "nouser.png"
                      }
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">
                      {friend.username}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
