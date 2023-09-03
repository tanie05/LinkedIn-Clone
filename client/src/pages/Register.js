import React, { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom'
import styled from "styled-components"
import { Link } from 'react-router-dom'
import baseUrl from '../appConfig'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f2ef; /* Light gray background */
`;
const Main = styled.div`
background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
    
`
const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`
const RegisterForm = styled.form`

`
const RegisterInput = styled.input`
 width: 90%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;

`
const Linking = styled(Link)`
text-align: center;
  display: block;
  margin-top: 10px;
  color: #0077b5; /* LinkedIn blue */

  &:hover {
    text-decoration: underline;
  }
`
const Button = styled.input`
 width: 100%;
  padding: 10px;
  background-color: #0077b5; /* LinkedIn blue */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #005f99; /* Darker blue on hover */
  }
`
export default function Register() {

  const [user,setUser] = useState({ name: "", email: "", password: ""})
  const {setUserInfo} = useContext(UserContext)
  const [redirect, setRedirect] = useState(false);
 
  
  function handleEmailChange(e){
    setUser(prevUser => {
      return {...prevUser, email: e.target.value}
    })
  }
  function handlePasswordChange(e){
    setUser(prevUser => {
      return {...prevUser, password: e.target.value}
    })
  }
  function handleNameChange(e){
    setUser(prevUser => {
      return {...prevUser, name: e.target.value}
    })
  }
  async function registerUser(event) {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/auth/register`, user);
      if (response.data.success) {
        setUserInfo({ ...response.data.user, flag: true });
        const value = { ...response.data.user, flag: true };
        localStorage.setItem('user', JSON.stringify(value));
        setRedirect(true);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert(err);
    }
  }
  
  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <Container>
      <Main>
      <Heading>Enter register details</Heading>
      <br/>
      <RegisterForm onSubmit={registerUser}>
      <RegisterInput type='text' placeholder='Name' value={user.name} onChange={(e) => handleNameChange(e)}/>
        <br/>

        <RegisterInput type='email' placeholder='Email' value={user.email} onChange={(e) => handleEmailChange(e)}/>
        <br/>

        <RegisterInput type='password' placeholder='Password' value={user.password} onChange={(e) => handlePasswordChange(e)} />
        <br/>
        
        
        <Button type="submit" value="Register"/>
      </RegisterForm>
      <Linking to = {'/login'} >LogIn</Linking>
      </Main>
    </Container>
  )
}