import React from 'react'
import { useState, useContext } from 'react';
import styled from 'styled-components'
import { UserContext } from '../UserContext'
import axios from 'axios'
import baseUrl from '../appConfig';
import AddIcon from '@mui/icons-material/Add';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f2ef; 
`;

const Main = styled.div`
  margin: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 500px;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const JobPostForm = styled.form``;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
const SmallForm = styled.div`
display: flex;
`

const SmallButton  = styled(AddIcon)`
cursor: pointer;
`
const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Option = styled.option``;

export default function CreateJobPost() {
  const {userInfo} = useContext(UserContext);
  const userId = userInfo._id;
  const [job,setJob] = useState({company: "", title: "", location: "", description: "", 
  requirements: [], skills: [], employmentType: "", seniorityLevel: "", applyLink: "" })

  const [requirement, setRequirement] = useState("")
  const [skill, setSkill] = useState("")
  
  function handleCompanyChange(e){
    setJob(prevValue => {
        return {...prevValue, company: e.target.value}
    })
  }
  function handleTitleChange(e){
    setJob(prevValue => {
        return {...prevValue, title: e.target.value}
    })
  }

  function handleApplyLinkChange(e){
    setJob(prevValue => {
        return {...prevValue, applyLink: e.target.value}
    })
  }

  function handleDescriptionChange(e){
    setJob(prevValue => {
        return {...prevValue, description: e.target.value}
    }) 
  }
  function handleLocationChange(e){
    setJob(prevValue => {
        return {...prevValue, location: e.target.value}
    })
  }
  function handleTypeChange(e){
    setJob(prevValue => {
        return {...prevValue, employmentType: e.target.value}
    })
  }
  function handleSeniorityLevelOptionChange(e){
    setJob(prevValue => {
        return {...prevValue, seniorityLevel: e.target.value}
    }) 
  }


  function addRequirement(event){
    event.preventDefault()
    var newRequirements = job.requirements
    newRequirements.push(requirement)

    setJob((prevValue) => {
        return {...prevValue, requirements: newRequirements };
    })
    setRequirement("");
  }
  function addSkills(event){
    event.preventDefault()
    var newSkills = job.skills
    newSkills.push(skill)

    setJob((prevValue) => {
        return {...prevValue, skills: newSkills };
    })
    setSkill("");
  }

  function handleJobSubmit(event){
    event.preventDefault();
    console.log(userId)
    console.log(job)
    axios.post(`${baseUrl}/jobPosts/${userId}`, job)
    .then(console.log('eert'))
  }

  return (
    <Container>
        <Main>
        <Heading>
            Create Job Post
        </Heading>
        <JobPostForm onSubmit={handleJobSubmit}>
        <Input type='text' placeholder='Company Name' value={job.company} onChange={(e) => handleCompanyChange(e)}/>
        <br/>
        <Input type='text' placeholder='Title' value={job.title} onChange={(e) => handleTitleChange(e)}/>
        <br/>
        <Input type='text' placeholder='Description' value={job.description} onChange={(e) => handleDescriptionChange(e)}/>
        <br/>
        <Input type='text' placeholder='Location' value={job.location} onChange={(e) => handleLocationChange(e)}/>
        <br/>
        <Input type='text' placeholder='Apply Link' value={job.applyLink} onChange={(e) => handleApplyLinkChange(e)}/>
        <br/>

        <SmallForm>
        <Input  type='text' placeholder='Add a requirement' value={requirement} onChange={(e) => setRequirement(e.target.value)}/>
        <br/>
        <SmallButton  type='button' onClick={addRequirement}><AddIcon/></SmallButton>
        </SmallForm>
       
        <div>
            <ul>
              {job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>
        
        <SmallForm>
        <Input type='text' placeholder='Add a skill' value={skill} onChange={(e) => setSkill(e.target.value)}/>
        <br/>
        <SmallButton type='button' onClick={addSkills}><AddIcon/></SmallButton>
        </SmallForm>
        
        
        <div>
            <ul>
              {job.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

        <Select value={job.employmentType} onChange={(e) => handleTypeChange(e)}>
        <Option value="Full-time">Full-time</Option>
        <Option value="Part-time">Part-time</Option>
        <Option value="Internship">Internship</Option>
        <Option value="Freelance">Freelance</Option>
        <Option value="Contract">Contract</Option>
        </Select>
        <br/>

        <Select value={job.seniorityLevel} onChange={(e) => handleSeniorityLevelOptionChange(e)}>
        <Option value="Entry level">Entry level</Option>
        <Option value="Mid-Senior level">Mid-Senior level</Option>
        <Option value="Senior level">Senior level</Option>
        <Option value="Executive">Executive</Option>
        </Select>
        <br/>
        <Button type='submit' value="submit"/>

        </JobPostForm>
        </Main>
    </Container>
  )
}
