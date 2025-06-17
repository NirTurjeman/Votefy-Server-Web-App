import { Routes, Route, Navigate } from 'react-router-dom';
import PollListPage from './pages/PollListPage';
import PollDetailPage from './pages/PollDetailPage';
import AuthPage from './pages/AuthPage';
import React from 'react';
import CreateAdminPage from './pages/CreateAdminPage';
import CreatePollPage from './pages/CreatePollPage';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/auth" />;
};


function App() {
  return (
   <Routes>
  <Route path="/auth" element={<AuthPage />} />
  <Route
    path="/"
    element={
      <PrivateRoute>
        <PollListPage />
      </PrivateRoute>
    }
  />
  <Route
    path="/poll/:pollId"
    element={
      <PrivateRoute>
        <PollDetailPage />
      </PrivateRoute>
    }
  />
  <Route
    path="/create-admin"
    element={
      <PrivateRoute>
        <CreateAdminPage />
      </PrivateRoute>
    }
  />
  <Route
    path="/create-poll"
    element={
      <PrivateRoute>
        <CreatePollPage />
      </PrivateRoute>
    }
  />
</Routes>
  );
}

export default App;
