import React from "react";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Jobs from "./pages/Jobs";
import { UserContextProvider } from "./UserContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateJobPost from "./pages/CreateJobPost";
import Feed from './pages/Feed'
import PostForm from "./pages/PostForm";
import ProfileForm from "./pages/ProfileForm";
import Grouplist from "./pages/GroupList";
import GroupPage from "./pages/GroupPage";
import GroupEditor from "./pages/GroupEditor";
function App() {
  return (
    <UserContextProvider>
      <Router>
      <Routes>
       
       
       <Route path="/profile" element={<Profile />}/>
       <Route path="/jobs" element = {<Jobs/>}/>
       <Route path="/register" element = {<Register/>}/>
       <Route path="/login" element = {<Login/>} />
       <Route path="/groups" element = {<Grouplist/>} />
       <Route path="/createjob" element = {<CreateJobPost/>}/>
       <Route path="/" element = {<Feed/>} />
       <Route path="/postform" element = {<PostForm/>} />
       <Route path="/updateuser" element = { <ProfileForm/>} />
       <Route path = "/group/:groupId" element = {<GroupPage/>} />
       <Route path="/editgroup" element = {<GroupEditor/>}/>
      </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
