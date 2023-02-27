import React, { useEffect, useState } from 'react';
import cookie from 'js-cookie';

import CreateNotes from './Notes/CreateNote';
import ListNotes from './Notes/ListNotes';

import Card from './UI/Card';
import classes from './Home.module.css';
import Button from './UI/Button';

const Home = () => {
  const token = cookie.get('token');

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(
    <Card className={classes.form}>
      <div className={classes.center}>
        <h1>Welcome to Notes</h1>
        <p>This is an interactive notes app, developed using the MERN stack.</p>
      </div>
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
