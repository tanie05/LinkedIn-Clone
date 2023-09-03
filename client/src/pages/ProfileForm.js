import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import { UserContext } from '../UserContext'
import axios from 'axios'
import baseUrl from '../appConfig'
import { Navigate } from 'react-router-dom'


const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.input`
  background-color: #0077b5;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #005b8f;
  }
`;

const ImageInputContainer = styled.div`
  margin-bottom: 15px;
`;

const SubHeading = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

export default function ProfileForm() {
  
  const {userInfo, setUserInfo} = useContext(UserContext);
  const [name, setName] = useState(userInfo.name)
  const [profile, setProfile] = useState(userInfo.profileImg)
  const [cover, setCover] = useState(userInfo.coverImg)
  const [redirect, setRedirect] = useState(false);
  const userId = userInfo._id;


  const handleProfileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCover(reader.result)
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleUserUpdate(event) {
    event.preventDefault();
    const data = {
      name: name,
      profileImg: profile,
      coverImg: cover
    };
    console.log(data)
    try {
        
      const res = await axios.put(`${baseUrl}/users/edituser/${userId}`, data);
      const value = {
        ...userInfo,
        name: name,
        profileImg: profile,
        coverImg: cover,
        flag: true
      };
      setUserInfo(value);
      setRedirect(true);
    } catch (error) {
      console.error(error);
    }
  }
  if(redirect){
    return <Navigate to = { "/profile"} />
  }

  return (
    <div style={{display: "flex",  justifyContent: "center"}}>
        <Container>
        <Heading>Complete profile</Heading>
        <Form onSubmit={handleUserUpdate}>
            <Input type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)}/>
            <ImageInputContainer>
                <SubHeading>Profile Image : </SubHeading>
                <Input
                type="file"
                onChange={handleProfileChange}
            />
            </ImageInputContainer>
            <ImageInputContainer>
                <SubHeading>Cover Image : </SubHeading>
                <Input
                type="file"
                onChange={handleCoverChange}
            />
            </ImageInputContainer>
            <Button type='submit' value='Submit' />
        </Form>
    </Container>
    </div>
    
  )
}
