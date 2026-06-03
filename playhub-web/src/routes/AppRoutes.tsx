import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from '../config/constants';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { OwnerLayout } from '../layouts/OwnerLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Route guards
import { ProtectedRoute } from './ProtectedRoute';

// Public Pages
import { HomePage } from '../pages/HomePage';

// Auth Module
import { LoginPage } from '../modules/auth/pages/LoginPage';
import { RegisterPage } from '../modules/auth/pages/RegisterPage';

// Court Module Pages
import { CourtListPage } from '../modules/court/pages/CourtListPage';
import { CourtDetailPage } from '../modules/court/pages/CourtDetailPage';
import { OwnerCourtListPage } from '../modules/court/pages/OwnerCourtListPage';

// Booking Module Pages
import { BookingHistoryPage } from '../modules/booking/pages/BookingHistoryPage';
import { BookingSchedulePage } from '../modules/booking/pages/BookingSchedulePage';

// Owner Dashboard Pages
import { OwnerDashboard } from '../pages/owner/OwnerDashboard';

// Admin Dashboard Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { OwnerManagementPage } from '../pages/admin/OwnerManagementPage';
import { SystemSettingsPage } from '../pages/admin/SystemSettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Client/Player Portal Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Court browsing */}
        <Route path="/courts" element={<CourtListPage />} />
        <Route path="/courts/:id" element={<CourtDetailPage />} />

        {/* Protected Routes for Players */}
        <Route element={<ProtectedRoute allowedRoles={[UserRole.PLAYER, UserRole.OWNER, UserRole.ADMIN]} />}>
          <Route path="/booking-history" element={<BookingHistoryPage />} />
        </Route>
      </Route>

      {/* Protected Routes for Owners */}
      <Route element={<ProtectedRoute allowedRoles={[UserRole.OWNER]} />}>
        <Route element={<OwnerLayout />}>
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/courts" element={<OwnerCourtListPage />} />
          <Route path="/owner/bookings" element={<BookingSchedulePage />} />
        </Route>
      </Route>

      {/* Protected Routes for Admins */}
      <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/owners" element={<OwnerManagementPage />} />
          <Route path="/admin/settings" element={<SystemSettingsPage />} />
        </Route>
      </Route>

      {/* Fallback route - Redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
