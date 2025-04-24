import api from "../lib/axios";

// Function to fetch product data from a JSON file
const fetchProducts = async () => {
  try {
    // Fetch the products data from the local JSON file
    const response = await api.get("/projects");

    // Parse the JSON response and return the product data
    console.log(response);
    return response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

// Object to encapsulate product-related services
export const productServices = {
  fetchProducts,
};
