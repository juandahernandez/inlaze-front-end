"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { getMovieById } from "@/Slices/movies";
import { IconButton, Typography } from "@mui/material";
import RatingIndicator from "../Utils/ratingIndicator/RatingIndicator";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconsCarousel from "../Utils/icons/IconsCarousel";
import Credits from "./Credits";
import "./movieView.css";

const MovieView = () => {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { movieById } = useAppSelector((state) => state.movies);
  const {
    backdrop_path,
    title,
    genres,
    overview,
    poster_path,
    release_date,
    vote_average,
    budget,
    original_language,
    status,
  } = movieById;

  useEffect(() => {
    if (id) {
      dispatch(getMovieById(Number(id)));
    }
  }, [id, dispatch]);

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="container">
      <div
        className="banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        }}
      >
        <div className="overlay">
          <IconButton
            className="back-button"
            onClick={handleBack}
            sx={{ color: "white" }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <div className="content">
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              className="poster"
            />
            <div className="details">
              <h1>{title}</h1>
              <Typography>{release_date}</Typography>
              <h3>Overview:</h3>
              <Typography>{overview}</Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <RatingIndicator rating={vote_average} />
                <Typography>Users Score</Typography>
                <IconsCarousel isSave={true} />
              </div>
              <div className="genres">
                {genres?.map((genre: any) => (
                  <span key={genre.id} className="genre">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="summary">
        <div className="summary-content">
          <h2>Cast</h2>
          <h2>Plot Summary</h2>
          <Typography style={{ width: "80%" }}>{overview}</Typography>
        </div>
        <Credits
          genres={genres}
          budget={budget}
          original_language={original_language}
          status={status}
        />
      </div>
    </div>
  );
};

export default MovieView;
