function BookItem({ book, onDelete }) {
    return (
      <div className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>{book.title}</strong> - {book.author} - {book.genre} - {book.year}
        </div>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(book.id)}>Xoá</button>
      </div>
    );
  }
  
  export default BookItem;
  