import React, { useContext, useEffect, useState } from 'react';
import baseUrl from '../appConfig';
import axios from 'axios';
import styled from 'styled-components';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import MembersPopup from '../components/MembersPopup';
import Navbar from '../components/Navbar';

const Container = styled.div`
  padding: 20px;
`;

const GroupPageContainer = styled.div`
  
  margin: 0 auto;
  padding: 20px;
  background-image: url(${(props) => props.coverImage});
  background-size: cover;
  border-radius: 5px;
  
`;

const CoverImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const GroupTitle = styled.h1`
  font-size: 30px;
  margin: 20px 0;

`;

const GroupDescription = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
`;

const PostContainer = styled.div`
  margin-top: 20px;
`;

const SmallNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    
  }
`;

const NavItems = styled(Link)`
  color: #0077b5;
  text-decoration: none;
  font-weight: bold;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
    padding: 5px;
  }
`;

const Button = styled.button`
  background-color: #0077b5;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
  }

  &:hover {
    background-color: #005b8a;
  }
`;

const ShowMembersButton = styled(Button)`
  margin-right: 10px;
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

export default function GroupPage() {
  const currentURL = window.location.href;
  const parts = currentURL.split('/');
  const groupId = parts[parts.length - 1];
  const [group, setGroup] = useState({});
  const [posts, setPosts] = useState([]);
  const { userInfo } = useContext(UserContext);
  const [isMember, setIsMember] = useState(null);

  useEffect(() => {
    axios.get(`${baseUrl}/groups/${groupId}`).then((res) => {
      setGroup(res.data);
      const members = res.data.members;
      const isUserMember = members.includes(userInfo._id);
      setIsMember(isUserMember);
    });

    axios.get(`${baseUrl}/groups/groupposts/${groupId}`).then((res) => setPosts(res.data));
  }, [groupId]);

  const displayPosts = posts.map((item) => <PostCard post={item} key={item._id} />);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  function handleLeave() {
    axios.put(`${baseUrl}/groups/removeuser/${groupId}/${userInfo._id}`).then((res) => {
      setIsMember(false);
      alert('Left');
    });
  }

  function handleAdd() {
    axios
      .put(`${baseUrl}/groups/addmember/${userInfo._id}`, { groupId: groupId })
      .then((res) => {
        setIsMember(true);
        alert('Joined');
      });
  }


  return (
    <Container>
      <Navbar />
      <GroupPageContainer coverImage={group.coverImg}>
        <GroupTitle>{group.title}</GroupTitle>
        
      </GroupPageContainer>
      {group.description && <h2> Group Description</h2>}
      <GroupDescription>{group.description}</GroupDescription>
      <SmallNavbar>
        <ShowMembersButton onClick={openPopup}>Show Members</ShowMembersButton>
        
        <MembersPopup isOpen={isPopupOpen} onRequestClose={closePopup} groupId={groupId} />
        {isMember ? (
          <div>
            <NavItems to={`/postform?groupId=${groupId}`}>Create a Post</NavItems>
            {group.adminId===userInfo._id && <NavItems to = {`/groupform?groupId=${groupId}`}>Edit Group Settings</NavItems>}
            <Button onClick={handleLeave}>Leave</Button>
          </div>
        ) : (
          <Button onClick={handleAdd}>Join</Button>
        )}
      </SmallNavbar>

      <PostContainer>{displayPosts}</PostContainer>
    </Container>
  );
}
