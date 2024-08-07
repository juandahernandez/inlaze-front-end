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
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              height: "4px" /* Ajusta el tamaño del scrollbar */,
            },

            scrollbarWidth: "thin",
            scrollbarColor: "#aeaeab #3e3e3e",
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
