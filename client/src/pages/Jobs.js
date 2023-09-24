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
const FilterContainer = styled.div`
`
const FilterForm = styled.form`
`
const FilterInput = styled.input`
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FilterInputSelect = styled.select`
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FilterSubmit = styled.input`
  padding: 5px 10px;
  background-color: #0A66C2;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
`;
export default function Jobs() {

  const [jobPosts, setJobPosts] = useState([]);
  const [displayJobList, setDisplayJobList] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/jobPosts`)
      .then((res) => {
        setJobPosts(res.data);
        setDisplayJobList(res.data);
      })
      .catch((error) => {
        console.error('Error fetching job posts:', error);
      });
  }, []);

  const [detailJob, setDetailJob] = useState("");

  const handleJobCardClick = (itemId) => {
    setDetailJob(itemId);
  };
  
  const [location, setLocation] = useState("");
  const [seniorityLevel, setSeniorityLevel] = useState("");
  const [type, setType] = useState("");

  const displayList = displayJobList && displayJobList.length > 0 ? (
    displayJobList.map((item) => (
      <div key={item._id} onClick={() => handleJobCardClick(item._id)}>
        <JobPostCard job={item} />
      </div>
    ))
  ) : (
    (location || type || seniorityLevel) ? <h2>No result</h2> :
    <h2>Loading...</h2>
  );

  

  const handleFilterSubmit = (event) => {
    event.preventDefault();

    if(!location && !type && !seniorityLevel){
      setDisplayJobList(jobPosts)
    }

    // console.log(location)
    // console.log(type)
    // console.log(seniorityLevel)
    
    const updatedList = jobPosts.filter(job => {

    const locationMatch = !location || job.location.toLowerCase().includes(location.toLowerCase());
    const seniorityMatch = !seniorityLevel || job.seniorityLevel.toLowerCase() === seniorityLevel.toLowerCase();
    const typeMatch = !type || job.employmentType.toLowerCase() === type.toLowerCase();

    return locationMatch && seniorityMatch && typeMatch;

    })
    setDisplayJobList(updatedList);

  }

  


  
  

  return (
    <div>
      <Navbar />

      <FilterContainer>
        <FilterForm onSubmit={handleFilterSubmit}>

        <FilterInput type='text' placeholder='Location' value={location} onChange={e => setLocation(e.target.value)}/>
          
        <FilterInputSelect value={seniorityLevel} onChange={e => setSeniorityLevel(e.target.value)}>
        <option value="">Seniority Level</option>

        <option value="Entry level">Entry level</option>
        <option value="Mid-Senior level">Mid-Senior level</option>
        <option value="Senior level">Senior level</option>
        <option value="Executive">Executive</option>

        </FilterInputSelect>

        <FilterInputSelect value={type} onChange={e => setType(e.target.value)}>
        <option value="">Employment Type</option>
      
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Freelance">Freelance</option>
        <option value="Internship">Internship</option>

        </FilterInputSelect>
        
        <FilterSubmit type='submit'/>

        </FilterForm>
      </FilterContainer>

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
