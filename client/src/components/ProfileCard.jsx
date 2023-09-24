import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Container = styled.div`
    display: flex;
    margin: 10px;
    padding: 20px;
    border: 0.5px solid gray;
    border-radius: 10px;
`

const Profile = styled.img`
    height: 100px;
    width: 100px;
    border-radius: 50%;

`
const DescriptionContainer = styled.div`
margin: 10px;
`
const Name = styled(Link)`
font-size: 30px;
font-weight: bold;
cursor: pointer;
color: black;
text-decoration: none;

`
const Expertise = styled.div`
color: gray;
`

export default function ProfileCard(props) {

  const {profileImg, name, keyExpertise, _id} = props.user;

  return (
    <Container>
        <Profile src= {profileImg}/>
        <DescriptionContainer>
            <Name to = {`/user/${_id}`}>{name}</Name>
            <Expertise>{keyExpertise}</Expertise>
        </DescriptionContainer>
    </Container>
  )
}
