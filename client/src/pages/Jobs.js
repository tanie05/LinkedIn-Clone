import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import baseUrl from '../appConfig';
import JobPostCard from '../components/JobPostCard';
import { styled } from 'styled-components';
import JobPostDetails from '../components/JobPostDetails';

const Container = styled.div`
display: flex;
`
const JobList = styled.div`
flex: 2;
`
const JobDetail  = styled.div`
flex: 3;

`
export default function Jobs() {

  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/jobPosts`)
      .then((res) => {
        setJobPosts(res.data);
      })
      .catch((error) => {
        console.error('Error fetching job posts:', error);
      });
  }, []);

  const [detailJob, setDetailJob] = useState("");

  const handleJobCardClick = (itemId) => {
    setDetailJob(itemId);
  };

  const displayList = jobPosts && jobPosts.length > 0 ? (
    jobPosts.map((item) => (
      <div key={item._id} onClick={() => handleJobCardClick(item._id)}>
        <JobPostCard job={item} />
      </div>
    ))
  ) : (
    <h2>Loading...</h2>
  );
  

  return (
    <div>
      <Navbar />
      <Container>
        <JobList>
        {jobPosts.length === 0 ? <h2>Loading...</h2> : displayList}
        </JobList>

        <JobDetail>
          {
            detailJob !== "" && <JobPostDetails id = {detailJob}/>
          }
        
        </JobDetail>
      </Container>
      

    </div>
  );
}
