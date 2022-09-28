import { useParams } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./search.css";
import { useEffect, useState } from "react";
import { apiRequest } from "../../apiRequest";
import Searchuser from "../../components/searchuser/Searchuser";

const Search = () => {
  const { username } = useParams();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await apiRequest.get("/users/all");
        const users = res.data;
        var searchResult = []
        users.forEach(user => {
            if (user.username.replace(/\s/g, '').toLowerCase().includes(username.replace(/\s/g, ''))){
                searchResult.push(user);
            }
        })
        setAllUsers(searchResult);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [username]);



  return (
    <>
      <Topbar />
      <div className="search">
        <Sidebar />
        <div className="searchWrapper">
            <h2 className="searchTitle">Search Results for: {username}</h2>
            {allUsers.map(user => <Searchuser user={user}/>)}
        </div>
      </div>
    </>
  );
};

export default Search;
