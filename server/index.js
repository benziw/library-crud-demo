const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'books'
});

app.use(cors());
//app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

app.get('/', (req, res) => { res.send('hello')});

app.post('/api/insert', (req, res) => {

  const title = req.body.title;
  const author = req.body.author;
  const location = req.body.location;

  const sqlInsert = 'INSERT INTO books (title, author, location) VALUES (?,?,?)';
  db.query(sqlInsert, [title, author, location], (err, result) => {
    if (err) {
      console.log(err);
    }
    else { console.log(result) };
  });
});

app.get('/api/get', (req, res) => {
  const sqlGet = 'SELECT * FROM books';
  db.query(sqlGet, (err, result) => {
    if (err) { console.log(err) }
    else {
      res.send(result);
      console.log(result)
    }
  })
});

app.put('/api/update', (req, res) => {
  const isbn = req.body.isbn;
  const newLocation = req.body.newLocation;
  const sqlUpdate = 'UPDATE books SET location = ? WHERE isbn = ?';

  db.query(sqlUpdate, [newLocation, isbn], (err, result) => {
    if(err) console.log(err);
  })

});

app.delete('/api/delete', (req, res) => {
  const isbn = req.body.isbn;
  const sqlDelete = 'DELETE FROM books WHERE isbn = ?';

  db.query(sqlDelete, isbn, (err, result) => {
    if(err) console.log(err);
  })
});

const port = 3001;
app.listen(port, () => {
  console.log(`run on port ${port}`);
});