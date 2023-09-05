import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import baseUrl from '../appConfig';
import axios from 'axios'

function MembersPopup(props) {
  
  const { isOpen, onRequestClose, groupId } = props;
  const [members, setMembers] = useState([]);
  const [membersName, setMembersName] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/groups/${groupId}`).then((res) => {
      setMembers(res.data.members);
  
      // Fetch names of members based on their IDs
      const fetchMemberNames = async () => {
        const memberNamePromises = res.data.members.map((memberId) => {
          return axios.get(`${baseUrl}/users/${memberId}`).then((response) => {
            return response.data.name; // Assuming the API returns a 'name' property
          });
        });
  
        const memberNames = await Promise.all(memberNamePromises);
        setMembersName(memberNames);
      };
  
      fetchMemberNames();
    });
  }, [groupId]);
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Members Pop-up"
    >
      <h2>Members</h2>
      {membersName.length > 0 && <ul>
        {membersName.map((member) => (
          <li>{member}</li>
        ))}
      </ul>}
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default MembersPopup;
