import React, {useContext, useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import {UserContext} from '../UserContext'
import axios from 'axios';
import baseUrl from '../appConfig';
import styled from 'styled-components'
import PostCard from '../components/PostCard';
import JobPostCard from '../components/JobPostCard'
import { Link } from 'react-router-dom';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const CoverImage = styled.img`
  width: 100%;
  max-height: 250px;
  object-fit: cover;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 3px solid #fff;
  border-radius: 50%;
  margin-top: -75px;
`;

const UserName = styled.h1`
  font-size: 24px;
  margin-top: 20px;
  color: #333;
`;

const UserEmail = styled.p`
  font-size: 18px;
  color: #666;
  margin-top: 10px;
`;

const CenterContainer = styled.div`
display: flex;
  justify-content: center;
`
const Container = styled.div`
width: 50%;

`
const SmallNavbar = styled.div`
`

const NavItems = styled(Link)`
`
const About = styled.p`
`
const keyExpertise = styled.p`
`


export default function Profile() {
  const currentURL = window.location.href;
  const parts = currentURL.split('/');
  const userId = parts[parts.length - 1];
  
  const {userInfo} = useContext(UserContext);
  const [user,setUser] = useState({});

  

  const [createdPosts, setCreatedPosts] = useState([])
  const [createdJobs, setCreatedJobs] = useState([])

  
  useEffect(() => {
    axios.get(`${baseUrl}/users/${userId}`)
    .then(res => {
      setUser(res.data)
    })

    axios.get(`${baseUrl}/posts/created/${userId}`)
    .then(res => {
      setCreatedPosts(res.data)
    })

    axios.get(`${baseUrl}/jobPosts/created/${userId}`)
    .then(res => {
      setCreatedJobs(res.data)
    })

  },[userId])

  

  const displayCreatedPosts = createdPosts.map(item => {
    return (<PostCard post = {item} key = {item._id} /> )
  })

  const displayCreatedJobs = createdJobs.map(item => {
    return (<JobPostCard job = {item} key = {item._id}/> )
  })
  const mergedCreatedArray = [...displayCreatedJobs, ...displayCreatedPosts];

  return (
    <div style={{backgroundColor: "#f0f0f0"}}>
    <Navbar/>
      
    <ProfileContainer>
      <CoverImage src={user.coverImg} alt="Cover" />
      <ProfileImage src={user.profileImg} alt="Profile" />
      <UserName>{user.name}</UserName>
      <UserEmail>{user.email}</UserEmail>
      <About>{user.about}</About>
      <keyExpertise>{user.keyExpertise}</keyExpertise>

    </ProfileContainer>
    {
      userId === userInfo._id &&
      <SmallNavbar>
      <NavItems to = {'/postform'}>Create a post</NavItems>
      <NavItems to = {'/createjob'} >Create a job</NavItems>
      <NavItems to = {'/groupform'}>Create a group</NavItems>
      <NavItems to = {'/updateuser'}>Update Profile</NavItems>
      <NavItems to = {`/saved/user/${userInfo._id}`} >Saved</NavItems>

      </SmallNavbar>

    }

    
 <CenterContainer>
 <Container>
{mergedCreatedArray}
 </Container>
 </CenterContainer>






  
    </div>
  )
}
