"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  MenuItem,
  Avatar,
  Menu,
  Box,
  IconButton,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import { RootState } from "@/app/store";
import { toggleDarkMode } from "@/Slices/theme/ThemeSlice";
import { useTranslation } from "react-i18next";
import SigInModal from "../modals/logInModal";
import "./navigation.css";

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLanguage);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const itemsAppBar = [
    {
      name: "Popular",
      url: "#Popular",
    },
    {
      name: "nowplaying",
      url: "#Now Playing",
    },
    {
      name: "upcoming",
      url: "#Upcoming",
    },
    {
      name: "topRated",
      url: "#Top Rated",
    },
  ];

  const buttonText = i18n.language === "es" ? "EN" : "ES";

  return (
    <div style={{ position: "sticky" }}>
      <AppBar position="sticky">
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-around",
            background: "#000000",
          }}
        >
          <IconButton component="a" href="/">
            <Avatar
              style={{ height: "42px", width: "134px", borderRadius: "1px" }}
              alt=" Image"
              src="/logo.png"
            />
          </IconButton>
          <Box style={{ display: "flex" }}>
            {itemsAppBar.map((item, index) => (
              <MenuItem
                key={index}
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                <Link style={{ color: "white" }} href={item?.url}>
                  {t(item.name)}
                </Link>
              </MenuItem>
            ))}
          </Box>

          <div style={{ display: "flex" }}>
            <button className="button-change-language" onClick={toggleLanguage}>
              {buttonText}
            </button>
            <IconButton onClick={toggleTheme} color="inherit">
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton onClick={handleClickOpen} color="inherit">
              <LoginIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <SigInModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default Navigation;
