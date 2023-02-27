import React, { useState, useRef } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

import classes from './Notes.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';

const CreateNotes = () => {
  const [createNote, setCreateNote] = useState(false);

  const inputNoteRef = useRef();

  const noteSubmit = async (note) => {
    try {
      const token = cookie.get('token');
      const response = await axios.post(
        'http://localhost:8000/api/notes/write',
        note,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createNoteHandler = () => {
    setCreateNote(true);
  };

  const closeNoteHandler = () => {
    setCreateNote(false);
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
      {!createNote && (
        <div className={classes.actions}>
          <Button
            extraClassName={classes.add_notes_button}
            onClick={createNoteHandler}
          >
            Create a New Note
          </Button>
        </div>
      )}
      {createNote && (
        <form onSubmit={submitNoteHandler}>
          <div className={`${classes.list} ${classes.control}`}>
            <label htmlFor="note">Write a new note!</label>
            <textarea id="note" ref={inputNoteRef}></textarea>
          </div>
          <div className={classes.actions}>
            <Button
              extraClassName={classes.add_notes_button__spacing}
              type="submit"
            >
              Create Note
            </Button>
            <Button
              extraClassName={classes.add_notes_button__spacing}
              onClick={closeNoteHandler}
            >
              Close Form
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default CreateNotes;
