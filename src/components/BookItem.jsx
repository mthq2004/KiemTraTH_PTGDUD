// BookItem.jsx
function BookItem({ book, onDelete }) {
    return (
      <div style={{ border: "1px solid gray", margin: "5px", padding: "5px" }}>
        <p>
          <strong>{book.title}</strong> - {book.author} - {book.genre} - {book.year}
        </p>
        <button onClick={() => onDelete(book.id)}>Xoá</button>
      </div>
    );
  }
  
  export default BookItem;
  