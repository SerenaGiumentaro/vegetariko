import axios from "axios";

export const getRecipesBySearch = async (query: string, offset: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}${
        import.meta.env.VITE_SEARCH_URL
      }${offset}&query=${query}`,
      {
        headers: { "x-api-key": `${import.meta.env.VITE_API_KEY}` },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Errore nel caricamnto dei dati", error);
    throw new Error();
  }
};


export const getRecipes = async (offset: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}${
        import.meta.env.VITE_SEARCH_URL
      }${offset}`,
      {
        headers: { "x-api-key": `${import.meta.env.VITE_API_KEY}` },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Errore nel caricamnto dei dati", error);
    throw new Error();
  }
};
