import React, { useEffect, useState } from 'react'
import baseUrl from '../appConfig'
import axios from 'axios'
import styled from 'styled-components'

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

export default function GroupPage() {
    const currentURL = window.location.href;

    const parts = currentURL.split('/');
    const groupId = parts[parts.length - 1];
    const [group, setGroup] = useState({})
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(`${baseUrl}/groups/${groupId}`).then(res => console.log(res.data))

        axios.get(`${baseUrl}/groups/groupposts/${groupId}`).then(res => console.log(res.data))
    },[])

  return (
    <Container>
      <GroupPageContainer>
      <CoverImage src={group.coverImg} alt="Group Cover" />
      <GroupTitle>{group.title}</GroupTitle>
      <GroupDescription>{group.description}</GroupDescription>
    </GroupPageContainer>
    </Container>
  )
}
