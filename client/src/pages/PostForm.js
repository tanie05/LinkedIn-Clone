import React, {useContext,useEffect,useState} from 'react'
import styled from 'styled-components'
import { UserContext } from '../UserContext'
import axios from 'axios'
import baseUrl from '../appConfig'
import { Navigate } from 'react-router-dom'
import { useLocation} from 'react-router-dom';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.input`
  width: 100%;
  padding: 10px;
  background-color: #0077b5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #005f99;
  }
`;

export default function PostForm() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const postId = queryParams.get('postId');

    const [post, setPost] = useState({})
    useEffect(() => {
      if(postId){
        axios.get(`${baseUrl}/posts/${postId}`).then(res => {
          setPost(res.data)
          setTitle(res.data.title)
          setDescription(res.data.description)
          setImages(res.data.media)
  
        })
      }
      

    },[postId])
    
    const handleImageUpload = (e) => {
      const uploadedImages = e.target.files;
      const imagePreviews = [];
  
      for (let i = 0; i < uploadedImages.length; i++) {
        const file = uploadedImages[i];
        const reader = new FileReader();
  
        reader.onload = (event) => {

          imagePreviews.push(event.target.result);
  
          if (imagePreviews.length === uploadedImages.length) {
            setImages(imagePreviews);
          }
        };
  
        reader.readAsDataURL(file);
      }
    };

    const [redirect, setRedirect] = useState(false)
    const {userInfo} = useContext(UserContext);
    

    function handleSubmit(event) {
        event.preventDefault();
        const userId = userInfo._id
        
        const post = {title : title, description : description, media : images, belongToGroup : false}
         
        if(postId){
          
          const updatedPost = {...post, title : title, description : description, media : images}
          axios.put(`${baseUrl}/posts/updatepost/${postId}`, updatedPost).then(res => setRedirect(true))

        }else{
          axios.post(`${baseUrl}/posts/${userId}`, post)
          .then(res => {
              setRedirect(true)
          })
          .catch(err => console.log(err))
        }
         
    }

    if(redirect){
        return <Navigate to={'/'} />
    }


  return (
    <Container>
        <Heading>{postId ? "Edit post" : "Create a post"}</Heading>
        <Form onSubmit={handleSubmit}>
            <Input type='text' placeholder='Title' value = {title} onChange={(e) => setTitle(e.target.value)} />
            <br/>
            <Input type='text' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <br/>
            <Input type="file" onChange={handleImageUpload} multiple accept="image/*" />
            <Button value= 'submit' type = 'submit' />
        </Form>
        
    </Container>
  )
}
