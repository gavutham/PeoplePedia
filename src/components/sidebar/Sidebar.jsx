import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircle,
  Groups,
  School,
  Bookmark,
  Help,
  Event,
  Work,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";

const Sidebar = () => {
  const  user  = useSelector(state => state.user)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <li className="sidebarListItem">
              <img src={user.profilePicture?user.profilePicture:PF+"nouser.png"} alt="" className="sidebarIcon Img" />
              <span className="sidebarListItemText" style={{fontWeight:"500"}}>{user.username}</span>
            </li>
          </Link>
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
          </Link>
          <Link to={"/messenger"} style={{ textDecoration: "none", color: "inherit" }}>
            <li className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </li>
          </Link>
          <li className="sidebarListItem">
            <PlayCircle className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Groups className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <Help className="sidebarIcon" />
            <span className="sidebarListItemText">Help</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <Work className="sidebarIcon" />
            <span className="sidebarListItemText">Works</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        {/* <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default Sidebar;
