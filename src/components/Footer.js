import React from 'react';

const Footer = () => (
  <>
    <footer className='footer'>
      <div className='footer__container'>
        <div className='footer__col-container'>
          <div className='footer__cta-text-container'>
            <h2 className='footer__cta-text'>
              Want a sample Podcap summary?
              <span className='footer__cta-text-span'> Get in touch.</span>
            </h2>
          </div>
          <div className='footer__cta-button-container'>
            <a
              href="mailto:austin@podcap.io?subject=Hi%20Podcap%2C%20where%20have%20you%20been%20all%20my%20life%3F%20Let's%20talk."
              className='footer__cta-button'
            >
              Try Podcap Today!
            </a>
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
