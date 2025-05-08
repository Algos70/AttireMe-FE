import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpLock from "./pages/SignUpLock";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={<SignUpLock initialScreen="signUp" />}
        />
        <Route
          path="/login"
          element={<SignUpLock initialScreen="login" />}
        />
        <Route path="/h/home" element={<Home />} />
        <Route path="/h/:section" element={<Home />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
