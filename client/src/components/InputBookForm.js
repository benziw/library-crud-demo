import { useState } from "react";
import Axios from 'axios';

import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

import '../css/InputBookForm.css';

export default function InputBookForm(props) {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');

  const submitToDB = () => {

    if (title && author && location) {
      console.log(`submitting : \n${title}\n${author}\n${location}`);
      Axios.post("http://localhost:3001/api/insert", { title, author, location }
      ).then(() => {
        alert('successful insert');
      });

      window.location.reload();
    }
    else {
      console.log('blank field submit error')
    }
  };

  return (
    <div className='InputBookForm'>

      <h3>Add new book to db</h3>

      <div className='textFields'>
        <TextField
          label='title'
          onChange={(e) => setTitle(e.target.value)}
          error={title.length < 1}
        >
        </TextField>
        <TextField
          label='author'
          onChange={(e) => setAuthor(e.target.value)}
          error={author.length < 1}
        >
        </TextField>
        <TextField
          label='location'
          onChange={(e) => setLocation(e.target.value)}
          error={location.length < 1}
        >
        </TextField>
      </div>

      <Button
        className='submitButton'
        color='primary'
        variant='contained'
        onClick={submitToDB}
      >submit
      </Button>
    </div>
  );

}