"use client";
import React, { FC, useEffect } from "react";
import { fetchMovies } from "@/Slices/movies";
import { useAppDispatch, useAppSelector } from "@/app/store";
import type { CategoryName, Movies } from "@/interfaces";
import MovieCard from "./MovieCard";
import { CircularProgress } from "@mui/material";

interface MoviesSectionsProps {
  sectionTitle: string;
  selectionMovie?: CategoryName;
}

const MoviesSections: FC<MoviesSectionsProps> = ({
  sectionTitle,
  selectionMovie = "movie/popular",
}) => {
  const { isLoadingMovies, movies } = useAppSelector((state) => state.movies);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovies(selectionMovie));
  }, [dispatch, selectionMovie]);

  return (
    <div>
      <h3
        id={sectionTitle}
        style={{ padding: "5px 15px", color: "white", fontWeight: "bold" }}
      >
        {sectionTitle}
      </h3>
      <div style={{ display: "flex" }}>
        {isLoadingMovies ? (
          <CircularProgress color="secondary" />
        ) : (
          movies[selectionMovie as keyof Movies]?.results?.map((movie) => (
            <div key={movie.id}>
              <MovieCard
                id={movie.id}
                title={movie?.original_title}
                imageSrc={movie?.poster_path}
                imageAlt={movie?.original_title}
                releaseDate={movie?.release_date}
                voteAverage={movie?.vote_average}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MoviesSections;
