import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const API = "http://localhost:8081";

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
      await axios.post(`${API}/auth/register`, formData);

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div>
      <h1 className="text-primary mb-4">Register</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
        <br />
        <br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
        <br />
        <br />
        <button className="btn btn-success btn-sm" type="submit">Register</button>
      </form>

      <p>
        Already have an account?
        <br/>
        <button className="btn btn-danger mb-3" onClick={() => navigate("/")}>
            Login
        </button>
      </p>
    </div>
  );
}

export default Register;
