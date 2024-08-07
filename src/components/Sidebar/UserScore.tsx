import React, { FC, useState } from "react";
import {
  Box,
  List,
  ListSubheader,
  Slider,
  styled,
  Typography,
} from "@mui/material";
import "./styles.css";

interface UserScoreProps {
  title: string;
}

const MAX = 100;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: "",
  },
  {
    value: MAX,
    label: "",
  },
];

const UserScore: FC<UserScoreProps> = ({ title }) => {
  const [val, setVal] = useState<number>(MIN);
  const handleChange = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number);
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, background: "#1c1c1c" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          sx={{ background: "#1c1c1c", color: "white" }}
          component="div"
          id="nested-list-subheader"
        >
          {title}
        </ListSubheader>
      }
    >
      <Slider
        id="userScore"
        marks={marks}
        step={10}
        value={val}
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        onChange={handleChange}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="body2"
          onClick={() => setVal(MIN)}
          sx={{ cursor: "pointer", color: "white" }}
        >
          {MIN} %
        </Typography>
        <Typography
          variant="body2"
          onClick={() => setVal(MAX)}
          sx={{ cursor: "pointer", color: "white" }}
        >
          {MAX} %
        </Typography>
      </Box>
    </List>
  );
};

export default UserScore;
