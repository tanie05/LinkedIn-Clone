import React, { useEffect, useState } from 'react'
import baseUrl from '../appConfig'
import axios from 'axios'
import PostCard from '../components/PostCard'
import Navbar from '../components/Navbar'
export default function Feed() {

  const [postList, setPostList] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/posts`).then(res => {
      setPostList(res.data)
    })
  }, [])

  const displayList = postList.map(item => {
    return <PostCard post = {item} key = {item._id} />
  })

  return (
    <div>
      <Navbar />
      {displayList.length === 0 ? <h2>Loading...</h2> : displayList }
    </div>
  )
}
