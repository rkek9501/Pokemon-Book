import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <h1>
      <Link to={'/'}>포켓몬 도감</Link>
    </h1>
  );
};

export default Header;
