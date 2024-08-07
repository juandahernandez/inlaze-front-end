"use client";
import React, { FC, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import "./logInModal.css";

interface FormLogInProps {
  handleClose: () => void;
  isLogin: boolean;
}

type Form = {
  name?: string;
  email: string;
  password: string;
};

const FormLogIn: FC<FormLogInProps> = ({ handleClose, isLogin }) => {
  const [login, setLogin] = useState(isLogin);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleLogin = () => {
    setLogin(true);
    setSuccessMessage("");
  };

  const handleSignUp = () => {
    setLogin(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    try {
      const endpoint = "https://nest-test-rlph.onrender.com/users";
      const payload = {
        username: form.name,
        email: form.email,
        password: form.password,
      };

      const response = await axios.post(endpoint, payload);

      console.log(response.data);

      setSuccessMessage("Registration successful! You can now log in.");
      setForm({
        name: "",
        email: "",
        password: "",
      });
      setLogin(true);
    } catch (error) {
      console.error("FAILED...", error);
      setSuccessMessage("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="form-container" component="form" onSubmit={handleSubmit}>
      <Box>
        <Button
          sx={{
            background: login ? "#f0b90b" : "black",
            "&:hover": {
              background: login ? "#f0b90b" : "black",
            },
          }}
          type="submit"
          variant="contained"
          disabled={isLoading}
          onClick={handleLogin}
        >
          {isLoading ? <CircularProgress size={20} /> : "Log In"}
        </Button>
        <Button
          sx={{
            background: !login ? "#f0b90b" : "black",
            "&:hover": {
              background: !login ? "#f0b90b" : "black",
            },
          }}
          type="button"
          variant="contained"
          disabled={isLoading}
          onClick={handleSignUp}
        >
          {isLoading ? <CircularProgress size={20} /> : "Sign Up"}
        </Button>
      </Box>
      <Typography sx={{ fontSize: "15px", color: "white" }}>
        {login ? "We love having you back" : "Create a new account"}
      </Typography>
      {!login && (
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          required
          sx={{ background: "white", marginBottom: "16px" }}
        />
      )}
      <TextField
        label="Email"
        variant="outlined"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        sx={{ background: "white", marginBottom: "16px" }}
      />
      <TextField
        label="Password"
        variant="outlined"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
        sx={{ background: "white" }}
      />
      {successMessage && (
        <Alert
          sx={{ marginTop: "16px" }}
          severity={successMessage.includes("failed") ? "error" : "success"}
        >
          {successMessage}
        </Alert>
      )}
      <Typography sx={{ fontSize: "10px", color: "white" }}>
        For any questions, reach out to support@inlazedmovies.com
      </Typography>
    </Box>
  );
};

export default FormLogIn;
