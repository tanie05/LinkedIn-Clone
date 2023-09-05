import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { UserContext } from '../UserContext';
import baseUrl from '../appConfig';
import styled from 'styled-components';
import { Link, Navigate } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';


const linkedinBlue = '#0077B5';
const linkedinLightGray = '#F3F6F8';

const Container = styled.div`
  background-color: #fff; 
  border: 1px solid ${linkedinLightGray};
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px 0;
  display: flex;
`;

const Title = styled(Link)`
  color: ${linkedinBlue};
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  padding: 0 5px;
`;

const LoadingContainer = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  color: #555;
`;

const PageContainer = styled.div`
  padding: 20px;
`;

const FormContainer = styled.div`
`
const Form = styled.form`
`
const Input = styled.input`
`
const Button = styled.input`
`
export default function Grouplist() {

  const [groups, setGroups] = useState([]);
  const { userInfo } = useContext(UserContext);
  const userId = userInfo._id;
  const [newGroupId, setNewGroupId] = useState("");


  useEffect(() => {
    axios.get(`${baseUrl}/users/grouplist/${userId}`).then((res) => setGroups(res.data));
  }, []);

  const displayList = groups.map((item) => (
    <Container key={item._id}>
      <GroupIcon/>
      <Title to={`/group/${item._id}`}>{item.title}</Title>
    </Container>
  ));
  
  return (
    <div>
      <Navbar />
      {/* <FormContainer>
      <h2>Find a Group</h2>
        <Form onSubmit={handleJoinGroup}>
          <Input type='text' placeholder='Group Id' value = {newGroupId} onChange={e => setNewGroupId(e.target.value)} />
          <Button type='submit' value = 'submit' />
        </Form>
      </FormContainer> */}
      <PageContainer>
        {displayList.length === 0 ? (
          <LoadingContainer>Loading...</LoadingContainer>
        ) : (
          displayList
        )}
      </PageContainer>
    </div>
  );
}
