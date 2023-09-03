import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import baseUrl from '../appConfig'
import axios from 'axios'
import JobPostCard from './JobPostCard'

const JobDetailsContainer = styled.div`
  
  background-color: #ffffff;
  padding: 16px;
  margin: 20px;
  
  
`

const DetailsHeading = styled.h1`

`
const SubHeading = styled.h3`
`
const Description = styled.p`
`
const DetailsContainer = styled.div`
  margin-top: 20px;

  ul {
    list-style: disc;
    margin-left: 20px;
  }

  p {
    margin: 0;
  }
`;


export default function JobPostDetails(props) {

  const jobId = props.id;
  const [job,setJob] = useState({});

  useEffect(() => {
    axios.get(`${baseUrl}/jobPosts/${jobId}`)
    .then((res) => setJob(res.data));
  }, [jobId])

 
  return (
    <div>
      {job._id && <JobPostCard job = {job}  />}
      <JobDetailsContainer>
                <DetailsHeading>
                    About the Job
                </DetailsHeading>
                <SubHeading>
                    Description
                </SubHeading>
                <Description>
                    {job.description}
                </Description>

                <SubHeading>
                    Requirements 
                </SubHeading>
                <DetailsContainer>
          <ul>
            {job.requirements &&
              job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
          </ul>
        </DetailsContainer>

                <SubHeading>
                   Skills
                </SubHeading>
                <DetailsContainer>
          <ul>
            {job.skills &&
              job.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
          </ul>
        </DetailsContainer>
            </JobDetailsContainer>

    </div>
  )
}
