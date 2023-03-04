import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

import DeleteNote from './DeleteNote';
import Card from '../UI/Card';
import { Flex, UnorderedList, ListItem, Box } from '@chakra-ui/react';

const ListNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = cookie.get('token');

      const response = await axios.get('http://localhost:8000/api/notes/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.data;
      const loadedNotes = [];
      const resp = data.response;

      for (const key in resp) {
        loadedNotes.push({
          id: resp[key]._id,
          note: resp[key].note,
        });
      }
      setNotes(loadedNotes);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchNotesHandler();
  }, [fetchNotesHandler]);

  const deleteNoteHandler = async (noteId) => {
    try {
      const token = cookie.get('token');
      await axios.post(
        `http://localhost:8000/api/notes/delete`,
        { id: noteId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      setError(error.message);
    }
  };

  let content = <p>Found no notes.</p>;

  if (notes.length > 0) {
    content = (
      <UnorderedList listStyleType="none">
        {notes.map((note) => (
          <Flex
            key={note.id}
            justifyContent="space-between"
            borderBottom="solid #464646"
            p="0.75rem"
          >
            <ListItem m="1rem" color="#464646" key={note.id}>
              {note.note}
            </ListItem>
            <DeleteNote noteID={note.id} onDeleteNote={deleteNoteHandler} />
          </Flex>
        ))}
      </UnorderedList>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  // styles
  const cardStyle = {
    w: '90%',
    maxW: '50rem',
    m: '1rem auto',
  };

  return (
    <Card cardStyle={cardStyle}>
      <Box m="2rem auto" p="2rem" h="auto">
        {content}
      </Box>
    </Card>
  );
};

export default ListNotes;
