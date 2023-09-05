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
import { Link } from 'react-router-dom';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
`;

const Container = styled.div`
  
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 16px;
  margin: 20px;
  width: 500px;
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
`
const Name = styled.div`
  font-weight: bold;
  font-size: 15px;
  color: #333;
`;

const Title = styled.div`
  
  font-size: 20px;
  margin-top: 8px;
  color: #555;
`;

const Description = styled.div`
  font-size: 1rem;
  margin-top: 8px;
  color: #333;
`;

const MediaContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const MediaItem = styled.img`
  max-width: 100%;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  margin-right: 16px;
  width: 500px;
  height: 500px;
  object-fit: cover;
`;

const NextIcon = styled(NavigateNextIcon)`
  margin-left: -50px;
    background-color: whitesmoke;
    border-radius: 50%;
    cursor: pointer;
  
`;

const IconContainer = styled.div`
 cursor: pointer;
 margin-left: auto;

`
const EditContainer = styled(Link)`
cursor: pointer;
margin-left: auto;
color: black;
`


export default function PostCard(props) {
  const {_id, title, description, userId, media } = props.post;
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [email, setEmail] = useState("")
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



  return (
    <CenteredContainer>
<Container>

<ProfileContainer>
  
  {profile ? <ProfileImage src={profile}/> : <AccountIcon/>}
<Name>
  {name}
  <div style={{fontSize: "12px", fontWeight: "lighter"}}>{email}</div>
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
