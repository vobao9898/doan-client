import React, { useEffect, useState } from 'react';
import './index.scss';

function HuongDanMuaHang(props) {
	return (
		<div className="HuongDanMuaHang">
			<div className="container">
  <div className="row">
    <div className="col-xs-12 col-sm-12 col-md-12">
      <div className="content-page rte">
        <p style={{ textAlign: "justify" }}>
          <strong>Bước 1:</strong> Truy cập website và lựa chọn sản phẩm cần mua
          để mua hàng
        </p>
        <p style={{ textAlign: "justify" }}>
          <strong>Bước 2:</strong> Click và sản phẩm muốn mua, màn hình hiển thị
          ra pop up với các lựa chọn sau
        </p>
        <p style={{ textAlign: "justify" }}>
          Nếu bạn muốn tiếp tục mua hàng: Bấm vào phần tiếp tục mua hàng để lựa
          chọn thêm sản phẩm vào giỏ hàng
        </p>
        <p style={{ textAlign: "justify" }}>
          Nếu bạn muốn xem giỏ hàng để cập nhật sản phẩm: Bấm vào xem giỏ hàng
        </p>
        <p style={{ textAlign: "justify" }}>
          Nếu bạn muốn đặt hàng và thanh toán cho sản phẩm này vui lòng bấm vào:
          Đặt hàng và thanh toán
        </p>
        <p style={{ textAlign: "justify" }}>
          <strong>Bước 3:</strong> Lựa chọn thông tin tài khoản thanh toán
        </p>
        <p style={{ textAlign: "justify" }}>
          Nếu bạn đã có tài khoản vui lòng nhập thông tin tên đăng nhập là email
          và mật khẩu vào mục đã có tài khoản trên hệ thống
        </p>
        <p style={{ textAlign: "justify" }}>
          Nếu bạn chưa có tài khoản và muốn đăng ký tài khoản vui lòng điền các
          thông tin cá nhân để tiếp tục đăng ký tài khoản. Khi có tài khoản bạn
          sẽ dễ dàng theo dõi được đơn hàng của mình
        </p>
        <p style={{ textAlign: "justify" }}>
          Nếu bạn muốn mua hàng mà không cần tài khoản vui lòng nhấp chuột vào
          mục đặt hàng không cần tài khoản
        </p>
        <p style={{ textAlign: "justify" }}>
          <strong>Bước 4:</strong> Điền các thông tin của bạn để nhận đơn hàng,
          lựa chọn hình thức thanh toán và vận chuyển cho đơn hàng của mình
        </p>
        <p style={{ textAlign: "justify" }}>
          <strong>Bước 5:</strong> Xem lại thông tin đặt hàng, điền chú thích và
          gửi đơn hàng
        </p>
        <p style={{ textAlign: "justify" }}>
          Sau khi nhận được đơn hàng bạn gửi chúng tôi sẽ liên hệ bằng cách gọi
          điện lại để xác nhận lại đơn hàng và địa chỉ của bạn.
        </p>
        <p style={{ textAlign: "justify" }}>Trân trọng cảm ơn.</p>
      </div>
    </div>
  </div>
</div>

		</div>
	);
}

export default HuongDanMuaHang;
