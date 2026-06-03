import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { STORAGE_KEYS } from '../config/constants';

export const PublicLayout: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const userJson = localStorage.getItem(STORAGE_KEYS.USER);
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    navigate('/login');
  };

  return (
    <div className="layout public-layout">
      <header className="header">
        <div className="container header-container">
          <Link to="/" className="logo-text">PlayHub</Link>
          <nav className="nav">
            <Link to="/courts" className="nav-link">Sân thể thao</Link>
            {token && user ? (
              <>
                <Link to="/booking-history" className="nav-link">Lịch sử đặt sân</Link>
                {user.role === 'OWNER' && (
                  <Link to="/owner/dashboard" className="nav-link btn-dashboard">Chủ Sân Dashboard</Link>
                )}
                {user.role === 'ADMIN' && (
                  <Link to="/admin/dashboard" className="nav-link btn-dashboard">Admin Dashboard</Link>
                )}
                <span className="user-welcome">Xin chào, {user.fullName || user.username}</span>
                <button onClick={handleLogout} className="btn-logout">Đăng xuất</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Đăng nhập</Link>
                <Link to="/register" className="nav-link btn-register">Đăng ký</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="main-content container">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-container">
          <p>&copy; {new Date().getFullYear()} PlayHub. Hỗ trợ đặt sân và kết nối thể thao hàng đầu.</p>
        </div>
      </footer>
    </div>
  );
};
