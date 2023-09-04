import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const EditButton = styled.button`
  background-color: #0077B5; /* LinkedIn blue */
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

const EditGroupForm = ({ groupId, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImg, setCoverImg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to update the group with the provided data
      const response = await axios.put(`/api/groups/${groupId}`, {
        title,
        description,
        coverImg,
      });

      // Assuming the API responds with the updated group data
      const updatedGroup = response.data;

      // Call the onSave callback to update the group data in the parent component
      onSave(updatedGroup);

      // Clear the form fields
      setTitle('');
      setDescription('');
      setCoverImg('');
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="coverImg">Cover Image URL:</label>
        <input
          type="text"
          id="coverImg"
          value={coverImg}
          onChange={(e) => setCoverImg(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

const GroupEditor = ({ groupId, onGroupUpdate }) => {
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = (updatedGroup) => {
    setEditing(false);
    onGroupUpdate(updatedGroup);
  };

  return (
    <div>
      {editing ? (
        <EditGroupForm groupId={groupId} onSave={handleSave} />
      ) : (
        <EditButton onClick={handleEditClick}>Edit Group</EditButton>
      )}
    </div>
  );
};

export default GroupEditor;
