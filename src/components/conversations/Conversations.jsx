import { useEffect } from "react";
import { useState } from "react";
import { apiRequest } from "../../apiRequest";
import "./conversations.css";

const Conversations = ({ currentUser, conversation}) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await apiRequest.get("/users/?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation.members]);

  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture ? user?.profilePicture : PF + "nouser.png"
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversations;
