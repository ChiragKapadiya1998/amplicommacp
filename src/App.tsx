import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./components";
import Loading from "./components/common/Loading/Loading";
import { DateFilterProvider } from "./context/DateFilterContext";

// import Home from "./pages/Home/Home";
const Home = lazy(() => import("./pages/Home/Home"));
const Reports = lazy(() => import("./pages/Reports/Reports"));
const Info = lazy(() => import("./pages/Info/Info"));
const Faq = lazy(() => import("./pages/Faq/Faq"));

export default function App() {
  return (
    <BrowserRouter>
      <DateFilterProvider>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports/:id" element={<Reports />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/info" element={<Info />} />
            </Routes>
          </Suspense>
        </Layout>
      </DateFilterProvider>
    </BrowserRouter>
  );
}
