import { IconButton, Tooltip } from "@mui/material";
import React, { FC, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SaveIcon from "@mui/icons-material/Save";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { getToken } from "@/components/helpers/getToken";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { addFavoriteMovie, getUserById } from "@/Slices/movies";

interface IconsCarouselProps {
  isSave: boolean;
  id: number;
}

const IconsCarousel: FC<IconsCarouselProps> = ({ isSave = true, id }) => {
  const { userData } = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();

  const toggleFavorite = async (e: any) => {
    e.stopPropagation();
    try {
      const userId = getToken();
      const url = `https://inlaze-back-end.onrender.com/users/${userId}/favoritiesMovies`;
      const body = {
        movieIds: [id],
      };
      await axios.patch(url, body);
      dispatch(addFavoriteMovie(id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        width: "200px",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Tooltip title="Favorites" arrow>
        <IconButton
          style={{
            color: userData?.favoritiesMovies?.includes(id) ? "red" : "white",
          }}
          onClick={toggleFavorite}
          aria-label="favorites"
        >
          <FavoriteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add to Favorites" arrow>
        <IconButton style={{ color: "white" }} aria-label="add to favorites">
          <BookmarkIcon />
        </IconButton>
      </Tooltip>
      {isSave && (
        <Tooltip title="Save" arrow>
          <IconButton
            style={{
              color: "white",
            }}
            aria-label="Save"
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default IconsCarousel;
