import "./App.css";
import { LandingPage } from "./pages/landingPage/LandingPage";
import { LoginPage } from "./pages/loginPage/LoginPage";
import { SignupPage } from "./pages/signupPage/SignupPage";
import { BarberDashboard } from "./pages/barberDashboard/BarberDashboard";
import { CustomerDashboard } from "./pages/customerDashboard/CustomerDashboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/barber-dashboard" element={<BarberDashboard />} />
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
    </Routes>
  );
}

export default App;
