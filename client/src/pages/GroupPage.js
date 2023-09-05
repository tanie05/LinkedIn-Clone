import React, { useContext, useEffect, useState } from 'react'
import baseUrl from '../appConfig'
import axios from 'axios'
import styled from 'styled-components'
import PostCard from '../components/PostCard'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import MembersPopup from '../components/MembersPopup'
const Container = styled.div`
`
const GroupPageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const CoverImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const GroupTitle = styled.h1`
  font-size: 24px;
  color: #333; /* Customize the color */
`;

const GroupDescription = styled.p`
  font-size: 16px;
  color: #666; /* Customize the color */
`;

const PostContainer = styled.div`
`

const SmallNavbar = styled.div`

`

const NavItems = styled(Link)`

`
const Button = styled.button`
`

export default function GroupPage() {

    const currentURL = window.location.href;
    const parts = currentURL.split('/');
    const groupId = parts[parts.length - 1];
    const [group, setGroup] = useState({})
    const [posts, setPosts] = useState([])
    const {userInfo} = useContext(UserContext)
    const [isMember, setIsMember] = useState(null);
    const [members, setMembers] = useState([])


    useEffect(() => {
        axios.get(`${baseUrl}/groups/${groupId}`).then(res => {
          setGroup(res.data)
          const members = res.data.members;
          const isUserMember = members.includes(userInfo._id);
          setIsMember(isUserMember);
          
          setMembers(res.data.members)
          
        })

        axios.get(`${baseUrl}/groups/groupposts/${groupId}`).then(res => setPosts(res.data))
    },[groupId])

    const displayPosts = posts.map(item => {
      return (<PostCard post = {item} key = {item._id} /> )
    })

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => {
      setIsPopupOpen(true);
    };
  
    const closePopup = () => {
      setIsPopupOpen(false);
    };

    function handleLeave(){
      axios.put(`${baseUrl}/groups/removeuser/${groupId}/${userInfo._id}`).then(res => {
        setIsMember(prev => !prev)
        alert('left')
      })
    }
    function handleAdd(){
      axios.put(`${baseUrl}/groups/addmember/${userInfo._id}`, {groupId : groupId}).
      then(res => {
        setIsMember(prev => !prev)
        alert('joined')
      })
    }

  return (
    <Container>
      <GroupPageContainer>
      <CoverImage src={group.coverImg} alt="Group Cover" />
      <GroupTitle>{group.title}</GroupTitle>
      <GroupDescription>{group.description}</GroupDescription>
    </GroupPageContainer>

    <SmallNavbar>
    <Button onClick={openPopup}>Show Members</Button>
      <MembersPopup
        isOpen={isPopupOpen}
        onRequestClose={closePopup}
        groupId  = {groupId}
      />
    {
      isMember ?
      <div>
      <NavItems to = {`/postform?groupId=${groupId}`} >
        Create a Post
      </NavItems>
      <Button onClick={handleLeave}>Leave</Button>
      </div>
      : 
      <Button onClick={handleAdd}>Join</Button>
      
    }
    
    </SmallNavbar>
    
    
    
    
    <PostContainer>
    {displayPosts}
    </PostContainer>
    </Container>
  )
}
