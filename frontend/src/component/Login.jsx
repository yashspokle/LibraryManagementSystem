import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const API = "http://localhost:8081";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/auth/login`, formData);

      localStorage.setItem("token", response.data);

      alert("Login Successful");

      navigate("/books");
    } catch (error) {
      console.log(error);

      alert("Invalid Credentials");
    }
  };

  return (
    <div>
      <h1 className="text-primary mb-4">Login</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
        <br />
        <br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange}
        />
        <br />
        <br />
        <button className="btn btn-success btn-sm" type="submit">Login</button>
      </form>
      <p>
        Don't have an account?
        <br/>
        <button className="btn btn-danger mb-3" onClick={() => navigate("/register")}>Register</button>
      </p>
    </div>
  );
}

export default Login;
