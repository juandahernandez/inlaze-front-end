import { fetchData } from "@/app/api";
import { getToken } from "@/components/helpers/getToken";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
    try {
      const data = await fetchData(`movie/${movieID}`, "language=en-US");
      console.log("thunk", data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserById = createAsyncThunk("movies/getUsers", async () => {
  try {
    const userId = getToken();
    const url = `https://inlaze-back-end.onrender.com/users/${userId}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
});
