import React from 'react';

export const OwnerManagementPage: React.FC = () => {
  return (
    <div className="admin-owners-page">
      <h2>Quản lý danh sách đối tác chủ sân</h2>
      <p>Duyệt tài khoản đăng ký mới của chủ sân, khóa hoặc kích hoạt tài khoản.</p>

      <table className="data-table">
        <thead>
          <tr>
            <th>Tên đối tác</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Tên Cơ sở thể thao</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Trần Văn Thành</td>
            <td>thanh.tran@gmail.com</td>
            <td>0909123456</td>
            <td>Sky Sport Complex</td>
            <td><span className="badge badge-success">Đã duyệt</span></td>
            <td>
              <button className="btn-action delete">Khóa tài khoản</button>
            </td>
          </tr>
          <tr>
            <td>Lê Hoàng Nam</td>
            <td>nam.lh@gmail.com</td>
            <td>0988776655</td>
            <td>Nam Sport Club</td>
            <td><span className="badge badge-warning">Chờ duyệt</span></td>
            <td>
              <button className="btn-action edit">Duyệt tài khoản</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
