import axios from "axios";

export const getProductSearchResults = async (searchInput: string) => {
  const { data: result } = await axios.get<{
    products: {
      title: string;
      thumbnail: string;
    }[];
  }>(`https://dummyjson.com/products/search?q=${searchInput}`);

  return result;
};
