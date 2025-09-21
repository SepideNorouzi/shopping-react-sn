import { Navigate, Route, Routes } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import DetailsPage from "./pages/DetailsPage";
import CheckOutPage from "./pages/CheckOutPage";
import PageNotFound from "./pages/404";
// import ProductsProvider from "./context/ProductContext";
// import CartProider from "./context/CartContext";
import Layout from "./layout/Layout";

function App() {
  return (
    // <CartProider>
    // <ProductsProvider>
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<DetailsPage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Layout>
    // </ProductsProvider>
    // </CartProider>
  );
}

export default App;
