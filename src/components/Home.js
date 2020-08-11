import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

const Home = () => {
  const [role, setRole] = useState('student');

  const updateRole = (e) => {
    setRole(e.target.value);
  };

  return (
    <div>
      <div>
        <h3>Login</h3>
        <div className='role-radio'>
          <div>
            <input
              type='radio'
              name='role'
              value='student'
              checked={role === 'student'}
              onChange={updateRole}
            />
            {'   '}
            <label>Student</label>
          </div>
          <div>
            <input
              type='radio'
              name='role'
              value='teacher'
              checked={role === 'teacher'}
              onChange={updateRole}
            />
            {'   '}
            <label>Teacher</label>
          </div>
        </div>
        <Login role={role} />
      </div>
      <div style={{ textAlign: 'center' }}>First Time User? Register Below</div>
      <div style={{ textAlign: 'center' }}>
        <Link to='/student-signup' className='btn btn-primary'>
          I want to register as student
        </Link>
        <Link to='/teacher-signup' className='btn btn-primary'>
          I want to register as teacher
        </Link>
      </div>
    </div>
  );
};

export default Home;
