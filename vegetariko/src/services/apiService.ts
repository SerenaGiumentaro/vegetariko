import axios from "axios";

export const getRecipesBySearch = async (query:string) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${query}`, {
      headers: { "x-api-key": `${import.meta.env.VITE_API_KEY}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Errore nel caricamnto dei dati", error);
    throw new Error();
  }
};
