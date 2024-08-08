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
import { useAppDispatch } from "@/app/store";
import { getUserById } from "@/Slices/movies";

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
  const dispatch = useAppDispatch();

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

    const url = login
      ? "https://inlaze-back-end.onrender.com/auth/login"
      : "https://inlaze-back-end.onrender.com/users";

    try {
      const endpoint = url;
      const payload = {
        username: form.name,
        email: form.email,
        password: form.password,
      };

      const response = await axios.post(endpoint, payload);
      const msg = login
        ? "Login successfull"
        : "Registration successful! You can now log in.";
      setSuccessMessage(msg);
      setForm({
        name: "",
        email: "",
        password: "",
      });
      if (login) {
        const { data } = response;
        const accessToken = data.access_token;
        localStorage.setItem("token", accessToken);
        await dispatch(getUserById());
        handleClose();
      } else {
        setLogin(true);
      }
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

      <Button
        sx={{
          background: "#f0b90b",
        }}
        variant="contained"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? <CircularProgress size={20} /> : "Send"}
      </Button>
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
