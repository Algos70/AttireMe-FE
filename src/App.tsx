import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpLock from "./pages/SignUpLock";
import Home from "./pages/Home";
import SettingsPage from "./pages/SettingsPage";
import SettingsLayout from "./pages/SettingsLayout";
import { Sidebar } from "./components/after-login/Sidebar";
import AfterLoginLayout from "./components/after-login/AfterLoginLayout";
import Explore from "./pages/Explore";

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
        <Route path="/h" element={<AfterLoginLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="basic" replace />} />
            <Route path="basic" element={<SettingsPage />} />
            <Route path="account" element={<div className='text-gray-500 text-center py-12'>Account section coming soon.</div>} />
            <Route path="email-notifications" element={<div className='text-gray-500 text-center py-12'>Email notifications section coming soon.</div>} />
            <Route path="memberships" element={<div className='text-gray-500 text-center py-12'>Memberships section coming soon.</div>} />
            <Route path="billing-history" element={<div className='text-gray-500 text-center py-12'>Billing history section coming soon.</div>} />
            <Route path="more" element={<div className='text-gray-500 text-center py-12'>More section coming soon.</div>} />
          </Route>
          <Route path=":section" element={<Home />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
