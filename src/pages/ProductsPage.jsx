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
  console.log(products)

  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
    // so that the query stays on even when reloading the webpage.
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");
    // so that when we search and the query appears, it is also written in the search box.
    let finalProducts = filterProducts(
      searchProducts(products, query.search),
      query.category
    );
    filterProducts(finalProducts);
    // so that both search and category get applied to the result.

    setDisplayed(finalProducts, query.category);
  }, [query]);

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
