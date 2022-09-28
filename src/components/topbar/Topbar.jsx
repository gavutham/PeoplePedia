import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Topbar = () => {
  const user = useSelector((state) => state.user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [search, setSearch] = useState("");
  const navigate = useNavigate()

  return (
    <div className="topBarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">PeoplePedia</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <a style={{cursor: "pointer"}} className="" onClick={(e)=>{search.length !== 0 && navigate("/search/"+search)}}>
            <Search className="searchIcon" />
          </a>
          <input
            placeholder="Search for friends and posts"
            className="searchInput"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <Link
            to={"/profile/" + user.username}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span className="topbarLink">Timeline</span>
          </Link>
          <Link
            to={"/logout"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span className="topbarLink">Logout</span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem mobNotVis">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link
              to={"/messenger"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Chat />
            </Link>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem mobNotVis">
            <Notifications />
            <span className="topbarIconBadge">3</span>
          </div>
          <Link to={"/profile/" + encodeURIComponent(user.username)}>
            <img
              src={
                user.profilePicture !== ""
                  ? user.profilePicture
                  : PF + "nouser.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
