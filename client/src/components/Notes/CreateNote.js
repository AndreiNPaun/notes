import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { noteActions } from '../../store/slice/note';
import axios from 'axios';

import Card from '../UI/Card';
import Button from '../UI/Button';
import { Center, FormLabel, Textarea, Flex } from '@chakra-ui/react';

const CreateNotes = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token.token);

  const [createNote, setCreateNote] = useState(false);

  const inputNoteRef = useRef();

  const noteSubmit = async (note) => {
    try {
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

  const submitNoteHandler = (event) => {
    event.preventDefault();

    const formInput = inputNoteRef.current.value;
    const note = {
      note: formInput,
    };

    noteSubmit(note);
    inputNoteRef.current.value = '';

    dispatch(noteActions.addNote(note.note));

    setCreateNote(false);
  };

  // styles
  const cardStyle = {
    w: '90%',
    maxW: '50rem',
    m: '1rem auto',
  };

  const labelStyle = {
    mt: '2rem',
    flex: 1,
    color: '#464646',
    mb: '0.5rem',
  };

  const textareaStyling = {
    resize: 'none',
    height: '6rem',
    flex: 3,
    padding: '0.7rem 0.7rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    _focus: {
      borderColor: '#4f005f',
      bg: '#ebdfee',
      boxShadow: 'none',
    },
  };

  return (
    <Card cardStyle={cardStyle}>
      {!createNote && (
        <Center>
          <Button m="1rem" onClick={createNoteHandler}>
            Create a New Note
          </Button>
        </Center>
      )}
      {createNote && (
        <form onSubmit={submitNoteHandler}>
          <Flex mt="1rem" p="2rem" alignItems="stretch" flexDirection="row">
            <FormLabel htmlFor="note" {...labelStyle}>
              Write a new note!
            </FormLabel>
            <Textarea
              id="note"
              ref={inputNoteRef}
              {...textareaStyling}
            ></Textarea>
          </Flex>
          <Center>
            <Button m="0.5rem" type="submit">
              Create Note
            </Button>
            <Button m="0.5rem" onClick={closeNoteHandler}>
              Close Form
            </Button>
          </Center>
        </form>
      )}
    </Card>
  );
};

export default CreateNotes;
