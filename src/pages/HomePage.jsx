import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import { fetchProducts } from "../features/product/productSlice";
import SideBar from "../components/SideBar";
import SearchBox from "../components/SearchBox";
import Loader from "../components/Loader";

import {
  filterProducts,
  getInitialQuery,
  searchProducts,
} from "../helpers/helper";

import styles from "./HomePage.module.css";

function HomePage() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.product);
  console.log(products);

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
  }, [products]);

  useEffect(() => {
    if (!query) return;

    setSearchParams(query);
    setSearch(query.search || "");
    let finalProducts = filterProducts(
      searchProducts(products, query.search),
      query.category
    );
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

export default HomePage;
