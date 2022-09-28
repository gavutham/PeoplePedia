import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { useState } from "react";
import { useRef } from "react";
import { apiRequest } from "../../apiRequest";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";

const Share = () => {
  const user = useSelector((state) => state.user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (desc.current.value.length < 1 && !file) {
      alert("Please enter some description to create a new post.");
    } else {
      document.getElementById("share").classList.add("uploading");
      const newPost = {
        userId: user._id,
        desc: desc.current.value,
      };

      // if (file) {
      //   const data = new FormData();
      //   const fileName = user._id + Date.now() + file.name;
      //   file.originalName = fileName;
      //   data.append("file", file);
      //   newPost.img = fileName;
      //   try {
      //     await apiRequest.post("/upload/" + fileName, data);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // }

      if (file) {
        const fileName = user._id + new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                console.log();
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              newPost.img = downloadURL;
              try {
                const post = async () => {
                  await apiRequest.post("/posts", newPost);
                  setFile(null);
                  desc.current.value = "";
                  document
                    .getElementById("share")
                    .classList.remove("uploading");
                  window.location.reload();
                };
                post();
              } catch (err) {
                console.log(err);
              }
            });
          }
        );
      } else {
        try {
          console.log(newPost);
          await apiRequest.post("/posts", newPost);
          setFile(null);
          desc.current.value = "";
          document.getElementById("share").classList.remove("uploading");
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <div className="share" id="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.profilePicture ? user.profilePicture : PF + "nouser.png"}
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + " ?"}
            type="text"
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            
              <div className="shareOption shareformobile">
                <Label htmlColor="blue" className="shareIcon" />
                <span className="shareOptionText">Tag</span>
              </div>
              <div className="shareOption shareformobile">
                <Room htmlColor="green" className="shareIcon" />
                <span className="shareOptionText">Location</span>
              </div>
              <div className="shareOption shareformobile">
                <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                <span className="shareOptionText">Feelings</span>
              </div>
            
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
