import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import SettingsPage from "./components/settings/SettingsBasic";
import SettingsLayout from "./pages/SettingsLayout";
import AfterLoginLayout from "./components/after-login/AfterLoginLayout";
import Explore from "./pages/Explore";
import { UserProvider } from "./contexts/UserContext";
import { UserProfileProvider } from "./contexts/UserProfileContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Creator from './pages/Creator';
import SettingsSubscriptions from './components/settings/SettingsSubscriptions';
import CollectionPostPage from './pages/CollectionPostPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SettingsFollowing from './components/settings/SettingsFollowing';
import Register from "./pages/Register";
import Login from "./pages/Login";
import ConfirmEmail from "./pages/ConfirmEmail";
import AudiencePage from './pages/AudiencePage';
import CreateCollection from './pages/CreateCollection';
import CollectionEditPage from './pages/CollectionEditPage';

function App() {
  return (
    <UserProvider>
      <UserProfileProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/confirm-email" element={<ConfirmEmail />} />
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
                <Route path="following" element={<SettingsFollowing />} />
                <Route path="more" element={<div className='text-gray-500 text-center py-12'>More section coming soon.</div>} />
              </Route>
              <Route path=":section" element={<Home />} />
              <Route path="creator/:username" element={<Creator />} />
              <Route path="creator/:username/create-collection" element={<CreateCollection />} />
              <Route path="creator/:username/audience" element={<AudiencePage />} />
              <Route path="post/:collectionId" element={<CollectionPostPage />} />
              <Route path="post/:collectionId/edit" element={<CollectionEditPage />} />
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
          <ToastContainer position="top-right" autoClose={3000} />
        </BrowserRouter>
      </UserProfileProvider>
    </UserProvider>
  );
}

export default App;
