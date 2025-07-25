import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFoundPage from './pages/NotFoundPage';

import 'coinley-checkout/dist/style.css'


import DashboardLayout from './components/dashboard/DashboardLayout';
import Explore from './pages/Explore';
import Bookings from './pages/Bookings';
import Teams from './pages/Teams';
import Community from './pages/Community';
import TransactionHistory from './pages/TransactionHistory';
import Reviews from './pages/Reviews';
import Profile from './pages/Profile';
import CreateTeam from './pages/CreateTeam';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Sessions from './pages/Sessions';
import FinOversight from './pages/FinOversight';
import DisputeResolution from './pages/DisputeResolution';


function App() {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow">
        <Routes>

          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />



          {/* 
            Protected routes with dashboard layout  */}
          <Route path="/" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />

          <Route path="/users" element={
            <DashboardLayout>
              <Users />
            </DashboardLayout>
          } />

          <Route path="/sessions" element={
            <DashboardLayout>
              <Sessions />
            </DashboardLayout>
          } />

          <Route path="/explore" element={
            <DashboardLayout>
              <Explore />
            </DashboardLayout>
          } />

          <Route path="/bookings" element={
            <DashboardLayout>
              <Bookings />
            </DashboardLayout>
          } />

          <Route path="/teams" element={
            <DashboardLayout>
              <Teams />
            </DashboardLayout>
          } />

          <Route path="/create-team" element={
            <DashboardLayout>
              <CreateTeam />
            </DashboardLayout>
          } />

          <Route path="/communities" element={
            <DashboardLayout>
              <Community />
            </DashboardLayout>
          } />

          <Route path="/financial-oversight" element={
            <DashboardLayout>
              <FinOversight />
            </DashboardLayout>
          } />

          <Route path="/dispute-resolution" element={
            <DashboardLayout>
              <DisputeResolution />
            </DashboardLayout>
          } />

          <Route path="/profile" element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          } />

        </Routes>
      </main>

    </div>

  );
}

export default App;


