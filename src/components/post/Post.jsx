import "./post.css";
import { MoreVert } from "@mui/icons-material";
import {  useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import { apiRequest } from "../../apiRequest";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const currentUser = useSelector(state=>state.user);

  useEffect(()=>{
    setLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id, post.likes])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await apiRequest.get(
        "/users/?userId=" + post.userId
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likehandler = () => {
    try{
      apiRequest.put("/posts/"+post._id+"/like", {userId: currentUser._id})
    }catch(error){
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              style={{ cursor: "pointer" }}
              to={"/profile/" + user.username}
            >
              <img
                src={user.profilePicture !== ""? user.profilePicture : PF + "nouser.png"}
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postToptight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={PF + "like.png"}
              alt=""
              className="likeIcon"
              onClick={likehandler}
            />
            <img
              src="/assets/heart.png"
              alt=""
              className="likeIcon"
              onClick={likehandler}
            />
            <span className="postlikeCounter">{like} people liked</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
