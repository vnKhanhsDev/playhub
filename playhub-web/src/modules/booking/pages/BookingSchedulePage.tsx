import React from 'react';

export const BookingSchedulePage: React.FC = () => {
  return (
    <div className="owner-booking-schedule-page">
      <h2>Quản lý lịch đặt sân thể thao</h2>
      <p>Theo dõi và cập nhật trạng thái các yêu cầu đặt sân từ khách hàng.</p>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>Khách hàng</th>
            <th>Sân đặt</th>
            <th>Ngày thuê</th>
            <th>Khung giờ</th>
            <th>Số điện thoại</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nguyễn Văn A</td>
            <td>Sân A - Bóng cỏ 7</td>
            <td>04/06/2026</td>
            <td>18:00 - 19:30</td>
            <td>0987654321</td>
            <td><span className="badge badge-warning">Chờ duyệt</span></td>
            <td>
              <button className="btn-action edit" onClick={() => alert('Đã duyệt đơn hàng')}>Duyệt</button>
              <button className="btn-action delete" onClick={() => alert('Đã hủy đơn hàng')}>Hủy</button>
            </td>
          </tr>
          <tr>
            <td>Trần Thị B</td>
            <td>Sân B - Bóng cỏ 5</td>
            <td>04/06/2026</td>
            <td>17:00 - 18:30</td>
            <td>0912345678</td>
            <td><span className="badge badge-success">Đã duyệt</span></td>
            <td>
              <button className="btn-action delete" onClick={() => alert('Đã hủy đơn hàng')}>Hủy</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
