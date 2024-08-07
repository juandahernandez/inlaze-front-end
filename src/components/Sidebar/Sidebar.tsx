"use client";
import React, { useEffect } from "react";
import SidebarSections from "./SidebarSections";
import { getGenres } from "@/Slices/movies";
import { useAppDispatch, useAppSelector } from "@/app/store";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { genreList } = useAppSelector((state) => state.movies);

  const sectionsSidebar = [
    {
      title: "Search",
    },
    {
      title: "Sort By",
      subTitle: "Categories",
      sections: [
        { id: 28, name: "Categories" },
        { id: 12, name: "Title A-Z" },
        { id: 12, name: "Popularity Ascendent" },
        { id: 12, name: "Popularity Descending" },
        { id: 12, name: "Rating Ascendent" },
        { id: 12, name: "Rating Descending" },
        { id: 12, name: "Releace Date Descending" },
        { id: 12, name: "Releace Date Descending" },
      ],
    },
    {
      title: "Genres",
      subTitle: "--------",
      sections: genreList || [],
    },
    {
      title: "User Score",
    },
  ];

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div>
      {sectionsSidebar.map((category, index) => (
        <div key={index}>
          <SidebarSections
            title={category.title}
            subTitle={category.subTitle}
            sections={category.sections}
          />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
