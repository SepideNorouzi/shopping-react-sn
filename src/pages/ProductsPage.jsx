import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/Card";
import Loader from "../components/Loader";
import { fetchProducts } from "../features/product/productSlice";
// import { useProducts } from "../context/ProductContext";
import SideBar from "../components/SideBar";

import styles from "./ProductsPage.module.css";
import {
  filterProducts,
  getInitialQuery,
  searchProducts,
} from "../helpers/helper";
import SearchBox from "../components/SearchBox";

function ProductsPage() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.product);
  // Subscribes to the Redux store and extracts the products array 
  // and the loading boolean from the product slice of the store. 
  // The component will re-render if these values change.
  console.log(products)

  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  // searchParams: An object to read the current URL query parameters.
  // setSearchParams: A function to update the URL query parameters.

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  // This effect runs only once when the component is first rendered 
  // (because of the empty dependency array []).

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
    // so that the query stays on even when reloading the webpage.
    // The code first gets the searchParams. 
    // This is the part of the URL that comes after the question mark (?).
  }, [products]);
  // It reads the URL parameters (searchParams) and uses the helper 
  // function to create an initial query object. This ensures that if 
  // you land on a URL like /products?category=laptops, the category 
  // filter is applied immediately.

  useEffect(() => {
    setSearchParams(query);
    // It updates the browser's URL to match the current query state.
    setSearch(query.search || "");
    // so that when we search and the query appears, it is also written in the search box.
    // basically,  It keeps the text in the search box synchronized 
    // with the search property of the query object.
    let finalProducts = filterProducts(
      searchProducts(products, query.search),
      query.category
    );
    filterProducts(finalProducts);
    // so that both search and category get applied to the result.

    setDisplayed(finalProducts, query.category);
  }, [query]);
  // It runs whenever the query object changes (i.e., when a user searches 
  // or applies a filter).



  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        <div className={styles.products}>
          {loading && <Loader />}
          {displayed.map((p) => (
            <Card key={p.id} data={p} />
          ))}
        </div>
        <SideBar query={query} setQuery={setQuery} />
      </div>
    </>
  );
}

export default ProductsPage;
