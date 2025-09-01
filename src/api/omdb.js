import axios from "axios";


const API_KEY = "2de1c77c"; // 🔑 replace with your real key
const BASE_URL = "https://www.omdbapi.com/";


export async function searchMovies({ query, page = 1, type = "" }) {
  try {
    const params = {
      s: query,
      page,
      type,
      apikey: API_KEY,
    };

    const { data } = await axios.get(BASE_URL, { params });

    if (data.Response === "False") {
      return { items: [], total: 0, error: data.Error };
    }

    return {
      items: data.Search.map((m) => ({
        imdbID: m.imdbID,
        title: m.Title,
        year: m.Year,
        poster: m.Poster !== "N/A" ? m.Poster : null,
        type: m.Type,
      })),
      total: parseInt(data.totalResults),
      error: null,
    };
  } catch (e) {
    console.error("API error:", e);
    return { items: [], total: 0, error: "API request failed" };
  }
}



export async function getMovieDetails(id) {
  try {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;
    console.log("Fetching details from:", url);  // 👈 log URL
    const response = await fetch(url);
    const text = await response.text();          // 👈 read raw
    console.log("Raw response:", text);          // 👈 see what OMDb sends
    const data = JSON.parse(text);               // then parse
    if (data.Response === "False") throw new Error(data.Error);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch movie details: " + error.message);
  }
}
