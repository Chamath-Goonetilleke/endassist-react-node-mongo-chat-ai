import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { useAuth } from "./context/AuthProvider";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import AboutUsPage from "./pages/AboutUsPage";
import PersonalizedCarePage from "./pages/PersonalizedCarePage";
import ChatDrawer from "./components/ChatDrawer";
import DietaryPlanPage from "./pages/DietaryPlanPage";
import EndometriosisResourcePage from "./pages/EndometriosisResourcePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function ProtectedRoute({ element }) {
  const { user, token } = useAuth();
  return user && token ? element : <Navigate to="/login" replace />;
}

function App() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        {user == null ? (
          <Route path="/" element={<LandingPage />} />
        ) : (
          <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
        )}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/personalized-care" element={<PersonalizedCarePage />} />
        <Route path="/diagnosis" element={<ChatDrawer />} />
        <Route path="/dietary-plan" element={<DietaryPlanPage />} />
        <Route path="/edu-resource" element={<EndometriosisResourcePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
      <ToastContainer position="top-right" />
      <Footer />
    </>
  );
}

export default App;
