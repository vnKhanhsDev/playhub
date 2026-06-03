import React from 'react';

export const BookingHistoryPage: React.FC = () => {
  return (
    <div className="booking-history-page">
      <h2>Lịch sử đặt sân của tôi</h2>
      <p>Danh sách các đơn đặt sân bạn đã thực hiện trên hệ thống.</p>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Tên sân</th>
            <th>Ngày đặt</th>
            <th>Khung giờ</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#BK-1002</td>
            <td>Sân bóng đá cỏ nhân tạo PlayHub A</td>
            <td>04/06/2026</td>
            <td>18:00 - 19:30</td>
            <td>450.000 đ</td>
            <td><span className="badge badge-success">Đã xác nhận</span></td>
          </tr>
          <tr>
            <td>#BK-0985</td>
            <td>Sân Cầu lông Sky Badminton</td>
            <td>01/06/2026</td>
            <td>19:00 - 21:00</td>
            <td>160.000 đ</td>
            <td><span className="badge badge-secondary">Đã hoàn thành</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
