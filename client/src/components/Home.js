import React, { useEffect, useState } from 'react';

import CreateNotes from './Notes/CreateNote';
import ListNotes from './Notes/ListNotes';

import Card from './UI/Card';
import classes from './Home.module.css';
import Button from './UI/Button';

const Home = () => {
  const token = localStorage.getItem('token');

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(
    <Card className={classes.form}>
      <h1>Welcome to Notes</h1>
      <p>lorem20</p>
    </Card>
  );

  useEffect(() => {
    if (token) {
      setContent(
        <>
          <CreateNotes />
          <ListNotes />
        </>
      );
    }
    setLoading(false);
  }, [token]);

  return loading ? <p>Loading...</p> : <>{content}</>;
};

export default Home;
