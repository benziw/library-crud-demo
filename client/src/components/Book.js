import '../css/Book.css';

export default function Book(props) {

  return (
    <div className="book">
      <h1>{props.title}</h1>
      <h2>by {props.author}</h2>
      <h3>isbn: {props.isbn} ｜ location: {props.location}</h3>
    </div>
  )
}