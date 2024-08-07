import React, { FC, useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface RatingIndicatorProps {
  rating: number;
  width?: number;
  height?: number;
}

const RatingIndicator: FC<RatingIndicatorProps> = ({
  rating,
  width = 150,
  height = 150,
}) => {
  const [covertRating, setConverRating] = useState<number>(0);

  useEffect(() => {
    setConverRating(Math.round(rating * 10));
  }, [rating]);

  let color;
  if (covertRating >= 7) color = "#28a745";
  else if (covertRating >= 4) color = "#ffc107";
  else color = "#dc3545";

  return (
    <div style={{ width: width, height: height }}>
      <CircularProgressbar
        value={covertRating}
        text={`${covertRating} %`}
        styles={buildStyles({
          pathColor: color,
          textColor: "#fff",
          trailColor: "#d6d6d6",
        })}
      />
    </div>
  );
};

export default RatingIndicator;
