import React from 'react';
import { Link } from 'react-router-dom';

export interface Court {
  id: string;
  name: string;
  type: string;
  address: string;
  pricePerHour: number;
  image: string;
}

const MOCK_COURTS: Court[] = [
  {
    id: '1',
    name: 'Sân bóng đá cỏ nhân tạo PlayHub A',
    type: 'Bóng đá (Sân 7)',
    address: '123 Đường Số 1, Quận 7, TP. HCM',
    pricePerHour: 300000,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500',
  },
  {
    id: '2',
    name: 'Sân Cầu lông Sky Badminton',
    type: 'Cầu lông',
    address: '456 Đường Số 2, Bình Thạnh, TP. HCM',
    pricePerHour: 80000,
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500',
  },
  {
    id: '3',
    name: 'Sân Tennis PlayHub Complex',
    type: 'Tennis',
    address: '789 Đường Số 3, Quận 2, TP. HCM',
    pricePerHour: 200000,
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=500',
  },
];

export const CourtListPage: React.FC = () => {
  return (
    <div className="court-list-page">
      <h2>Danh sách sân thể thao</h2>
      <div className="search-filter-bar">
        <input type="text" placeholder="Tìm sân, địa điểm, môn thể thao..." className="search-input" />
        <select className="filter-select">
          <option value="">Tất cả môn thể thao</option>
          <option value="football">Bóng đá</option>
          <option value="badminton">Cầu lông</option>
          <option value="tennis">Tennis</option>
        </select>
      </div>

      <div className="courts-grid">
        {MOCK_COURTS.map((court) => (
          <div key={court.id} className="court-card">
            <div className="court-image-placeholder">⚽ 🎾 🏸</div>
            <div className="court-info">
              <h3>{court.name}</h3>
              <p className="court-type"><strong>Môn:</strong> {court.type}</p>
              <p className="court-address">📍 {court.address}</p>
              <p className="court-price">💰 {court.pricePerHour.toLocaleString('vi-VN')} đ/giờ</p>
              <Link to={`/courts/${court.id}`} className="btn-detail">Xem chi tiết</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
