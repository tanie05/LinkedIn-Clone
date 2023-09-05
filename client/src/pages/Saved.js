import React, { useEffect, useState } from 'react'
import baseUrl from '../appConfig'
import axios from 'axios'
import PostCard from '../components/PostCard';
import JobPostCard from '../components/JobPostCard';
import Navbar from '../components/Navbar';

export default function Saved() {

  const currentURL = window.location.href;
  const parts = currentURL.split('/');
  const userId = parts[parts.length - 1];
  
  const [savedPosts, setSavedPosts] = useState([])
  const [savedJobs, setSavedJobs] = useState([])

  useEffect(()=> {
    axios.get(`${baseUrl}/posts/saved/${userId}`).then(res => setSavedPosts(res.data))

    axios.get(`${baseUrl}/jobPosts/saved/${userId}`).then(res => setSavedJobs(res.data))

  },[userId])

  const displaySavedPosts = savedPosts.map(item => {
    return (<PostCard post = {item} key = {item._id} /> )
  })

  const displaySavedJobs = savedJobs.map(item => {
    return (<JobPostCard job = {item} key = {item._id}/> )
  })
  const mergedCreatedArray = [...displaySavedJobs, ...displaySavedPosts];


  return (
    <div>
        <Navbar/>
      {mergedCreatedArray.length===0 ? <h3>No saved Items</h3> : mergedCreatedArray}
    </div>
  )
}
