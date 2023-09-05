import React, { useContext } from "react";
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
import GroupForm from './pages/GroupForm'

import { UserContext } from "./UserContext";
import Saved from "./pages/Saved";
function App() {

  const {userInfo} = useContext(UserContext)
  return (
    <UserContextProvider>
      <Router>
      <Routes>
       
      <Route path="/login" element = {<Login/>} />
      <Route path="/register" element = {<Register/>}/>

      <Route path="/user/:userId" element={<Profile />}/>
      <Route path="/updateuser" element = { <ProfileForm/>} />
      <Route path="/saved/user/:userId" element = {<Saved/>}/>

      <Route path = "/group/:groupId" element = {<GroupPage/>} />
      <Route path="/groups" element = {<Grouplist/>} />
      <Route path = "/groupform" element = {<GroupForm/>}/>
      
      <Route path="/jobs" element = {<Jobs/>}/>
      <Route path="/createjob" element = {<CreateJobPost/>}/>

      <Route path="/" element = {<Feed/> } />
      <Route path="/postform" element = {<PostForm/>} />

       
       
       

       
       
      </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
