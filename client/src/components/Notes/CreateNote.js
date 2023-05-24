import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitNote } from '../../store/action/note';

import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { Center } from '@chakra-ui/react';

const CreateNotes = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token.token);

  const [createNote, setCreateNote] = useState(false);

  const inputNoteRef = useRef();

  const createNoteHandler = () => {
    setCreateNote(true);
  };

  const closeNoteHandler = () => {
    setCreateNote(false);
  };

  const submitNoteHandler = () => {
    const formInput = inputNoteRef.current.value;

    inputNoteRef.current.value = '';

    dispatch(submitNote({ note: formInput, token: token }));

    setCreateNote(false);
  };

  // styles
  const cardStyle = {
    w: '90%',
    maxW: '50rem',
    m: '1rem auto',
  };

  const cardModalStyle = {
    w: '40%',
    maxW: '50rem',
    m: '10rem auto',
  };

  return (
    <>
      <Card cardStyle={cardStyle}>
        {!createNote && (
          <Center>
            <Button m="1rem" onClick={createNoteHandler}>
              Create a New Note
            </Button>
          </Center>
        )}
        {createNote && (
          <Modal
            cardStyle={cardModalStyle}
            modelText="Write your note in the field below"
            inputNoteRef={inputNoteRef}
            onClickCancel={closeNoteHandler}
            onClickSubmit={submitNoteHandler}
          />
        )}
      </Card>
    </>
  );
};

export default CreateNotes;
