import { useState, useEffect } from 'react';
import BookItem from './components/BookItem';

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', genre: '', year: '' });
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tất cả");

  useEffect(() => {
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) setBooks(JSON.parse(savedBooks));
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
    setBooks(books.filter(book => book.id !== id));
  };

  const searchFiltered = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBooks = selectedGenre === "Tất cả"
    ? searchFiltered
    : searchFiltered.filter(book => book.genre === selectedGenre);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">📚 Quản lý sách</h1>
      <div className="mb-3">
        <h5>Tổng số sách: {filteredBooks.length}</h5>
      </div>

      <div className="card p-3 mb-4">
        <h4>Thêm sách mới</h4>
        <div className="row g-2">
          <div className="col-md-3">
            <input className="form-control" placeholder="Tên sách" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Tác giả" value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Thể loại" value={form.genre}
              onChange={(e) => setForm({ ...form, genre: e.target.value })} />
          </div>
          <div className="col-md-2">
            <input className="form-control" type="number" placeholder="Năm" value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })} />
          </div>
          <div className="col-md-1 d-grid">
            <button className="btn btn-primary" onClick={handleAdd}>Thêm</button>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <input className="form-control" placeholder="Tìm sách theo tên"
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="col-md-6">
          <select className="form-select" value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="Tất cả">Tất cả</option>
            <option value="Văn học">Văn học</option>
            <option value="Khoa học">Khoa học</option>
            <option value="Công nghệ">Công nghệ</option>
            <option value="Tâm lý">Tâm lý</option>
          </select>
        </div>
      </div>

      <div className="list-group">
        {filteredBooks.map(book => (
          <BookItem key={book.id} book={book} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default App;
