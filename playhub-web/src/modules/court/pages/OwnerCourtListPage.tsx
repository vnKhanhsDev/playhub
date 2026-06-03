import React from 'react';

export const OwnerCourtListPage: React.FC = () => {
  return (
    <div className="owner-courts-page">
      <div className="page-header-actions">
        <h2>Quản lý danh sách sân của tôi</h2>
        <button className="btn-primary" onClick={() => alert('Chức năng thêm sân mới')}>+ Thêm sân mới</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Tên sân</th>
            <th>Môn thể thao</th>
            <th>Bảng giá</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sân bóng đá cỏ nhân tạo PlayHub A</td>
            <td>Bóng đá (Sân 7)</td>
            <td>300.000đ / giờ</td>
            <td><span className="badge badge-success">Đang hoạt động</span></td>
            <td>
              <button className="btn-action edit">Sửa</button>
              <button className="btn-action delete">Tạm dừng</button>
            </td>
          </tr>
          <tr>
            <td>Sân bóng đá cỏ nhân tạo PlayHub B</td>
            <td>Bóng đá (Sân 5)</td>
            <td>200.000đ / giờ</td>
            <td><span className="badge badge-success">Đang hoạt động</span></td>
            <td>
              <button className="btn-action edit">Sửa</button>
              <button className="btn-action delete">Tạm dừng</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
