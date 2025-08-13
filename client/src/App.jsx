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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/become-a-host" element={<HostChoiceLanding />} />
        <Route path="/host/choose" element={
          <PrivateRoute>
            <HostChoice />
          </PrivateRoute>
        } />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/host/home" element={
          <PrivateRoute>
            <HostIntro />
          </PrivateRoute>
        } />
        <Route path="/host/dashboard" element={
          <PrivateRoute>
            <HostDashboard />
          </PrivateRoute>
        } />
        <Route path="/host/home/property-type" element={
          <PrivateRoute>
            <PropertyType />
          </PrivateRoute>
        } />
        <Route path="/host/home/location" element={
          <PrivateRoute>
            <LocationStep />
          </PrivateRoute>
        } />
        <Route path="/host/home/basic-info" element={
          <PrivateRoute>
            <BasicInfo />
          </PrivateRoute>
        } />
        <Route path="/host/home/photos" element={
          <PrivateRoute>
            <PhotosUpload />
          </PrivateRoute>
        } />
        <Route path="/host/home/description" element={
          <PrivateRoute>
            <DescriptionStep />
          </PrivateRoute>
        } />
        <Route path="/host/home/price" element={
          <PrivateRoute>
            <PricePage />
          </PrivateRoute>
        } />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="light" />
    </Router>
  );
}

export default App;
