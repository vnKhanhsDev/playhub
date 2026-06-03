import React from 'react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <h2>Tổng quan hệ thống PlayHub</h2>
      <div className="stats-grid">
        <div className="stat-card admin-card">
          <h4>Tổng số người chơi</h4>
          <p className="stat-value">1,250</p>
        </div>
        <div className="stat-card admin-card">
          <h4>Tổng số chủ sân</h4>
          <p className="stat-value">48</p>
        </div>
        <div className="stat-card admin-card">
          <h4>Số sân đã đăng ký</h4>
          <p className="stat-value">112 sân</p>
        </div>
      </div>

      <div className="dashboard-section mt-20">
        <h3>Các hoạt động hệ thống gần đây</h3>
        <p>Hệ thống hoạt động ổn định. Không ghi nhận lỗi nghiêm trọng nào từ server API backend.</p>
      </div>
    </div>
  );
};
