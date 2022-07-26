import UserContext from "./auth/UserContext";
import { useState, useContext } from "react";
import JoblyApi from "./api";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import "./auth/FormStyles.css";

const ProfileForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const initialVal = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  };
  const [ formData, setFormData ] = useState(initialVal);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const updatedUserData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
    let newUserInfo;
    try {
      newUserInfo = await JoblyApi.updateUser(
        formData.username,
        updatedUserData
      );
      console.log(newUserInfo, "***NEW USER INFO");
    } catch (errors) {
      console.log(errors);
    }

    setFormData(data => ({
      ...data,
      password: "",
    }));
    setCurrentUser(newUserInfo);
  }

  return (
    <div>
      <form className="Form-container" onSubmit={handleSubmit}>
        <h1>Edit Profile</h1>
        <div className="Form-container-username">
          <label>
            <strong>Username</strong>
          </label>
          <p className="Form-container-firstname">{currentUser.firstName}</p>
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
        <div>
          <p>
            <strong>Confirm password to save changes</strong>
          </p>
          <TextField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            label="Password"
          />
        </div>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
