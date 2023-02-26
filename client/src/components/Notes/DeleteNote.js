import React from 'react';

import Button from '../UI/Button';
import classes from './DeleteNote.module.css';

const DeleteNote = (props) => {
  const purge = async () => {
    try {
      const token = localStorage.getItem('token');
      const noteID = {
        id: props.noteID,
      };

      console.log('props', props);
      // console.log(props.noteID);
      console.log(noteID);
      const response = await fetch('http://localhost:8000/api/notes/delete', {
        method: 'POST',
        body: JSON.stringify(noteID),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <Button className={classes.delete_button} onClick={purge}>
      Delete
    </Button>
  );
};

export default DeleteNote;
