import React from 'react';

export const OwnerDashboard: React.FC = () => {
  return (
    <div className="owner-dashboard">
      <h2>Tổng quan kinh doanh của tôi</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Tổng doanh thu tháng</h4>
          <p className="stat-value">12.450.000 đ</p>
        </div>
        <div className="stat-card">
          <h4>Số lượt đặt sân mới</h4>
          <p className="stat-value">34 lượt</p>
        </div>
        <div className="stat-card">
          <h4>Tỉ lệ lấp đầy</h4>
          <p className="stat-value">72%</p>
        </div>
      </div>
      
      <div className="dashboard-section mt-20">
        <h3>Lịch đặt sân sắp diễn ra</h3>
        <p>Kiểm tra danh sách lịch đặt sân hôm nay để chuẩn bị tiếp đón khách hàng tốt nhất.</p>
      </div>
    </div>
  );
};
