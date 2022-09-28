import {  useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import {useSelector} from "react-redux"
import { apiRequest } from "../../apiRequest";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState(false);
  const user = useSelector(state=> state.user);


  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await apiRequest.get(
            "/posts/profile/" + encodeURIComponent(username)
          )
        : await apiRequest.get("/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPost();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(user.username === username || typeof username === "undefined") && (
          <Share />
        )}
        {posts && posts.map((post) => <Post post={post} key={post._id}/>)}
      </div>
    </div>
  );
};

export default Feed;
