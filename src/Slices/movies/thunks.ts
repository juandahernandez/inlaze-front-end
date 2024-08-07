import { fetchData } from "@/app/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  "movies/getMoviesByCategories",
  async (selectionMovie: string) => {
    try {
      const data = await fetchData(selectionMovie, "language=en-US");

      return {
        movies: data,
        category: selectionMovie,
      };
    } catch (err) {
      console.log(err);
    }
  }
);

export const getGenres = createAsyncThunk("movies/getGenres", async () => {
  try {
    const data = await fetchData("genre/movie/list", "language=en-US");
    return data.genres;
  } catch (err) {
    console.log(err);
  }
});

export const getMovieByGenreId = createAsyncThunk(
  "movies/getMovieByGenre",
  async (genreId: number) => {
    try {
      const data = await fetchData(
        "discover/movie",
        "language=en-US",
        `&with_genres=${genreId}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMovieById = createAsyncThunk(
  "movies/getMovieById",
  async (movieID: number) => {
    console.log({ movieID });

    try {
      const data = await fetchData(`movie/${movieID}`, "language=en-US");
      console.log("thunk", data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
