import React from "react";
import Group from "./pages/Group";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Jobs from "./pages/Jobs";
import { UserContextProvider } from "./UserContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GroupList from './pages/GroupList'
import CreateJobPost from "./pages/CreateJobPost";
import Feed from './pages/Feed'
import PostForm from "./pages/PostForm";
import ProfileForm from "./pages/ProfileForm";


function App() {
  return (
    <UserContextProvider>
      <Router>
      <Routes>
       
       <Route path="/groups" element={<GroupList />}/>
       <Route path="/profile" element={<Profile />}/>
       <Route path="/jobs" element = {<Jobs/>}/>
       <Route path="/register" element = {<Register/>}/>
       <Route path="/login" element = {<Login/>} />
       <Route path="/group" element = {<Group/>} />
       <Route path="/createjob" element = {<CreateJobPost/>}/>
       <Route path="/" element = {<Feed/>} />
       <Route path="/postform" element = {<PostForm/>} />
       <Route path="/updateuser" element = { <ProfileForm/>} />

      </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
