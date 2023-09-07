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
  background-color: #fff; /* White background for the profile section */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 20px;
`;

const CoverImage = styled.img`
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  border-radius: 8px 8px 0 0; /* Rounded corners for the top of the cover image */
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

const About = styled.p`
  font-size: 16px;
  color: #333;
  margin-top: 10px;
`;

const KeyExpertise = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 10px;
`;

const ActionLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

const ActionLink = styled(Link)`
  font-size: 16px;
  color: #0073b1; /* LinkedIn blue */
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  
`;

const Container = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const ExpertiseBox = styled.div`
  background-color: #fff; /* White background for the box */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin: 20px;
`;

const AboutBox = styled.div`
  background-color: #fff; /* White background for the box */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin: 20px ;

`;

const Heading = styled.h2`
  font-size: 20px;
  color: #333;
`;

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
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <Navbar />
      <ProfileContainer>
        <CoverImage src={user.coverImg} alt="Cover" />
        <ProfileImage src={user.profileImg} alt="Profile" />
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
        
        
        
        {userId === userInfo._id && (
          <ActionLinks>
            <ActionLink to="/postform">Create a post</ActionLink>
            <ActionLink to="/createjob">Create a job</ActionLink>
            <ActionLink to="/groupform">Create a group</ActionLink>
            <ActionLink to="/updateuser">Update Profile</ActionLink>
            <ActionLink to={`/saved/user/${userInfo._id}`}>Saved</ActionLink>
          </ActionLinks>
        )}
      </ProfileContainer>

      <ExpertiseBox>
          <Heading>Key Expertise</Heading>
          <KeyExpertise>{user.keyExpertise}</KeyExpertise>
        </ExpertiseBox>

        <AboutBox>
          <Heading>About</Heading>
          <About>{user.about}</About>
        </AboutBox>

      <CenterContainer>
        <Container>{mergedCreatedArray}</Container>
      </CenterContainer>
    </div>
  );
}
