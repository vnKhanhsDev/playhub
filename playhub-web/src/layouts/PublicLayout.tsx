import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { STORAGE_KEYS } from '../config/constants';
import playhubLogo from '../assets/playhub-logo-light.png';
import styles from './PublicLayout.module.css';

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
    <div className={`layout ${styles.publicLayout}`}>
      {/* ===== HEADER ===== */}
      <header className={styles.header}>
        {/* --- Sub Navigation --- */}
        <div className={styles.subnav}>
          <div className={styles.subnavContainer}>
            <ul className={styles.subnavLeft}>
              <li>
                <Link to="/owner/dashboard" className={styles.subnavLink}>Kênh Chủ Sân</Link>
              </li>
              <li className={styles.subnavDivider}>|</li>
              <li>
                <span className={styles.subnavLink} onClick={() => alert('Chức năng Trở thành Chủ sân sắp ra mắt!')}>Trở thành Chủ sân</span>
              </li>
              <li className={styles.subnavDivider}>|</li>
              <li>
                <span className={styles.subnavLink} onClick={() => alert('Chức năng Kết nối sắp ra mắt!')}>Kết nối</span>
              </li>
            </ul>

            <ul className={styles.subnavRight}>
              <li>
                <span className={styles.subnavLink} onClick={() => alert('Thông báo')}>
                  <i className="ti ti-bell" aria-hidden="true"></i> Thông Báo
                </span>
              </li>
              <li className={styles.subnavDivider}></li>
              <li>
                <span className={styles.subnavLink} onClick={() => alert('Hỗ trợ')}>
                  <i className="ti ti-help-circle" aria-hidden="true"></i> Hỗ Trợ
                </span>
              </li>
              <li className={styles.subnavDivider}></li>
              {token && user ? (
                <>
                  <li>
                    <span className={styles.subnavUser}>
                      <i className="ti ti-user-circle" aria-hidden="true"></i> {user.fullName || user.username}
                    </span>
                  </li>
                  <li className={styles.subnavDivider}>|</li>
                  <li>
                    <span className={styles.subnavLogout} onClick={handleLogout}>Đăng xuất</span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <span className={styles.subnavLink} onClick={() => navigate('/register')}>Đăng Ký</span>
                  </li>
                  <li className={styles.subnavDivider}>|</li>
                  <li>
                    <span className={styles.subnavLink} onClick={() => navigate('/login')}>Đăng Nhập</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* --- Main Navigation --- */}
        <nav className={styles.mainnav}>
          <div className={styles.mainnavContainer}>
            {/* Logo */}
            <Link to="/" className={styles.mainnavLogo}>
              <img src={playhubLogo} alt="PlayHub" className={styles.logoImg} />
            </Link>

            {/* Navigation Links */}
            <ul className={styles.mainnavLinks}>
              <li>
                <Link to="/courts" className={styles.mainnavLink}>
                  <i className="ti ti-compass" aria-hidden="true"></i>
                  Khám phá sân
                </Link>
              </li>
              <li>
                <span className={styles.mainnavLink} onClick={() => alert('Cộng đồng thể thao đang được phát triển!')}>
                  <i className="ti ti-users-group" aria-hidden="true"></i>
                  Cộng đồng
                </span>
              </li>
              <li>
                <span className={styles.mainnavLink} onClick={() => alert('Chức năng Giải đấu sắp ra mắt!')}>
                  <i className="ti ti-trophy" aria-hidden="true"></i>
                  Giải đấu
                </span>
              </li>
              <li>
                <span className={styles.mainnavLink} onClick={() => alert('Chính sách & Điều khoản')}>
                  <i className="ti ti-file-text" aria-hidden="true"></i>
                  Chính sách & Điều khoản
                </span>
              </li>
            </ul>

            {/* Booking Icon */}
            <div className={styles.mainnavActions}>
              <Link to="/booking-history" className={styles.bookingIcon} title="Đơn đặt sân">
                <i className="ti ti-calendar-check" aria-hidden="true"></i>
                <span className={styles.bookingLabel}>Đơn đặt sân</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogo}>PlayHub</div>
          <div className={styles.footerCopy}>© {new Date().getFullYear()} PlayHub. All rights reserved.</div>
          <div className={styles.footerLinks}>
            <span className={styles.footerLinkItem} onClick={() => alert('Điều khoản sử dụng')}>Điều khoản</span>
            <span className={styles.footerLinkItem} onClick={() => alert('Chính sách bảo mật')}>Bảo mật</span>
            <span className={styles.footerLinkItem} onClick={() => alert('Liên hệ: support@playhub.vn')}>Liên hệ</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
