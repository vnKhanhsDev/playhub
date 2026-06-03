import React from 'react';

export const SystemSettingsPage: React.FC = () => {
  return (
    <div className="admin-settings-page">
      <h2>Cấu hình hệ thống PlayHub</h2>
      
      <div className="settings-form">
        <div className="form-group">
          <label>Tên ứng dụng</label>
          <input type="text" defaultValue="PlayHub - Hệ thống đặt sân thể thao trực tuyến" />
        </div>
        <div className="form-group">
          <label>Phần trăm hoa hồng dịch vụ đặt sân (%)</label>
          <input type="number" defaultValue={5} />
        </div>
        <div className="form-group">
          <label>Email hỗ trợ kỹ thuật</label>
          <input type="email" defaultValue="support@playhub.com" />
        </div>
        <button className="btn-primary" onClick={() => alert('Đã lưu cấu hình!')}>Lưu cấu hình</button>
      </div>
    </div>
  );
};
