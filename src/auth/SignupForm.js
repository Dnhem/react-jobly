import { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import "./FormStyles.css";
import { useHistory } from "react-router-dom";

const SignupForm = ({ signup }) => {
  const history = useHistory();
  let initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [ formData, setFormData ] = useState(initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await signup(formData);
    history.push("/companies");
    setFormData(initialState);
  }

  return (
    <form onSubmit={handleSubmit} className="Form-container">
      <h1>Sign Up</h1>
      <div>
        <TextField
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          label="Username"
        />
      </div>
      <div>
        <TextField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          label="Password"
          autoComplete="on"
        />
      </div>
      <div>
        <TextField
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          label="First Name"
        />
      </div>
      <div>
        <TextField
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          label="Last Name"
        />
      </div>
      <div>
        <TextField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="Email"
        />
      </div>
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default SignupForm;
