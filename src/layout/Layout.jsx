import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./Layout.module.css";

function Layout({ children }) {
  const state = useSelector((store) => store.cart);
  return (
    <>
      <header className={styles.header}>
        <Link to="/products" className={styles.title}>Index Shop</Link>
        <Link to="/checkout">
          <div>
            <PiShoppingCartSimpleBold />
            {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
          </div>
        </Link>
      </header>
      {children}
      <footer className={styles.footer}>Made with Love</footer>
    </>
  );
}

export default Layout;
