import React, {useContext, useState, useEffect} from 'react'
import styled from 'styled-components'
import {UserContext} from '../UserContext'
import {Navigate} from 'react-router-dom'
import baseUrl from '../appConfig'
import axios from 'axios'
import { useLocation} from 'react-router-dom';


const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 5px;
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
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.input`
  background-color: #0073b1;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function GroupForm() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [coverImg, setCoverImg] = useState("")
    const [redirect, setRedirect] = useState(false);
    const {userInfo} = useContext(UserContext)
    const [group, setGroup] = useState({})


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const groupId = queryParams.get('groupId');

    useEffect(() => {
        if(groupId){
            axios.get(`${baseUrl}/groups/${groupId}`).then((res) => {
                setGroup(res.data)
                setTitle(res.data.title)
                setDescription(res.data.description)
                setCoverImg(res.data.coverImg)

              })
        }
        
      }, [groupId])

    
        const handleImageUpload = (event) => {
            const file = event.target.files[0];
        
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setCoverImg(reader.result);
              };
              reader.readAsDataURL(file);
            }
          };
    

    function handleGroupSubmit(event){
        event.preventDefault();

        
        const newGroup = {
            title : title, 
            description : description,
            coverImg : coverImg
        }

        if(groupId){
            axios.put(`${baseUrl}/groups/editgroup/${groupId}`, newGroup)
            .then(setRedirect(true))
        }else{
        axios.post(`${baseUrl}/groups/${userInfo._id}`, 
        newGroup)
        .then(setRedirect(true))
        }
        
        


    }

    if(redirect){
        return (<Navigate to = {'/groups'} />)
    }


  return (
    <Container>
        <Heading>{groupId ? "Edit group" : "Create a group" }</Heading>
        <Form onSubmit={handleGroupSubmit}>
            <Input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input type = 'text' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
            <Input type="file" onChange={handleImageUpload} />
            <Button type = 'submit' value = 'Submit'/>
        </Form>
    </Container>
  )
}
