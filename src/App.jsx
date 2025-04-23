import { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: "Lão Hạc", author: "Nam Cao", genre: "Văn học", year: 1943 },
    { id: 2, title: "Sapiens", author: "Yuval Noah Harari", genre: "Khoa học", year: 2011 }
  ]);

  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    year: ''
  });

  const [search, setSearch] = useState("");

  const handleAdd = () => {
    if (!form.title || !form.author || !form.genre || !form.year) return;

    const newBook = {
      id: Date.now(),
      title: form.title,
      author: form.author,
      genre: form.genre,
      year: parseInt(form.year)
    };

    setBooks([...books, newBook]);
    setForm({ title: '', author: '', genre: '', year: '' });
  };

  const handleDelete = (id) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
  };

  // 🔍 Lọc theo tên (không phân biệt hoa thường)
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quản lý sách</h1>

      <h2>Thêm sách mới</h2>
      <input
        placeholder="Tên sách"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Tác giả"
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
      />
      <input
        placeholder="Thể loại"
        value={form.genre}
        onChange={(e) => setForm({ ...form, genre: e.target.value })}
      />
      <input
        placeholder="Năm"
        type="number"
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
      />
      <button onClick={handleAdd}>Thêm sách</button>

      <h2>Tìm kiếm sách theo tên</h2>
      <input
        placeholder="Nhập tên sách cần tìm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Danh sách sách</h2>
      {filteredBooks.map((book) => (
        <div key={book.id}>
          <p>
            {book.title} - {book.author} - {book.genre} - {book.year}
          </p>
          <button onClick={() => handleDelete(book.id)}>Xoá</button>
        </div>
      ))}
    </div>
  );
}

export default App;
