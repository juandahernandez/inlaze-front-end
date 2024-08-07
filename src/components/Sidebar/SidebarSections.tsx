import React, { FC, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Slider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "@/app/store";
import { getMovieByGenreId } from "@/Slices/movies";
import UserScore from "./UserScore";

interface SidebarSection {
  id: number;
  name: string;
}

interface SidebarSectionsProps {
  title: string;
  subTitle?: string;
  sections?: SidebarSection[];
}

const SidebarSections: FC<SidebarSectionsProps> = ({
  title,
  subTitle = "",
  sections = [],
}) => {
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    setOpen(!open);
  };

  const onFilterClick = (id: number) => {
    dispatch(getMovieByGenreId(id));
  };
  return (
    <div>
      {title === "Search" ? (
        <FormControl sx={{ m: 1 }} variant="filled">
          <InputLabel sx={{ color: "white" }} htmlFor="Search">
            Search
          </InputLabel>
          <FilledInput
            id="Search"
            type="text"
            endAdornment={
              <InputAdornment sx={{ color: "white" }} position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      ) : title === "User Score" ? (
        <UserScore title="User Score" />
      ) : (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              sx={{ background: "#1c1c1c", color: "white" }}
              component="div"
              id="nested-list-subheader"
            >
              {title}
            </ListSubheader>
          }
        >
          <ListItemButton
            sx={{ background: "#1c1c1c", color: "white" }}
            onClick={handleClick}
          >
            <ListItemText primary={subTitle} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {sections.map((section, index) => (
                <ListItemButton
                  key={index}
                  sx={{ pl: 4, background: "#1c1c1c" }}
                  onClick={() => onFilterClick(section.id)}
                >
                  <ListItemText
                    sx={{ color: "white" }}
                    primary={section.name}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      )}
    </div>
  );
};

export default SidebarSections;
