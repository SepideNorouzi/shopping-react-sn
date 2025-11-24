import React from "react";
import { FaListUl } from "react-icons/fa";
import { categories } from "../constants/List";

import styles from "./SideBar.module.css";
import { createQueryObject } from "../helpers/helper";

function SideBar({ query, setQuery }) {
  const categoryHandler = (event) => {
    const { tagName } = event.target;
    const category = event.target.innerText.toLowerCase();
    console.log("clicked category:", category);

    if (tagName !== "LI") return;
    
    setQuery((query) => {
      console.log("Old query:", query);
      return createQueryObject(query, { category });
    });
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>Categories</p>
      </div>
      <ul onClick={categoryHandler}>
        {categories.map((item) => (
          <li
            key={item.id}
            className={
              item.type.toLocaleLowerCase() == query?.category
                ? styles.selected
                : null
            }
          >
            {item.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
