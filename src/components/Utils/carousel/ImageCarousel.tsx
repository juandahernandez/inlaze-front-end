import React from "react";
import Slider from "react-slick";
import { Box, IconButton, Typography } from "@mui/material";
import { useAppSelector } from "@/app/store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SaveIcon from "@mui/icons-material/Save";
import Button from "../button/Button";
import RatingIndicator from "../ratingIndicator/RatingIndicator";
import "./carousel.css";
import IconsCarousel from "../icons/IconsCarousel";

const API_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const { popularMovies } = useAppSelector((state) => state.movies);

  const handleClickOpen = () => {
    alert("here");
  };

  const buttons = [
    {
      text: "Trama",
      onClick: handleClickOpen,
    },
    {
      text: "Cast",
      onClick: handleClickOpen,
    },
    {
      text: "Gallery",
      onClick: handleClickOpen,
    },
    {
      text: "Info",
      onClick: handleClickOpen,
    },
  ];

  return (
    <Box>
      <Slider {...settings}>
        {popularMovies?.results?.map((movie) => (
          <div key={movie.id}>
            <img
              className="image-style"
              src={`${API_IMAGE_BASE_URL}${movie.backdrop_path}`}
              alt={movie.original_title}
            />

            <div className="carousel-content">
              <div className="text-overlay">
                <div style={{ width: "75%" }}>
                  <Typography variant="h4" component="h2">
                    {movie.original_title}
                  </Typography>
                  <Typography sx={{ width: "90%" }} variant="body1">
                    {movie.overview}
                  </Typography>
                </div>
                <div style={{ width: "20%" }}>
                  <RatingIndicator rating={movie.vote_average} />
                </div>
              </div>
              <div className="buttons-content">
                <Button buttons={buttons} />
                <IconsCarousel isSave={true} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageCarousel;
