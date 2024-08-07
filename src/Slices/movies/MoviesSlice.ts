import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchMovies,
  getGenres,
  getMovieByGenreId,
  getMovieById,
} from "./thunks";
import type { MovieResponse, Movies, MoviesData } from "@/interfaces";

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: {} as Movies,
    isLoadingMovies: false,
    isLoadingGenres: false,
    popularMovies: {} as MoviesData,
    genreList: [],
    generId: "",
    genreMovies: {} as MoviesData,
    movieById: {} as any,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending.type, (state) => {
        state.isLoadingMovies = true;
      })
      .addCase(
        fetchMovies.fulfilled.type,
        (state, { payload }: PayloadAction<any>) => {
          if (payload.category.includes("popular")) {
            state.popularMovies = payload.movies;
          }

          const newMovies = {
            ...state.movies,
            [payload.category]: payload.movies,
          };
          state.movies = newMovies;
          state.isLoadingMovies = false;
        }
      );

    builder
      .addCase(getGenres.pending.type, (state) => {
        state.isLoadingGenres = true;
      })
      .addCase(
        getGenres.fulfilled.type,
        (state, { payload }: PayloadAction<any>) => {
          state.genreList = payload;
          state.isLoadingGenres = true;
        }
      );

    builder
      .addCase(getMovieByGenreId.pending.type, (state) => {
        state.isLoadingGenres = true;
      })
      .addCase(
        getMovieByGenreId.fulfilled.type,
        (state, { payload }: PayloadAction<any>) => {
          state.genreMovies = payload;
          state.isLoadingGenres = false;
        }
      );

    builder
      .addCase(getMovieById.pending.type, (state) => {
        state.isLoadingMovies = true;
      })
      .addCase(
        getMovieById.fulfilled.type,
        (state, { payload }: PayloadAction<any>) => {
          state.movieById = payload;
          state.isLoadingMovies = false;
        }
      );
  },
});
