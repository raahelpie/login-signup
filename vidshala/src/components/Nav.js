import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className='navbar bg-primary'>
      <Link to='/'>
        <h3>Shiksha</h3>
      </Link>
    </div>
  );
};

export default Nav;
