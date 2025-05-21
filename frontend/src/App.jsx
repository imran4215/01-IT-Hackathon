import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />;
import ObservationDetails from "./components/ObservationDetails";
import CategoryPage from "./pages/CategoryPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/details/:id" element={<ObservationDetails />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}
