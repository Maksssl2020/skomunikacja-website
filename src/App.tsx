import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import AppLayout from "./layout/AppLayout.tsx";
import Contact from "./pages/Contact.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/contact"} element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
