import React, { useContext } from "react";
import styled from 'styled-components'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UserContext } from "../UserContext";
import LogoutIcon from '@mui/icons-material/Logout';
import { Navigate } from "react-router-dom";
import { useState } from "react";
import LoginIcon from '@mui/icons-material/Login';

const Container = styled.div`
  display: flex;
  align-items: center;
    
`
const Icons = styled.div`
    display: flex;
    flex: 3;
    

`

const Icon = styled(Link)`
    text-decoration: none;
    color: black;
    display: flex;
    flex-direction: column;
    margin: 0px 10px;
    align-items: center;
    cursor: pointer;
    
    
    
`
const IconHeading = styled.p`
    padding: 0;
    font-size: 12px;
`

const LogoAndSearch = styled.div`
  display: flex;
  color: #0A66C2;
  align-self: left;
  width: 30%;
  flex: 2;
  align-content: center;
  

  
`
const Logo = styled(Link)`
    font-size: 30px;
    margin: 0px 10px;
    color: #0A66C2;
    text-decoration: none;
    

`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #0A66C2;
  border-radius: 5px;
  padding: 5px;
  
`

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  color: white;
  outline: none;
  margin-left: 5px;
  width: 300px; 
`
const LinkedInLogo = styled(LinkedInIcon)`
font-size: 50px !important;
  
`
export default function Navbar() {
  
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [Redirect, setRedirect] = useState(false);

  function handleClick() {
    setUserInfo({
        flag: false
    })
    localStorage.clear()
    setRedirect(true)

  }

  if(Redirect){
    <Navigate to = {'/'}/>
  }

  return (
    <Container>
        <LogoAndSearch>
            <Logo to={'/'}>
            <LinkedInLogo/>
            </Logo>
        
        {/* <SearchContainer>
        <SearchIcon />
        <SearchInput type="text" placeholder="Search" />
        </SearchContainer> */}
        </LogoAndSearch>
        
        <Icons>
            <Icon to = {'/'}>
                <HomeIcon style={{ fontSize: "30px", important: "true" }} />
                <IconHeading>Home</IconHeading>
            </Icon>
             { userInfo.flag && 
                <Icon to = {'/groups'}>
                <GroupIcon style={{ fontSize: "30px", important: "true" }}/>
                <IconHeading>Groups</IconHeading>
            </Icon>} 
            <Icon to = {'/jobs'}>
                <WorkIcon style={{ fontSize: "30px", important: "true" }}/>
                <IconHeading>Jobs</IconHeading>
            </Icon>
            { userInfo.flag &&
              <Icon to = {`/user/${userInfo._id}`}>
                <AccountCircleIcon style={{ fontSize: "30px", important: "true" }}/>
                <IconHeading>{userInfo.name}</IconHeading>
            </Icon>}
            { userInfo.flag && <Icon>
            <LogoutIcon onClick = {handleClick} style={{ fontSize: "30px", important: "true" }}/>
            <IconHeading>Logout</IconHeading>
            </Icon>}
            {userInfo.flag===false &&
            <Icon to = {'/login'}>
            <LoginIcon style={{ fontSize: "30px", important: "true" }}/>
            <IconHeading>Login</IconHeading>
            </Icon>
            }
            
        </Icons>
        
    </Container>
  )
}
