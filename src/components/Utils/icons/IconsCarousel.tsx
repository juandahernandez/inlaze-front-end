import { IconButton, Tooltip } from "@mui/material";
import React, { FC } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SaveIcon from "@mui/icons-material/Save";
import BookmarkIcon from "@mui/icons-material/Bookmark";

interface IconsCarouselProps {
  isSave: boolean;
}

const IconsCarousel: FC<IconsCarouselProps> = ({ isSave = true }) => {
  return (
    <div
      style={{
        width: "200px",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Tooltip title="Favorites" arrow>
        <IconButton style={{ color: "white" }} aria-label="favorites">
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
          <IconButton style={{ color: "white" }} aria-label="Save">
            <SaveIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default IconsCarousel;
