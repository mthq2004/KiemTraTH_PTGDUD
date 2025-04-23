import { useState, useEffect } from 'react';
import BookItem from './components/BookItem';

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', genre: '', year: '' });
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tất cả");

  useEffect(() => {
    const data = localStorage.getItem("books");
    if (data) {
      setBooks(JSON.parse(data));
    } else {
      setBooks([
        { id: 1, title: "Lão Hạc", author: "Nam Cao", genre: "Văn học", year: 1943 },
        { id: 2, title: "Sapiens", author: "Yuval Noah Harari", genre: "Khoa học", year: 2011 }
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

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

  const searchFilteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const genreFilteredBooks = selectedGenre === "Tất cả"
    ? searchFilteredBooks
    : searchFilteredBooks.filter(book => book.genre === selectedGenre);

  return (
    <div style={{ padding: '20px' }}>
      <h1>📚 Quản lý sách</h1>

      <h2>➕ Thêm sách mới</h2>
      <input placeholder="Tên sách" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Tác giả" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
      <input placeholder="Thể loại" value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} />
      <input placeholder="Năm" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
      <button onClick={handleAdd}>Thêm sách</button>

      <h2>🔍 Tìm kiếm sách theo tên</h2>
      <input placeholder="Nhập tên sách cần tìm" value={search} onChange={(e) => setSearch(e.target.value)} />

      <h2>📂 Lọc sách theo thể loại</h2>
      <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="Tất cả">Tất cả</option>
        <option value="Văn học">Văn học</option>
        <option value="Khoa học">Khoa học</option>
        <option value="Công nghệ">Công nghệ</option>
        <option value="Tâm lý">Tâm lý</option>
      </select>

      <h2>📋 Danh sách sách</h2>
      <h3>Tổng số sách: {genreFilteredBooks.length}</h3>
      {genreFilteredBooks.map((book) => (
        <BookItem key={book.id} book={book} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default App;
