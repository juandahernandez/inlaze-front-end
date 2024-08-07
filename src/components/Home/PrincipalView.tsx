"use client";
import React from "react";
import Navigation from "../Navigation/Navigation";
import Sidebar from "../Sidebar/Sidebar";
import Categories from "../Categories/Categories";
import { useAppSelector } from "@/app/store";
import ImageCarousel from "../Utils/carousel/ImageCarousel";
import { Box, Grid } from "@mui/material";
import MovieCard from "../Utils/sections/MovieCard";

const PrincipalView = () => {
  const { genreMovies } = useAppSelector((state) => state.movies);

  return (
    <Box sx={{ width: "95%", margin: "auto" }}>
      <Navigation />
      <ImageCarousel />

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={2} sx={{ background: "#262626" }} item>
          <Sidebar />
        </Grid>

        <Grid xs={10} sx={{ background: "#3e3e3e" }} item>
          {genreMovies?.results ? (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {genreMovies.results.map((movie, index) => (
                <Box key={index} sx={{ width: "20%" }}>
                  <MovieCard
                    id={movie.id}
                    title={movie?.original_title}
                    imageSrc={movie?.poster_path}
                    imageAlt={movie?.original_title}
                    releaseDate={movie?.release_date}
                  />
                </Box>
              ))}
            </div>
          ) : (
            <Categories />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrincipalView;
