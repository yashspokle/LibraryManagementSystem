import { BrowserRouter, Routes, Route } from "react-router-dom";
import Book from "./component/Book";
import Login from "./component/Login";
import Register from "./component/Register";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container mt-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Book />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
