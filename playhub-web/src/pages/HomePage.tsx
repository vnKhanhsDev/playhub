import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <section className="hero-section">
        <h1>Chào mừng bạn đến với PlayHub</h1>
        <p>Tìm kiếm và đặt sân thể thao nhanh chóng, dễ dàng. Kết nối với những người chơi khác và tham gia các giải đấu hấp dẫn.</p>
        <div className="hero-buttons">
          <Link to="/courts" className="btn-primary-large">Khám phá sân ngay</Link>
        </div>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <h3>Đặt sân dễ dàng</h3>
          <p>Tìm kiếm sân trống gần bạn, chọn khung giờ phù hợp và thanh toán trực tuyến nhanh gọn.</p>
        </div>
        <div className="feature-card">
          <h3>Dành cho Chủ sân</h3>
          <p>Quản lý lịch đặt, cơ sở vật chất, doanh thu một cách hiệu quả và tự động hóa.</p>
        </div>
        <div className="feature-card">
          <h3>Đội nhóm & Giải đấu</h3>
          <p>Mở rộng kết nối thể thao, xây dựng profile player chuyên nghiệp và thi đấu cọ xát (Sắp ra mắt).</p>
        </div>
      </section>
    </div>
  );
};
