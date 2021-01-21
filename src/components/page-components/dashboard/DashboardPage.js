import React from 'react';
import PropTypes from 'prop-types';
import { Dashboard } from '../../Dashboard';

const DashboardPage = (props) => {
  return (
    <>
      <Dashboard pathname={props.location.pathname} />
    </>
  );
};

export default DashboardPage;

DashboardPage.propTypes = {
  location: PropTypes.object.isRequired,
};
