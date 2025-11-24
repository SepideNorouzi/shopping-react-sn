import { createContext, useContext, useEffect, useState } from "react";
import api from "../helpers/config";

const productContext = createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts(await api.get("/products"));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <productContext.Provider value={products}>
      {children}
    </productContext.Provider>
  );
}

const useProducts = () => {
  const products = useContext(productContext);
  return products;
};

const useProductsDetails = (id) => {
  const products = useContext(productContext);
  const result = products.find((product) => product.id == id);
  return result;
};

export default ProductProvider;
export { useProducts, useProductsDetails };
