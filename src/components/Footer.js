import React from "react";

const Footer = () => (
  <>
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__inner-text">
          Settle Up © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
