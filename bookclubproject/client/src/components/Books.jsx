import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Books = ({currentUser, setCurrentUser}) => {
  const navigate = useNavigate();
  const [newBook, setNewBook] = useState({
    title: '',
    description: '',
  });

  const [books, setBooks] = useState([]);
  var token = localStorage.getItem('authToken');
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/book',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')))
    fetchBooks();
  }, [setCurrentUser]);




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleCreateBook = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/book',newBook,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });console.log (response)
      setNewBook({ title: '', description: '' });
      fetchBooks()
    } catch (error) {
      console.error('Error creating book:', error.message);
    }
  };

  

  const handleBookClick = (bookId, addedByUserId) => {
    const fullName = `${currentUser.firstName} ${currentUser.lastName}`;
    if (currentUser && fullName === addedByUserId) {
      navigate(`/books/${bookId}`);
  };}

  return (
    <div className='abc'>
   

      <h2>Create a New Book</h2>
      <form onSubmit={handleCreateBook}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newBook.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={newBook.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </label>
        <br />
        <button type="submit">Add Book</button>
      </form>

      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id} onClick={() => handleBookClick(book._id, book.addedBy)}>
            {book.title}: {book.description}{' '}
            {book.addedBy && <span>(Added by {book.addedBy})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;