import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { STORAGE_KEYS } from '../config/constants';

export const OwnerLayout: React.FC = () => {
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
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/" className="logo-text">PlayHub Owner</Link>
        </div>
        <nav className="sidebar-nav">
          <Link to="/owner/dashboard" className="sidebar-link">Tổng quan</Link>
          <Link to="/owner/courts" className="sidebar-link">Quản lý sân</Link>
          <Link to="/owner/bookings" className="sidebar-link">Lịch đặt sân</Link>
          <Link to="/" className="sidebar-link back-home">Về trang chủ</Link>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn-logout-sidebar">Đăng xuất</button>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-title">Bảng điều khiển chủ sân</div>
          <div className="dashboard-user">
            <span>{user?.fullName || user?.username || 'Chủ sân'}</span>
          </div>
        </header>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
