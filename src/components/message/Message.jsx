import "./message.css";
import {format} from "timeago.js";
import { useSelector } from "react-redux";

const Message = ({message, own, oppo}) => {
  const user = useSelector(state => state.user)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img src={own ? user.profilePicture: (oppo.profilePicture ? oppo.profilePicture: PF+"nouser.png")} alt="" className="messageImg" />
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">
           {format(message.createdAt)}
        </div>
    </div>
  )
}

export default Message