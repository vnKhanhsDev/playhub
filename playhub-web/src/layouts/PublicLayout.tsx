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
      {/* SportField Premium Navbar */}
      <nav className="nav-ds">
        <div className="nav-container-ds">
          <Link to="/" className="nav-logo-ds">
            <div className="nav-logo-icon-ds">
              <i className="ti ti-ball-football" aria-hidden="true"></i>
            </div>
            <span className="nav-logo-text-ds">SportField</span>
          </Link>
          
          <div className="nav-links-ds">
            <Link to="/courts" className="nav-link-item-ds">Khám phá sân</Link>
            <span className="nav-link-item-ds" onClick={() => alert('Chức năng Giải đấu sắp ra mắt!')}>Giải đấu</span>
            <span className="nav-link-item-ds" onClick={() => alert('Cộng đồng thể thao đang được phát triển!')}>Cộng đồng</span>
            {token && user ? (
              <>
                <Link to="/booking-history" className="nav-link-item-ds">Lịch sử đặt sân</Link>
                {user.role === 'OWNER' && (
                  <Link to="/owner/dashboard" className="nav-link-item-ds special-link">Cho chủ sân</Link>
                )}
                {user.role === 'ADMIN' && (
                  <Link to="/admin/dashboard" className="nav-link-item-ds special-link">Hệ thống Admin</Link>
                )}
              </>
            ) : (
              <Link to="/login" className="nav-link-item-ds">Cho chủ sân</Link>
            )}
          </div>

          <div className="nav-actions-ds">
            {token && user ? (
              <>
                <span className="user-welcome-ds">Xin chào, {user.fullName || user.username}</span>
                <button onClick={handleLogout} className="btn-logout-ds">Đăng xuất</button>
              </>
            ) : (
              <>
                <button className="btn-login-ds" onClick={() => navigate('/login')}>Đăng nhập</button>
                <button className="btn-register-ds" onClick={() => navigate('/register')}>Đăng ký</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content-ds">
        <Outlet />
      </main>

      {/* SportField Dark Footer */}
      <footer className="footer-ds">
        <div className="footer-container-ds">
          <div className="footer-logo-ds">SportField</div>
          <div className="footer-copy-ds">© {new Date().getFullYear()} SportField. All rights reserved.</div>
          <div className="footer-links-ds">
            <span className="footer-link-item-ds" onClick={() => alert('Điều khoản sử dụng')}>Điều khoản</span>
            <span className="footer-link-item-ds" onClick={() => alert('Chính sách bảo mật')}>Bảo mật</span>
            <span className="footer-link-item-ds" onClick={() => alert('Liên hệ: support@sportfield.com')}>Liên hệ</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
