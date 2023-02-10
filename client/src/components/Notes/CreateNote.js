import React, { useRef } from 'react';

import classes from './Notes.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';

const CreateNotes = () => {
  const inputNoteRef = useRef();

  const noteSubmit = async (note) => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await fetch('http://localhost:8000/api/notes/write', {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const submitNoteHandler = () => {
    const formInput = inputNoteRef.current.value;
    const note = {
      note: formInput,
    };

    noteSubmit(note);

    inputNoteRef.current.value = '';
  };

  return (
    <Card className={classes.card}>
      <form onSubmit={submitNoteHandler}>
        <div className={`${classes.list} ${classes.control}`}>
          <label htmlFor="note">Write a new note!</label>
          <textarea id="note" ref={inputNoteRef}></textarea>
        </div>
        <div className={classes.actions}>
          <Button type="submit">Create Note</Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateNotes;
