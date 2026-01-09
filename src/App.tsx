import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./components";
import Reports from "./pages/Reports/Reports";
import Home from "./pages/Home/Home";
import Info from "./pages/Info/Info";
import Faq from "./pages/Faq/Faq";
import { DateFilterProvider } from "./context/DateFilterContext";

export default function App() {
  return (
    <BrowserRouter>
      <DateFilterProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/:id" element={<Reports />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </Layout>
      </DateFilterProvider>
    </BrowserRouter>
  );
}
