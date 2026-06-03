import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { STORAGE_KEYS, UserRole } from '../../../config/constants';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // In a real scenario, we would call the authApi:
      // const response = await authApi.login({ username, password });
      // But for setup testing, if the backend is not running, we show a helpful message.
      setError('Backend API chưa sẵn sàng. Bạn có thể sử dụng tính năng "Mock Login" bên dưới để test nhanh giao diện.');
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to mock login for local interface testing
  const handleMockLogin = (role: UserRole) => {
    const mockUser = {
      id: `mock-${role.toLowerCase()}`,
      username: `${role.toLowerCase()}_test`,
      fullName: `Mock ${role.charAt(0) + role.slice(1).toLowerCase()}`,
      email: `${role.toLowerCase()}@playhub.com`,
      role: role,
    };
    localStorage.setItem(STORAGE_KEYS.TOKEN, 'mock-jwt-token');
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));

    if (role === UserRole.ADMIN) {
      navigate('/admin/dashboard');
    } else if (role === UserRole.OWNER) {
      navigate('/owner/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="auth-card">
      <h2>Đăng nhập PlayHub</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleLogin} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Nhập tên đăng nhập"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Nhập mật khẩu"
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
      </form>

      <p className="auth-redirect">
        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
      </p>

      <div className="mock-login-section">
        <p className="mock-title">Dành cho Developer (Mock Login nhanh):</p>
        <div className="mock-buttons">
          <button onClick={() => handleMockLogin(UserRole.PLAYER)} className="btn-mock player">
            Login với vai trò Player
          </button>
          <button onClick={() => handleMockLogin(UserRole.OWNER)} className="btn-mock owner">
            Login với vai trò Chủ sân
          </button>
          <button onClick={() => handleMockLogin(UserRole.ADMIN)} className="btn-mock admin">
            Login với vai trò Admin
          </button>
        </div>
      </div>
    </div>
  );
};
