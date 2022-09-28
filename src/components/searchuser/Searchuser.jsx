import { useNavigate } from "react-router-dom";
import "./searchuser.css";

const Searchuser = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate = useNavigate()
  return (
    <div className="searchuser" onClick={() => navigate("/profile/"+encodeURIComponent(user.username))}>
        <div className="searchuserRight">
        <img src={user.profilePicture ? user.profilePicture : PF + "nouser.png"} alt="" className="searchuserImg" />
        </div>
        <div className="searchuserLeft">
            <h3 className="searchuserUsername">{user.username}</h3>
            <h4 className="searchuserDesc">{user.desc.length > 70 ? user.desc.slice(0, 70) + "..." : user.desc}</h4>
        </div>
    </div>
  )
}

export default Searchuser