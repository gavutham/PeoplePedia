import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Messenger from "./pages/messenger/Messenger";
import Logout from "./pages/logout/Logout";
import Edit from "./pages/edit/Edit";
import Search from "./pages/search/Search";

function App() {

  const user = useSelector(state=>state.user)

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user?<Home/>:<Register/>} />
        <Route exact path="/login" element={user? <Navigate to={"/"}/> :<Login/>} />
        <Route exact path="/logout" element={<Logout/>} />
        <Route exact path="/register" element={user? <Navigate to={"/"}/> :<Register/>} />
        <Route exact path="/messenger" element={user? <Messenger/> :<Register/>} />
        <Route exact path="/profile/:username" element={<Profile/>} />
        <Route exact path="/edit" element={<Edit/>} />
        <Route exact path="/search/:username" element={<Search/>} />
      </Routes>
    </Router>
  );
}

export default App;
