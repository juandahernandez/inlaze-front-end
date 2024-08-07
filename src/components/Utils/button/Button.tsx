import React, { FC } from "react";
import { Button as ButtonMui, ButtonProps } from "@mui/material";
// import { useTranslation } from "react-i18next";
import "./button.css";

export interface ButtonContent {
  text: string;
  href?: string;
  onClick?: () => void;
}

interface CustomButtonProps extends ButtonProps {
  buttons: ButtonContent[];
}

const Button: FC<CustomButtonProps> = ({ buttons, ...props }) => {
  //   const { t } = useTranslation();
  return (
    <div className="button-style">
      {buttons.map((button, index) => (
        <ButtonMui
          key={index}
          variant="contained"
          onClick={button.onClick}
          {...props}
          style={{
            ...props.style,
            margin: index > 0 ? 15 : 0,
            background: "transparent",
            border: "none",
          }}
        >
          {button.text}
        </ButtonMui>
      ))}
    </div>
  );
};

export default Button;
