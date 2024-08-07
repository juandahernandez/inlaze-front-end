export interface CategoriesData {
  title: string;
  selectionMovie: CategoryName;
}

export type CategoryName =
  | "movie/popular"
  | "movie/now_playing"
  | "movie/upcoming"
  | "movie/top_rated"
  | "movie/popular";
