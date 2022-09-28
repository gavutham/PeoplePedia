import { useEffect, useState } from "react";
import { apiRequest } from "../../apiRequest";
import "./chatOnline.css";

const ChatOnline = ({ onlineUsers, setCurrentChat, currentUser }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await apiRequest.get("/users/friends/" + currentUser);
      setFriends(res.data);
    };
    getFriends();
  }, [currentUser]);

  useEffect(() => {
    // console.log(friends.filter((f) => onlineUsers.includes(f._id)));
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await apiRequest.get(
        "/conversations/find/" + currentUser + "/" + user._id
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      <h2 className="chatOnlineTitle">Online Friends</h2>
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              src={o.profilePicture ? o.profilePicture : PF + "nouser.png"}
              alt=""
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.username}</span>
        </div>
      ))}
      {onlineUsers.length === 0 && <h3 className="noOnlineUsers">No online users</h3> }
    </div>
  );
};

export default ChatOnline;
