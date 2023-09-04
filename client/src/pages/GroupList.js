import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { UserContext } from '../UserContext'
import baseUrl from '../appConfig'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const linkedinBlue = '#0077B5';
const linkedinLightGray = '#F3F6F8';

const Container = styled.div`
  background-color: ${linkedinLightGray};
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled(Link)`
  color: ${linkedinBlue};
  text-decoration: none;
  font-weight: bold;
`;
export default function Grouplist() {

  const [groups, setGroups] = useState([])
  const {userInfo} = useContext(UserContext)
  const userId = userInfo._id;

  useEffect(() => {
    axios.get(`${baseUrl}/users//grouplist/${userId}`)
    .then(res => setGroups(res.data))
  }, [])

  const displayList = groups.map(item => {
    return (
      <Container>
        <Title to={`/group/${item._id}`}>{item.title}</Title>
      </Container>
    )
  })

  return (
    <div>
      <Navbar/>

      { 
      displayList.length === 0 ? <h3>Loading</h3> : 
      displayList
      }
      
    </div>
  )
}
