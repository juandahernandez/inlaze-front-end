import { Typography } from "@mui/material";
import React, { FC } from "react";

interface CreditsProps {
  genres: any;
  budget: number;
  original_language: string;
  status: string;
}

const Credits: FC<CreditsProps> = ({
  genres,
  budget,
  original_language,
  status,
}) => {
  return (
    <div
      style={{
        width: "30%",
        background: "#3b3b3b",
        height: "100%",
        color: "white",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <Typography>Director:</Typography>
      <Typography>Producer:</Typography>
      <Typography>Screenplay:</Typography>
      <Typography>
        Genre:{" "}
        {genres?.map((genre: any) => (
          <span key={genre.id}>{genre.name}, </span>
        ))}
      </Typography>
      <Typography>Budget:</Typography>
      <Typography>Esimated Budget: ${budget} million</Typography>
      <Typography>Earnings:</Typography>
      <Typography>Original Language: {original_language}</Typography>
      <Typography>Status: {status}</Typography>
    </div>
  );
};

export default Credits;
