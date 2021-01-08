import React from 'react';
import PropTypes from 'prop-types';
import { HomeMain as Main } from '../../HomeMain';

const HomePage = (props) => {
  return (
    <>
      <Main pathname={props.location.pathname} />
    </>
  );
};

export default HomePage;

HomePage.propTypes = {
  location: PropTypes.object.isRequired,
};
