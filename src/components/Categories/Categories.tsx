import React from "react";
import { categories } from "@/const";
import { Box } from "@mui/material";
import MoviesSections from "../Utils/sections/MoviesSections";

const Categories = () => {
  return (
    <Box>
      {categories.map((category, index) => (
        <Box
          key={index}
          sx={{
            width: "100%",
            overflowX: "scroll",
          }}
        >
          <MoviesSections
            sectionTitle={category.title}
            selectionMovie={category.selectionMovie}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Categories;
