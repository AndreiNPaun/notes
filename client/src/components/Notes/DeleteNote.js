import React from 'react';
import Button from '../UI/Button';
import classes from './DeleteNote.module.css';

const DeleteNote = (props) => {
  const purge = async () => {
    try {
      await props.onDeleteNote(props.noteID);
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
