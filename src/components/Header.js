import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import { withRouter } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className='header'>
      <Navigation pathname={props.location.pathname} />
    </header>
  );
};

// wrap Header component in withRouter wrapper to gain access to history, match, and location
export default withRouter(Header);

Header.propTypes = {
  location: PropTypes.object.isRequired,
};
