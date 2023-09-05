import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import baseUrl from '../appConfig';
import axios from 'axios';
import styled from 'styled-components';


const PopupModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  background-color: white;
`;

const PopupHeader = styled.h2`
  font-size: 20px;
  color: #0077B5;
  margin-bottom: 10px;
`;

const MemberList = styled.ul`
  
`;

const MemberListItem = styled.li`
  font-size: 16px;
  margin-bottom: 5px;
`;

const CloseButton = styled.button`
  background-color: #0077B5; 
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;

`;

function MembersPopup(props) {
  const { isOpen, onRequestClose, groupId } = props;
  const [members, setMembers] = useState([]);
  const [membersName, setMembersName] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/groups/${groupId}`).then((res) => {
      setMembers(res.data.members);

      
      const fetchMemberNames = async () => {
        const memberNamePromises = res.data.members.map(async (memberId) => {
          const response = await axios.get(`${baseUrl}/users/${memberId}`);
          return response.data.name;
        });

        const memberNames = await Promise.all(memberNamePromises);
        setMembersName(memberNames);
      };

      fetchMemberNames();
    });
  }, [groupId]);

  return (
    <PopupModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Members Pop-up"
    >
      <PopupHeader>Members</PopupHeader>
      {membersName.length > 0 && (
        <MemberList>
          {membersName.map((member, index) => (
            <MemberListItem key={index}>{member}</MemberListItem>
          ))}
        </MemberList>
      )}
      <CloseButton onClick={onRequestClose}>Close</CloseButton>
    </PopupModal>
  );
}

export default MembersPopup;
