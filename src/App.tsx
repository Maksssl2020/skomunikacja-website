import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import AppLayout from "./layout/AppLayout.tsx";
import Contact from "./pages/Contact.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import News from "./pages/News.tsx";
import Offer from "./pages/Offer.tsx";
import Products from "./pages/Products.tsx";
import TipsAndTricks from "./pages/TipsAndTricks.tsx";
import Shop from "./pages/Shop.tsx";
import LoRaPerformanceCalculator from "./pages/LoRaPerformanceCalculator.tsx";
import Article from "./pages/Article.tsx";
import ArticleForm from "./pages/ArticleForm.tsx";
import Product from "./pages/Product.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/news"} element={<News />} />
          <Route path={"/about-us"} element={<AboutUs />} />
          <Route path={"/offer"} element={<Offer />} />
          <Route path={"/products"} element={<Products />} />
          <Route path={"/tips-and-tricks"} element={<TipsAndTricks />} />
          <Route path={"/shop"} element={<Shop />} />
          <Route path={"/contact"} element={<Contact />} />
          <Route
            path={"/tips-and-tricks/lora-performance-calculator"}
            element={<LoRaPerformanceCalculator />}
          />
          <Route path={"/products/:productName"} element={<Product />} />
          <Route path={"/news/:articleTitle"} element={<Article />} />
          <Route path={"/admin/create-article"} element={<ArticleForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
