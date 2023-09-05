import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import baseUrl from '../appConfig';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { UserContext } from '../UserContext';
import EditIcon from '@mui/icons-material/Edit';
import { Link, Navigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';


const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 20px 0;
`;

const Container = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 20px;
  width: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const AccountIcon = styled(AccountCircleIcon)`
  margin-right: 10px;
  font-size: 50px !important;
`;

const Name = styled(Link)`
  font-weight: bold;
  font-size: 16px;
  color: black;
  text-decoration: none;
`;

const SubTitle = styled.div`
  font-size: 14px;
  color: #333;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
  color: #333;
`;

const Description = styled.div`
  font-size: 16px;
  margin-top: 8px;
  color: #555;
`;

const MediaContainer = styled.div`
  margin-top: 16px;
  position: relative;
`;

const MediaItem = styled.img`
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  height: auto;
`;

const NextIcon = styled(NavigateNextIcon)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background-color: #0073b1; 
  border-radius: 50%;
  padding: 8px;
  color: #fff;
  cursor: pointer;
`;

const IconContainer = styled.div`
  cursor: pointer;
  margin-left: auto;
`;

const EditContainer = styled(Link)`
  cursor: pointer;
  margin-left: auto;
  color: black;
`;

export default function PostCard(props) {

  const {_id, title, description, userId, media } = props.post;
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [email, setEmail] = useState("")
  const [keyExpertise, setKeyExpertise] = useState("")
  const {userInfo} = useContext(UserContext)
  const [isSaved, setIsSaved] = useState(false)
  const postId = _id;

  useEffect(() => {
    axios.get(`${baseUrl}/users/${userInfo._id}`)
    .then(res => {
      
      const savedArray = res.data.savedPosts;
      const postIdExists = savedArray.includes(postId);
      setIsSaved(postIdExists)    
       
    })
    .catch(err => console.log(err))

  }, [])

  useEffect(() => {
    axios
      .get(`${baseUrl}/users/otheruser/${userId}`)
      .then((res) => {
        setName(res.data.name);
        setProfile(res.data.profileImg);
        setEmail(res.data.email)
        setKeyExpertise(res.data.keyExpertise)
      })
      .catch((err) => {
        console.log(err)
      });
  }, [userId]); 

  const handleNextButtonClick = () => {

    setCurrentMediaIndex((prevIndex) =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );
  };

  function handleSave(){
    axios.post(`${baseUrl}/posts/savePost/${userInfo._id}`, {postId : postId})
    .then(res => setIsSaved(prev => !prev))
    .catch(err => console.log(err))
  }
  const [redirect, setRedirect] = useState(false)
  function handleDelete(){
    axios.delete(`${baseUrl}/posts/${postId}`).then(res => {
      setRedirect(true)
    })
  }

  if(redirect){
    return <Navigate to = {'/'} />
  }



  return (
    <CenteredContainer>
<Container>

<ProfileContainer>
  
  {profile ? <ProfileImage src={profile}/> : <AccountIcon/>}
<Name to = {`/user/${userId}`}>
  {name}
  <div style={{fontSize: "12px", fontWeight: "lighter"}}>{keyExpertise}</div>
</Name>
  

<IconContainer onClick={handleSave}>
{
    userInfo._id !== userId &&
    (isSaved
    ? 
    <BookmarkIcon/>
    :
    <BookmarkBorderIcon/>)
}
</IconContainer>

<EditContainer to = {`/postform?postId=${_id}`} >
{
  userInfo._id === userId &&
  <EditIcon/>
}
</EditContainer>
{
  userInfo._id === userId &&
  <DeleteIcon onClick = {handleDelete} style={{cursor: "pointer"}}/>
}
</ProfileContainer>
<Title>{title}</Title>
<Description>{description}</Description>

 {
  media.length>0 && 
  <MediaContainer>
  <MediaItem
    src={media[currentMediaIndex]}
    alt={`Media ${currentMediaIndex + 1}`}
  />
  {media.length>1 && <NextIcon onClick={handleNextButtonClick} />}
  </MediaContainer>
}
</Container>
    </CenteredContainer>
    
  );
}
