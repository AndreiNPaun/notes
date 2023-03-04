import { HStack } from '@chakra-ui/react';
import React from 'react';
import Button from '../UI/Button';

const DeleteNote = (props) => {
  const purge = async () => {
    try {
      await props.onDeleteNote(props.noteID);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <HStack>
      <Button fontSize="md" borderRadius="8px" onClick={purge}>
        Delete
      </Button>
    </HStack>
  );
};

export default DeleteNote;
