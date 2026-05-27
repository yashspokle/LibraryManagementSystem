import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const API = "http://localhost:8081";
  const [books, setBooks] = useState([]);

  const [name, setname] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [editID, setEditId] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(token)
    if (!token) {
      navigate("/");
    } else {
      fetchBook();
    }
  }, []);

  const fetchBook = async () => {
    const response = await axios.get(`${API}/findAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setBooks(response.data);
  };

  const saveBooks = async (e) => {
    e.preventDefault();

    if (editID === null) {
      const book = {
        name,
        author,
        price: Number(price),
      };
      await axios.post(`${API}/addBook`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      const book = {
        bid: editID,
        name,
        author,
        price: Number(price),
      };

      await axios.put(`${API}/updateBook`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditId(null);
    }

    fetchBook();

    clearForm();
  };

  const editBook = (book) => {
    setEditId(book.bid);
    setname(book.name);
    setAuthor(book.author);
    setPrice(book.price);
  };

  const deleteBook = async (bid) => {
    await axios.delete(`${API}/delete/${bid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchBook();
  };

  const clearForm = () => {
    setname("");
    setAuthor("");
    setPrice("");
    setEditId(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <br />
      <br />
      <h1 className="text-primary mb-4">Library Management System</h1>
      <form className="row g-2">
        <input
          type="text"
          placeholder="Book Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button onClick={saveBooks} className="btn btn-success btn-sm">
          {editID ? "Update Book" : "Add Book"}
        </button>
      </form>

      <br />
      <br />

      <h1 className="text-primary mb-4">Library Information</h1>
      <button onClick={logout} className="btn btn-danger mb-3">
        Logout
      </button>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th className="col">ID</th>
            <th className="col">Book Name</th>
            <th className="col">Author</th>
            <th className="col">Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => {
            return (
              <tr key={book.bid}>
                <td className="text fw-bold">{book.bid}</td>
                <td className="text-danger fw-bold">{book.name}</td>
                <td className="text-success">{book.author}</td>
                <td className="text-primary">${book.price}</td>
                <td>
                  <button
                    onClick={() => editBook(book)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBook(book.bid)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Book;
