import React, { useState } from 'react';
import { HomeMain as Main } from '../../HomeMain';

const HomePage = (props) => {
  return (
    <>
      <Main pathname={props.location.pathname} />
    </>
  );
};

export default HomePage;
