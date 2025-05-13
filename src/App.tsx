import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpLock from "./pages/SignUpLock";
import Home from "./pages/Home";
import SettingsPage from "./pages/SettingsPage";
import SettingsLayout from "./pages/SettingsLayout";
import AfterLoginLayout from "./components/after-login/AfterLoginLayout";
import Explore from "./pages/Explore";
import { UserProvider } from "./contexts/UserContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Creator from './pages/Creator';
import SettingsSubscriptions from './pages/SettingsSubscriptions';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={
              <ProtectedRoute requireAuth={false}>
                <SignUpLock initialScreen="signUp" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <SignUpLock initialScreen="login" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/h"
            element={
              <ProtectedRoute>
                <AfterLoginLayout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="settings" element={<SettingsLayout />}>
              <Route index element={<Navigate to="basic" replace />} />
              <Route path="basic" element={<SettingsPage />} />
              <Route path="account" element={<div className='text-gray-500 text-center py-12'>Account section coming soon.</div>} />
              <Route path="email-notifications" element={<div className='text-gray-500 text-center py-12'>Email notifications section coming soon.</div>} />
              <Route path="subscriptions" element={<SettingsSubscriptions />} />
              <Route path="billing-history" element={<div className='text-gray-500 text-center py-12'>Billing history section coming soon.</div>} />
              <Route path="more" element={<div className='text-gray-500 text-center py-12'>More section coming soon.</div>} />
            </Route>
            <Route path=":section" element={<Home />} />
            <Route path="creator" element={<Creator />} />
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute requireAuth={false}>
                <LandingPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
