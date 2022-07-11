import Axios from 'axios';
import { useEffect, useState } from 'react';
import Book from './Book'

import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import '../css/DisplayBooks.css'

export default function DisplayBooks() {

  const [booksList, setBooksList] = useState([]);
  const [newLocation, setNewLocation] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      //console.log(response.data);
      setBooksList(response.data);
      console.log(`booksList: ${booksList}`);
    })
  }, []);

  const changeLocationOnClick = (isbn) => {
    Axios.put('http://localhost:3001/api/update', { newLocation, isbn });
    setNewLocation('');
    window.location.reload();
  };

  const deleteBook = (isbn) => {
    Axios.delete(`http://localhost:3001/api/delete/`, {
      headers: {},
      data: {
        isbn: isbn
      }
    });
    window.location.reload();
  }

  return (
    <div className={`displayBooks`}>

      <div className='topContainer'>
        <h2>book database</h2>

        <Autocomplete
          className={'selectLocation'}
          options={[...new Set(booksList.map(book => book.location))]}
          renderInput={(params) => <TextField {...params} label="Filter by location" />}
          onChange={(event, newValue) => setFilterLocation((newValue ? newValue : ''))}
        />
      </div>

      <div className='booksGrid'>
        {booksList.map(book => (
          book.location.indexOf(filterLocation) !== -1 ?
            <div className='bookContainer'>
              <Book title={book.title} author={book.author} isbn={book.isbn} location={book.location} key={book.isbn} />
              <div className='bookOptions'>
                <TextField
                  className='changeLocationTextField'
                  type='text'
                  label='new location'
                  onChange={(e) => setNewLocation(e.target.value)}>
                </TextField>
                <Button
                  className='Button'
                  color='secondary'
                  variant='contained'
                  onClick={() => changeLocationOnClick(book.isbn)}
                >update location
                </Button>
                <Button
                  className='Button'
                  color='warning'
                  variant='contained'
                  onClick={() => deleteBook(book.isbn)}
                >delete
                </Button>
              </div>
            </div> : null))
        }
      </div>


    </div>
  );
}