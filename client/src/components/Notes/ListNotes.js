import React, { useState, useEffect, useCallback } from 'react';

import DeleteNote from './DeleteNote';

import classes from './Notes.module.css';
import Card from '../UI/Card';

const ListNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8000/api/notes/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Something went wrong.');
      }

      const data = await response.json();

      const loadedNotes = [];
      const resp = data.response;

      for (const key in resp) {
        loadedNotes.push({
          id: resp[key]._id,
          note: resp[key].note,
        });
      }
      setNotes(loadedNotes);
      console.log(loadedNotes);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchNotesHandler();
  }, [fetchNotesHandler]);

  let content = <p>Found no notes.</p>;

  if (notes.length > 0) {
    content = (
      <ul>
        {notes.map((note) => (
          <div key={note.id} className={classes.list_notes}>
            <li key={note.id}>{note.note}</li>
            <DeleteNote noteID={note.id} />
          </div>
        ))}
      </ul>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <Card className={classes.card}>
      <div className={classes.list}>{content}</div>
    </Card>
  );
};

export default ListNotes;
