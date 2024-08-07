import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchMovies,
  getGenres,
  getMovieByGenreId,
  getMovieById,
  getUserById,
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
    userData: {} as any,
    isLoadingUser: false,
    favoriteMovies: {} as any,
  },
  reducers: {
    addFavoriteMovie: (state, { payload }) => {
      const updatedFavoritesMovies = state.userData.favoritiesMovies
        ? [...state.userData.favoritiesMovies, payload]
        : [payload];

      state.userData = {
        ...state.userData,
        favoritiesMovies: updatedFavoritesMovies,
      };

      console.log(state.userData);
    },
  },
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
            state.isLoadingMovies = false;
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

    builder
      .addCase(getUserById.pending.type, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(
        getUserById.fulfilled.type,
        (state, { payload }: PayloadAction<any>) => {
          state.userData = payload;
          state.isLoadingUser = false;
        }
      );
  },
});

export const { addFavoriteMovie } = moviesSlice.actions;
