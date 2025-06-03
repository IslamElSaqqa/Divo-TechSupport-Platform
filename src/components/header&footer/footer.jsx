import React from "react";

const FooterLogoSection = () => {
  return (
    <div className="footer-logo-section">
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1746550701/DIVO-White_logo_cv7rq0.png"
          alt="Divo Logo"
          className="divo-logo"
        />
      </div>
    </div>
  );
};

const FooterSupportSection = () => {
  return (
    <div className="footer-support-section">
      <h2 className="support-title">Support</h2>
      <div className="support-content">
        <p className="support-text">
          19 Mohamed El serafy st,
          <br /> Sidi Beshr, Alex, Egypt
        </p>
        <a
          href="divomobilerepairs@gmail.com
"
          className="support-link"
        >
          divomobilerepairs@gmail.com
        </a>
        <a href="tel:+01556381767" className="support-link">
          +20155-638-1767
        </a>
      </div>
    </div>
  );
};

const FooterAccountSection = () => {
  return (
    <div className="footer-account-section">
      <h2 className="footer-account-title">Account</h2>
      <div className="footer-account-links">
        <a href="/profile-page" className="footer-account-link">
          My Account
        </a>
        <a href="/login" className="footer-account-link">
          Login / Register
        </a>
      </div>
    </div>
  );
};

const FooterQuickLinkSection = () => {
  return (
    <div className="footer-quick-link-section">
      <h2 className="quick-link-title">Quick Link</h2>
      <div className="quick-link-items">
        <a href="/privacy-policy" className="quick-link-item">
          Privacy Policy
        </a>
        <a href="/contact-us" className="quick-link-item">
          Contact us
        </a>
        <a href="/about-us" className="quick-link-item">
          About us
        </a>
      </div>
    </div>
  );
};



const Footer = () => {
  return (
    <div className="footer-layout">
      <div className="footer-sections">
        <FooterLogoSection />
        <FooterSupportSection />
        <FooterAccountSection />
        <FooterQuickLinkSection />
      </div>
    </div>
  );
};

export default Footer;
