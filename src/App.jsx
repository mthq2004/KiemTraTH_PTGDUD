import { useState } from 'react';

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: "Lão Hạc", author: "Nam Cao", genre: "Văn học", year: 1943 },
    { id: 2, title: "Sapiens", author: "Yuval Noah Harari", genre: "Khoa học", year: 2011 }
  ]);

  return (
    <div>
      <h1>Danh sách sách</h1>
      {books.map(book => (
        <div key={book.id}>
          <p>{book.title} - {book.author} - {book.genre} - {book.year}</p>
          <button>Xoá</button>
        </div>
      ))}
    </div>
  );
}

export default App;
