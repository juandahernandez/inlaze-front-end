import React, { FC } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import IconsCarousel from "../icons/IconsCarousel";
import RatingIndicator from "../ratingIndicator/RatingIndicator";

interface MovieCardProps {
  id?: number;
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  releaseDate?: string;
  voteAverage?: number;
}

const API_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard: FC<MovieCardProps> = ({
  id = 0,
  title = "",
  imageSrc = "",
  imageAlt = "",
  releaseDate = "",
  voteAverage = 0,
}) => {
  const router = useRouter();
  const posterPath = `${API_IMAGE_BASE_URL}${imageSrc}`;

  const onClick = () => {
    router.push(`/movie/${id}`);
  };

  return (
    <Card
      sx={{
        minWidth: 195,
        margin: 2,
        height: "400px",
        background: "#262626",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="250"
        image={posterPath}
        alt={imageAlt}
      />
      <CardContent>
        <Typography sx={{ color: "white" }} variant="body2">
          {title}
        </Typography>
        <Typography sx={{ color: "white" }} variant="body2">
          {releaseDate}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <RatingIndicator rating={voteAverage} width={40} height={40} />
        <IconsCarousel isSave={false} />
      </CardActions>
    </Card>
  );
};

export default MovieCard;
