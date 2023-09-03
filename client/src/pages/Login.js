import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import axios from 'axios'
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
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const LoginForm = styled.form``;

const LoginInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

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
`;

const Linking = styled(Link)`
  text-align: center;
  display: block;
  margin-top: 10px;
  color: #0077b5; /* LinkedIn blue */

  &:hover {
    text-decoration: underline;
  }
`;


export default function Login() {

  const [user,setUser] = useState({name: "" , password: "", email: "" })
  const { setUserInfo} = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  function handleNameChange(e) {
    setUser((prevUser) => {
      return {...prevUser, name: e.target.value}
    })
  }
  function handlePasswordChange(e) {
    setUser((prevUser) => {
      return {...prevUser, password: e.target.value}
    })
  }
  function handleEmailChange(e) {
    setUser((prevUser) => {
      return {...prevUser, email: e.target.value}
    })
  }

  function loginFunction(event){
    event.preventDefault();

    axios.post(`${baseUrl}/auth/login`, user)
    .then((response) => {
      
        setUserInfo({...response.data.user, flag: true})
        const value = {...response.data.user, flag: true};
        localStorage.setItem('user', JSON.stringify(value))
        setRedirect(true)
    
    })
    .catch((err) => alert(err))
  }
  if(redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <Container>
      <Main>
      <Heading >Enter login details</Heading>
      <LoginForm onSubmit={loginFunction}>
        <LoginInput type='text' placeholder='Name' value={user.name} onChange={(e) => handleNameChange(e)}/>
        <br/>
        <LoginInput type='email' placeholder='Email' value={user.email} onChange={(e) => handleEmailChange(e)}/>
        <br/>
        <LoginInput type='password' placeholder='Password' value={user.password} onChange={(e) => handlePasswordChange(e)}/>
        <br/>
        
        <Button type='submit' value="Login" />
        <br/>
      </LoginForm>
      <Linking to = {'/register'} >Create an account</Linking>
      </Main>
    </Container>
  )
}
