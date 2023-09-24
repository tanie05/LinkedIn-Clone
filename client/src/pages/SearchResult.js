import React, {useEffect, useState} from 'react'
import axios from 'axios'
import baseUrl from '../appConfig'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import PostCard from '../components/PostCard'
import JobPostCard from '../components/JobPostCard'
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom';

const Container = styled.div`
`
const FilterContainer = styled.div`
display: flex;
justify-content: space-around;
border-top: lightgrey solid 0.5px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

`

const FilterButton = styled.button`
background-color: ${props => props.isSelected ? 'green' : 'white'};
padding: 6px 15px;
border-radius: 20px;
border: gray 1.5px solid;
font-size: 18px;
color: ${props => props.isSelected ? 'white' : 'black'};
margin: 10px;


&:hover {
  background-color:  ${props => props.isSelected ? 'green' : 'lightgray'};
  border: gray 2px solid;
  margin: 9px;
}

`
const linkedinBlue = '#0077B5';
const linkedinLightGray = '#F3F6F8';

const GroupContainer = styled.div`
  background-color: #fff; 
  border: 1px solid ${linkedinLightGray};
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px 0;
  display: flex;
`;

const GroupTitle = styled(Link)`
  color: ${linkedinBlue};
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  padding: 0 5px;
`;

export default function SearchResult() {

  const currentURL = window.location.href;
  const parts = currentURL.split('/');
  const search = parts[parts.length - 1];

  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [jobs, setJobs] = useState([])
  const [groups, setGroups] = useState([])


  useEffect(() => {
    axios.post(`${baseUrl}/search`, {search : search}).then((res) => {
      setUsers(res.data.users)
      setGroups(res.data.groups)
      setJobs(res.data.jobPosts)
      setPosts(res.data.posts)
      
    })
  }, [search])

  const [selected, setSelected] = useState({posts: false, people: true, groups: false, jobs: false});

  
  const displayUsers = users.map((user) => {
    return (
      <ProfileCard user = {user} />
    )
  })

  const displayPosts = posts.map((post) => {
    return (
      <PostCard post = {post} />
    )
  })

  const displayJobs = jobs.map((job) => {
    return (
      <JobPostCard job = {job} />
    )
  })


  const displayGroups = groups.map(group => {
    return (
      <GroupContainer key={group._id}>
      <GroupIcon/>
      <GroupTitle to={`/group/${group._id}`}>{group.title}</GroupTitle>
    </GroupContainer>
    )
  })
  
    

  return (
    <Container>
      <Navbar/>
      <FilterContainer>
        <FilterButton 
        isSelected = {selected.people}  
        onClick= {e => setSelected(prev => {return({people: !prev.people, posts: false, jobs:false, groups:false})})}>
        People
        </FilterButton>

        <FilterButton 
        isSelected = {selected.posts}  
        onClick= {e => setSelected(prev => {return({posts: !prev.posts, people: false, jobs:false, groups:false})})}>
        Posts
        </FilterButton>

        <FilterButton 
        isSelected = {selected.groups}  
        onClick= {e => setSelected(prev => {return({groups: !prev.groups, posts: false, jobs:false, people:false})})}>
        Groups
        </FilterButton>

        <FilterButton 
        isSelected = {selected.jobs}  
        onClick= {e => setSelected(prev => {return({jobs: !prev.jobs, posts: false, people:false, groups:false})})}>
        Jobs
        </FilterButton>

        </FilterContainer>

        {selected.people && users && displayUsers}
        {selected.posts && posts && displayPosts}
        {selected.jobs && jobs && displayJobs}
        {selected.groups && groups && displayGroups}

    </Container>
  )
}
