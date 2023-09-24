import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import WorkIcon from '@mui/icons-material/Work';
import ChecklistIcon from '@mui/icons-material/Checklist';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import axios from 'axios';
import baseUrl from '../appConfig'
import {UserContext} from '../UserContext'
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const Container = styled.div`

  background-color: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 16px;
  margin: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
`;

const Title = styled(Link)`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

const DetailsContainer = styled.div``;

const Details = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ApplyButton = styled.button`
  background-color: #0073b1;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: bold;
  border-radius: 20px;

  &:hover {
    background-color: #005a8c;
  }
  svg {
    margin-left: 4px;
  }
`;

const SaveButton = styled.button`
  
  color: #0073b1;
  background-color: #fff;
  border: 1px solid #0073b1;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 20px;

  &:hover {
    border: 2px solid #0073b1;
    background-color: #d3ecfa;
  }

`;
const EditContainer = styled(Link)`
cursor: pointer;
margin-left: auto;
color: black;
`


export default function JobPostCard(props) {

    const {
        _id,
        company,
        title,
        location,
        skills,
        employmentType,
        seniorityLevel,
        applyLink,
        isLocked
    } = props.job;
    const creatorId = props.job.userId;

    const {userInfo} = useContext(UserContext);
    const userId = userInfo ? userInfo._id : null; 
    const savedJobs = userInfo ? userInfo.savedJobs || [] : []; 
    const [isJobLocked, setIsJobLocked] = useState(isLocked);

    const index = savedJobs.indexOf(_id);
    const save = index === -1 ? false : true;

    const [saveState, setSaveState] = useState(save);

    // const skillsList = skills.map(item => {
    //     return (
    //         <ul key={item}>{item}</ul>
    //     )
    // })

    function handleSaveClick() {

        console.log(userId)
        if (!userId) {
            return;
        }
        axios.post(`${baseUrl}/jobPosts/saveJob/${userId}`, { jobId: _id })
            .then(res => {
                setSaveState(prev => !prev)
            })
    }

    function handleApplyClick() {
       if(isJobLocked === true){
        alert('No longer accepting applications!')
        return;
       }
        window.location.href = applyLink; 
    }

    function handleJobLock(){
      axios.put(`${baseUrl}/jobPosts/lock/${_id}`, {isLocked : !isJobLocked}).then(setIsJobLocked(prev=> !prev));

    }

    return (
        
        <Container>
            <Title to = {`/job/${_id}`}>{title}</Title>
            <DetailsContainer>
                <Details style={{ color: "gray" }}>
                    {company} • {location} ({employmentType})
                </Details>
                <Details>
                    <WorkIcon style={{marginRight: "10px"}} /> {seniorityLevel}
                </Details>
                <Details>
                    <ChecklistIcon style={{marginRight: "10px"}} />
                    {/* {skillsList} */}
                    {skills[0]} and {skills.length-1} more.
                </Details>
            </DetailsContainer>
            <ButtonContainer>
              
                <ApplyButton onClick={handleApplyClick} style={{marginRight: "10px"}} >Apply Now <OpenInNewIcon /></ApplyButton>
                {userInfo.flag && creatorId !== userId &&
                  <SaveButton onClick={handleSaveClick}>
                    {saveState ? "Saved" : "Save"}
                </SaveButton>}
                
                
                {
                  
                  userInfo.flag && userInfo._id === creatorId &&
                  <div>
                  <SaveButton onClick={handleJobLock}>
                  {isJobLocked ? "Unlock Job" : "Lock Job"}
                  </SaveButton>
                  <EditContainer to = {`/createjob?jobId=${_id}`} >
                  <EditIcon/>
                  </EditContainer>
                  
                  </div>
                  
                }
                
            </ButtonContainer>
        </Container>

    )
}
