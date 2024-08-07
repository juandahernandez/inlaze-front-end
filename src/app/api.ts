const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
const BASE_URL = "https://api.themoviedb.org/3";
export const fetchData = async (
  method: string,
  query: string,
  complement: string = ""
) => {
  try {
    const url = `${BASE_URL}/${method}?${query}&api_key=${API_KEY}${
      complement && complement
    }`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch data error:", error);
    throw error;
  }
};
