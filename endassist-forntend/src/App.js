import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/common/Header";
import Layout from "./components/common/Layout";
import Footer from "./components/common/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
