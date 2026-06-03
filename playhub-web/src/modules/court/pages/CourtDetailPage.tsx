import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const CourtDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="court-detail-page">
      <Link to="/courts" className="back-link">&larr; Quay lại danh sách</Link>
      
      <div className="court-detail-container">
        <h2>Chi tiết sân thể thao (ID: {id})</h2>
        <div className="court-gallery">
          <div className="court-main-image">[Hình ảnh sân bóng đá/cầu lông/tennis]</div>
        </div>
        
        <div className="court-details">
          <h3>Sân bóng đá cỏ nhân tạo PlayHub A</h3>
          <p><strong>Loại sân:</strong> Sân bóng đá mini 7 người</p>
          <p><strong>Địa chỉ:</strong> 123 Đường Số 1, Quận 7, TP. Hồ Chí Minh</p>
          <p><strong>Giá thuê:</strong> 300.000 đ/giờ</p>
          <p><strong>Giờ hoạt động:</strong> 06:00 - 22:00 hằng ngày</p>
          <p><strong>Tiện ích:</strong> Bãi đỗ xe ô tô, căng tin nước uống, phòng tắm, đèn chiếu sáng ban đêm tiêu chuẩn.</p>
        </div>

        <div className="booking-widget">
          <h3>Đặt sân này</h3>
          <div className="form-group">
            <label>Chọn ngày đặt</label>
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="form-group">
            <label>Chọn khung giờ</label>
            <select>
              <option>17:00 - 18:00 (Giờ cao điểm)</option>
              <option>18:00 - 19:30 (Giờ cao điểm)</option>
              <option>19:30 - 21:00 (Giờ cao điểm)</option>
              <option>08:00 - 09:30 (Giờ thường)</option>
            </select>
          </div>
          <button className="btn-primary-large" onClick={() => alert('Đặt sân thành công! (Mô phỏng)')}>
            Xác nhận đặt sân
          </button>
        </div>
      </div>
    </div>
  );
};
