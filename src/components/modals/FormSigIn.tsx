"use client";
import React, { FC, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

interface FormSigInProps {
  handleClose: () => void;
}

type FormSigIn = {
  name: string;
  email: string;
  password: string;
};

const FormSigIn: FC<FormSigInProps> = ({ handleClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<FormSigIn>({
    name: "",
    email: "",
    password: "",
  });

  console.log(form);

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

    try {
      setForm({
        name: "",
        email: "",
        password: "",
      });
      handleClose();
    } catch (error) {
      console.log("FAILED...", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box className="form-container" component="form" onSubmit={handleSubmit}>
      <Button
        className="button-sigin"
        type="submit"
        variant="contained"
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={20} /> : "Log In"}
      </Button>
      <Typography sx={{ fontSize: "15px", color: "white" }}>
        we love having you back
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        sx={{ background: "white" }}
      />
      <TextField
        label="Email"
        variant="outlined"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        sx={{ background: "white" }}
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
      <Typography sx={{ fontSize: "10px", color: "white" }}>
        For any questions, react out to support@inlazedmovies.com
      </Typography>
    </Box>
  );
};

export default FormSigIn;
