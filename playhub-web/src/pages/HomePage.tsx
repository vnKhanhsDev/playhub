import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSport, setActiveSport] = useState('Bóng đá');

  const sports = ['Bóng đá', 'Cầu lông', 'Pickleball', 'Tennis', 'Bóng rổ', 'Bóng chuyền', 'Padel'];

  const featuredCourts = [
    {
      id: '1',
      name: 'Sân Mỹ Đình Arena',
      badge: 'Còn sân',
      badgeType: 'open',
      location: 'Nam Từ Liêm, HN',
      price: '180.000đ',
      rating: '4.8',
      iconClass: 'ti ti-ball-football',
    },
    {
      id: '2',
      name: 'CLB Cầu lông Tây Hồ',
      badge: 'Hot',
      badgeType: 'hot',
      location: 'Tây Hồ, HN',
      price: '80.000đ',
      rating: '4.9',
      iconClass: 'ti ti-tournament',
    },
    {
      id: '3',
      name: 'Sân Bóng rổ Hoàn Kiếm',
      badge: 'Hết sân',
      badgeType: 'full',
      location: 'Hoàn Kiếm, HN',
      price: '120.000đ',
      rating: '4.7',
      iconClass: 'ti ti-play-basketball',
      disabled: true,
    },
  ];

  return (
    <div className="homepage-ds">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-eyebrow">
          <span className="hero-dot"></span>Nền tảng đặt sân thể thao #1 Việt Nam
        </div>
        <h1 className="hero-title">
          Tìm sân. Đặt lịch.<br />
          <span>Thi đấu ngay.</span>
        </h1>
        <p className="hero-sub">
          Hơn 500 sân thể thao chất lượng trong tầm tay. Đặt sân trong 30 giây, xác nhận tức thì.
        </p>
        <div className="hero-cta">
          <button className="btn-hero" onClick={() => navigate('/courts')}>
            <i className="ti ti-search" aria-hidden="true"></i> Tìm sân ngay
          </button>
          <button className="btn-hero-orange" onClick={() => alert('Chương trình ưu đãi!')}>
            Ưu đãi hôm nay
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">500+</div>
            <div className="stat-lbl">Sân thể thao</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">12k+</div>
            <div className="stat-lbl">Người chơi</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">98%</div>
            <div className="stat-lbl">Hài lòng</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">24/7</div>
            <div className="stat-lbl">Hỗ trợ</div>
          </div>
        </div>
      </section>

      {/* Search Bar Widget */}
      <div className="search-bar-widget">
        <div className="search-field-col">
          <span className="search-field-label">Môn thể thao</span>
          <span className="search-field-val">{activeSport}</span>
        </div>
        <div className="search-field-divider"></div>
        <div className="search-field-col">
          <span className="search-field-label">Khu vực</span>
          <span className="search-field-val">Hà Nội</span>
        </div>
        <div className="search-field-divider"></div>
        <div className="search-field-col">
          <span className="search-field-label">Ngày & giờ</span>
          <span className="search-field-val">Hôm nay, 18:00</span>
        </div>
        <button className="btn-search-trigger" onClick={() => navigate('/courts')}>
          <i className="ti ti-search" aria-hidden="true"></i> Tìm sân
        </button>
      </div>

      {/* Sports Categories Section */}
      <section className="sports-selection-section">
        <div className="sports-chips-row">
          {sports.map((sport) => (
            <span
              key={sport}
              className={`sport-chip-item ${activeSport === sport ? 'active' : ''}`}
              onClick={() => setActiveSport(sport)}
            >
              {sport}
            </span>
          ))}
        </div>

        <div className="section-head-row">
          <h2 className="section-title-text">Sân nổi bật hôm nay</h2>
          <span className="section-link-action" onClick={() => navigate('/courts')}>
            Xem tất cả <i className="ti ti-arrow-right" aria-hidden="true"></i>
          </span>
        </div>

        <div className="featured-courts-grid">
          {featuredCourts.map((court) => (
            <div key={court.id} className="court-card-item">
              <div className="court-image-header">
                <i className={court.iconClass} aria-hidden="true"></i>
              </div>
              <div className="court-card-content">
                <div className="court-title-row">
                  <span className="court-name-text">{court.name}</span>
                  <span className={`court-badge-tag badge-${court.badgeType}`}>{court.badge}</span>
                </div>
                <div className="court-location-row">
                  <i className="ti ti-map-pin" aria-hidden="true"></i> {court.location}
                </div>
                <div className="court-price-rating-row">
                  <div className="court-price-text">
                    {court.price} <span>/ giờ</span>
                  </div>
                  <div className="court-rating-text">
                    <i className="ti ti-star" aria-hidden="true"></i> {court.rating}
                  </div>
                </div>
                {court.disabled ? (
                  <button className="btn-court-action disabled" disabled>
                    Hết khung giờ
                  </button>
                ) : (
                  <button className="btn-court-action" onClick={() => navigate(`/courts/${court.id}`)}>
                    Đặt sân
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Owner Banner */}
      <div className="owner-promo-banner">
        <div className="owner-promo-left">
          <div className="owner-promo-icon">
            <i className="ti ti-building-stadium" aria-hidden="true"></i>
          </div>
          <div>
            <div className="owner-promo-title">Bạn là chủ sân thể thao?</div>
            <div className="owner-promo-desc">
              Đăng sân miễn phí, quản lý lịch thông minh, tiếp cận hàng nghìn người chơi.
            </div>
          </div>
        </div>
        <button className="btn-owner-promo" onClick={() => navigate('/login')}>
          Đăng sân ngay
        </button>
      </div>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="how-title-text">Đặt sân chỉ 3 bước</h2>
        <div className="how-steps-grid">
          <div className="how-step-card">
            <div className="how-step-icon">
              <i className="ti ti-search" aria-hidden="true"></i>
            </div>
            <div className="how-step-label">Tìm sân phù hợp</div>
            <div className="how-step-desc">Lọc theo môn, khu vực và khung giờ bạn muốn</div>
          </div>
          <div className="how-step-card">
            <div className="how-step-icon">
              <i className="ti ti-calendar" aria-hidden="true"></i>
            </div>
            <div className="how-step-label">Chọn và đặt lịch</div>
            <div className="how-step-desc">Xác nhận ngay lập tức, không cần gọi điện</div>
          </div>
          <div className="how-step-card">
            <div className="how-step-icon">
              <i className="ti ti-ball-football" aria-hidden="true"></i>
            </div>
            <div className="how-step-label">Ra sân thi đấu</div>
            <div className="how-step-desc">Nhận thông báo nhắc lịch và đến sân đúng giờ</div>
          </div>
        </div>
      </section>
    </div>
  );
};
