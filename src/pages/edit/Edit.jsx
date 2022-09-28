import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./edit.css";
import Select from "react-select";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { apiRequest } from "../../apiRequest";
import { updateUser } from "../../redux/userRedux";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const user = useSelector((state) => state.user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [desc, setDesc] = useState(user.desc);
  const [city, setCity] = useState(user.city);
  const [from, setFrom] = useState(user.from);
  const [profile, setProfile] = useState(user.profilePicture);
  const [cover, setCover] = useState(user.coverPicture);
  const [relationship, setRelationship] = useState(user.relationship);

  const options = [
    { value: "", label: "" },
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
    { value: "Divorced", label: "Divorced" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("editwrapper").classList.add("uploading");
    if (profile !== user.profilePicture) {
      const fileName = user._id + new Date().getTime() + profile.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, profile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
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
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            var profileUrl = downloadURL;
            if (cover !== user.coverPicture) {
              const fileName = user._id + new Date().getTime() + cover.name;
              const storage = getStorage(app);
              const storageRef = ref(storage, fileName);
              const uploadTask = uploadBytesResumable(storageRef, cover);

              uploadTask.on(
                "state_changed",
                (snapshot) => {
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
                  getDownloadURL(uploadTask.snapshot.ref).then(
                    async (downloadURL) => {
                      const body = {
                        username: username,
                        desc: desc,
                        city: city,
                        from: from,
                        profilePicture: profileUrl,
                        coverPicture: downloadURL,
                        relationship: relationship,
                        userId: user._id,
                      };
                      console.log(body);
                      const updatedUser = await apiRequest.put(
                        "/users/" + user._id,
                        body
                      );
                      console.log(updatedUser.data);
                      const update = await apiRequest.get(
                        "/users/?userId=" + user._id
                      );
                      dispatch(updateUser(update.data));
                      document
                        .getElementById("editwrapper")
                        .classList.remove("uploading");
                      navigate("/profile/" + user.username);
                    }
                  );
                }
              );
            } else {
              const body = {
                username: username,
                desc: desc,
                city: city,
                from: from,
                profilePicture: profileUrl,
                coverPicture: cover,
                relationship: relationship,
                userId: user._id,
              };
              console.log(body);
              const updatedUser = await apiRequest.put(
                "/users/" + user._id,
                body
              );
              console.log(updatedUser.data);
              const update = await apiRequest.get("/users/?userId=" + user._id);
              dispatch(updateUser(update.data));
              document
                .getElementById("editwrapper")
                .classList.remove("uploading");
              navigate("/profile/" + user.username);
            }
          });
        }
      );
    } else if (cover !== user.coverPicture) {
      const fileName = user._id + new Date().getTime() + cover.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, cover);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
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
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const body = {
              username: username,
              desc: desc,
              city: city,
              from: from,
              profilePicture: profile,
              coverPicture: downloadURL,
              relationship: relationship,
              userId: user._id,
            };
            console.log(body);
            const updatedUser = await apiRequest.put(
              "/users/" + user._id,
              body
            );

            console.log(updatedUser.data);
            const update = await apiRequest.get("/users/?userId=" + user._id);
            dispatch(updateUser(update.data));
            document
              .getElementById("editwrapper")
              .classList.remove("uploading");
            navigate("/profile/" + user.username);
          });
        }
      );
    } else {
      const body = {
        username: username,
        desc: desc,
        city: city,
        from: from,
        profilePicture: profile,
        coverPicture: cover,
        relationship: relationship,
        userId: user._id,
      };
      console.log(body);
      const updatedUser = await apiRequest.put("/users/" + user._id, body);
      console.log(updatedUser.data);
      const update = await apiRequest.get("/users/?userId=" + user._id);
      dispatch(updateUser(update.data));
      document.getElementById("editwrapper").classList.remove("uploading");
      navigate("/profile/" + user.username);
    }
  };

  return (
    <>
      <Topbar />
      <div className="edit">
        <Sidebar />
        <div className="EditWrapper" id="editwrapper">
          <div className="ImgContainer">
            <div className="ProfileImgContainer">
              <img
                src={
                  profile
                    ? typeof profile === "object"
                      ? URL.createObjectURL(profile)
                      : profile
                    : PF + "nouser.png"
                }
                alt=""
                className="Profile"
              />
              <input
                style={{ display: "none" }}
                type="file"
                id="profilefile"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setProfile(e.target.files[0])}
              />
              <label htmlFor="profilefile" className="UploadImg">
                Upload New
              </label>
            </div>
            <div className="CoverImgContainer">
              <img
                src={
                  cover
                    ? typeof cover === "object"
                      ? URL.createObjectURL(cover)
                      : cover
                    : PF + "nocover.png"
                }
                alt=""
                className="Cover"
              />
              <input
                style={{ display: "none" }}
                type="file"
                id="coverfile"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setCover(e.target.files[0])}
              />
              <label htmlFor="coverfile" className="UploadImg">
                Upload New
              </label>
            </div>
          </div>
          <div className="InfoContainer">
            <div className="InfoLeft">
              <div className="InfoItem">
                <span className="InfoTitle">Username: </span>
                <input
                  type="text"
                  className="InfoValue"
                  value={username}
                  maxLength={20}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="InfoItem">
                <span className="InfoTitle">About: </span>
                <textarea
                  type="text"
                  className="InfoValue"
                  value={desc}
                  maxLength={200}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
            </div>
            <div className="InfoRight">
              <div className="InfoItem">
                <span className="InfoTitle">City: </span>
                <input
                  type="text"
                  className="InfoValue"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="InfoItem">
                <span className="InfoTitle">From: </span>
                <input
                  type="text"
                  className="InfoValue"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
              <div className="InfoItem">
                <span className="InfoTitle">Relationship: </span>
                {/* <select name="relationship">
                  <option value="Single">Volvo</option>
                  <option value="Married">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select> */}
                <Select
                  value={options.value}
                  options={options}
                  defaultValue={
                    options.filter((o) => o.value === relationship)[0]
                  }
                  onChange={(e) => {
                    setRelationship(e.value);
                  }}
                  className="RelationInfo"
                />
              </div>
            </div>
          </div>
          <div className="saveSection">
            <button className="saveButton" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
