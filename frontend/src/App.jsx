import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />;
import ObservationDetails from "./components/ObservationDetails";
import CategoryPage from "./pages/CategoryPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserObservation from "./pages/UserObservation";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/your-observations" element={<UserObservation />} />
        <Route path="/details/:id" element={<ObservationDetails />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
