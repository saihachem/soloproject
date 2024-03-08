import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const [book, setBook] = useState({
    title: '',
    description: '',


  });


  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/book/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setBook(response.data);

    } catch (error) {
      console.error('Error fetching book:', error.message);
    }
  };
  useEffect(() => {
    fetchBook();
  }, [setBook]);

  const handleUpdateBook = async () => {
    try {
      await axios.put(`http://localhost:8000/api/book/${id}`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/books');
    } catch (error) {
      console.error('Error updating book:', error.message);
    }
  };

  const handleDeleteBook = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/book/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/books');
    } catch (error) {
      console.error('Error deleting book:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  return (
    <div>


    
    <h2 onClick={()=>navigate(-1)}>back</h2>
      <h2>Edit Book</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={book.description}
          onChange={handleInputChange}
          required
        ></textarea>
      </label>
      <br />
      <label>
        Added By: {book.addedBy}
      </label>
      <br />
      <label>
        Created On: {new Date(book.createdAt).toLocaleString()}
      </label>
      <br />
      <label>
        Updated On: {new Date(book.updatedAt).toLocaleString()}
      </label>
      <br />
      <button onClick={handleUpdateBook}>Update Book</button>
      <button onClick={handleDeleteBook}>Delete Book</button>
    </div>
  );
};

export default UpdateBook;