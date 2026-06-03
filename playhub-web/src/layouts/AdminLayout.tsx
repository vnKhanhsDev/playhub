import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { STORAGE_KEYS } from '../config/constants';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const userJson = localStorage.getItem(STORAGE_KEYS.USER);
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    navigate('/login');
  };

  return (
    <div className="layout dashboard-layout">
      <aside className="sidebar admin-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="logo-text">PlayHub Admin</Link>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className="sidebar-link">Tổng quan hệ thống</Link>
          <Link to="/admin/owners" className="sidebar-link">Quản lý chủ sân</Link>
          <Link to="/admin/settings" className="sidebar-link">Cấu hình chung</Link>
          <Link to="/" className="sidebar-link back-home">Về trang chủ</Link>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn-logout-sidebar">Đăng xuất</button>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-title">Bảng quản trị hệ thống (Admin)</div>
          <div className="dashboard-user">
            <span className="badge badge-admin">Admin</span>
            <span>{user?.fullName || user?.username || 'Quản trị viên'}</span>
          </div>
        </header>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
