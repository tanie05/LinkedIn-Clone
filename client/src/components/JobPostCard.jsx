import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import WorkIcon from '@mui/icons-material/Work';
import ChecklistIcon from '@mui/icons-material/Checklist';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import axios from 'axios';
import baseUrl from '../appConfig'
import {UserContext} from '../UserContext'

const Container = styled.div`

  background-color: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 16px;
  margin: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
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
    } = props.job;
    const creatorId = props.job.userId;

    const {userInfo} = useContext(UserContext);
    const userId = userInfo ? userInfo._id : null; 
    const savedJobs = userInfo ? userInfo.savedJobs || [] : []; 

    const index = savedJobs.indexOf(_id);
    const save = index === -1 ? false : true;

    const [saveState, setSaveState] = useState(save);

    const skillsList = skills.map(item => {
        return (
            <p key={item}>{item}</p>
        )
    })

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
        window.location.href = applyLink; 
    }

    return (
        
        <Container>
            <Title>{title}</Title>
            <DetailsContainer>
                <Details style={{ color: "gray" }}>
                    {company} • {location} ({employmentType})
                </Details>
                <Details>
                    <WorkIcon style={{marginRight: "10px"}} /> {seniorityLevel}
                </Details>
                <Details>
                    <ChecklistIcon style={{marginRight: "10px"}} />
                    {skillsList}
                </Details>
            </DetailsContainer>
            <ButtonContainer>
                <ApplyButton onClick={handleApplyClick} style={{marginRight: "10px"}} >Apply Now <OpenInNewIcon /></ApplyButton>
                { creatorId !== userId &&
                  <SaveButton onClick={handleSaveClick}>
                    {saveState ? "Saved" : "Save"}
                </SaveButton>}
            </ButtonContainer>
        </Container>

    )
}
