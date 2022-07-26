import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import "./FormStyles.css";

const LoginForm = ({ login }) => {
  const history = useHistory();

  let initialState = {
    username: "",
    password: "",
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
    try {
      await login(formData);
      history.push("/");
    } catch (errors) {
      console.log(errors);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="Form-container">
        <h1>Log in</h1>
        <div>
          <TextField
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            size="small"
            label="Username"
          />
        </div>
        <div>
          <TextField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            size="small"
            label="Password"
            autoComplete="on"
          />
          <div>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
