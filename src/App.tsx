import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpLock from "./pages/SignUpLock";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpLock initialScreen="signUp" />} />
        <Route path="/login" element={<SignUpLock initialScreen="login" />} />
        <Route path="/" element={<LandingPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
