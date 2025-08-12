import AuthPage from "./pages/AuthPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import HostIntro from "./pages/host/HostIntro";
import PropertyType from "./pages/host/PropertyType";
import LocationStep from "./pages/host/LocationStep";
import BasicInfo from "./pages/host/BasicInfo";
import PhotosUpload from "./pages/host/PhotosUpload";
import DescriptionStep from "./pages/host/DescriptionStep";
import HostDashboard from "./pages/host/Dashboard";
import PricePage from "./pages/host/PricePage";
import HostChoice from "./pages/host/HostChoice";
import HostChoiceLanding from "./pages/HostChoiceLanding";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/become-a-host" element={<HostChoiceLanding />} />
        <Route path="/host/choose" element={<HostChoice />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/host/home" element={<HostIntro />} />
        <Route path="/host/dashboard" element={<HostDashboard />} />
        <Route path="/host/home/property-type" element={<PropertyType />} />
        <Route path="/host/home/location" element={<LocationStep />} />
        <Route path="/host/home/basic-info" element={<BasicInfo />} />
        <Route path="/host/home/photos" element={<PhotosUpload />} />
        <Route path="/host/home/description" element={<DescriptionStep />} />
        <Route path="/host/home/price" element={<PricePage />} />
      </Routes>
    </Router>
  );
}

export default App;
