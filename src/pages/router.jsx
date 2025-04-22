import { Route, Routes } from "react-router-dom";

// Routes URLs
import { ROUTES } from "../constants/routes";

// Components

import Home from "./Home";
import Layout from "@/components/Layout";
import About from "./About";
import Stores from "./Stores";

import SingleProduct from "./SingleProduct";
import Products from "./Products";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.about} element={<About />} />
        <Route path={ROUTES.stores} element={<Stores />} />
        <Route path={ROUTES.products} element={<Products />} />
        <Route path={ROUTES.singleProduct} element={<SingleProduct />} />
      </Route>
    </Routes>
  );
}
