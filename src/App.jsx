import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AuthForm from './pages/Auth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import ProblemsListPage from './pages/ProblemsListPage.jsx';
import ProblemSolvePage from './pages/ProblemSolvePage.jsx'; 
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import UsersPage from './pages/UsersPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

// Ana iskeletimizi import edelim (DÜZELTME: .jsx uzantısı eklendi)
import DashboardLayout from './components/dashboard/DashboardLayout.jsx';

function App() {
  // ... (dosyanın geri kalanı aynı kalacak) ...
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} /> 
          <Route path="profil" element={<Profile />} />
          <Route path="problemler" element={<ProblemsListPage />} />
          <Route path="analizler" element={<AnalyticsPage />} />
          <Route path="kullanicilar" element={<UsersPage />} />
          <Route path="ayarlar" element={<SettingsPage />} />
          <Route path="problem/:problemId" element={<ProblemSolvePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;