import "./chatUserSearch.css";

const ChatUserSearch = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="chatUserSearch">
      <div className="chatUserSearchleft">
        <img
          src={user.profilePicture ? user.profilePicture : PF + "nouser.png"}
          alt=""
          className="chatUserSearchImg"
        />
      </div>
      <div className="chatUsersearchright">
        <h3 className="chatUserSearchUsername">{user.username}</h3>
      </div>
    </div>
  );
};

export default ChatUserSearch;
