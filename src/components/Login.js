import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Login = ({ role }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [first, setFirst] = useState(true);

  const [resp, setResp] = useState({ status: 0 });
  const [error, setError] = useState('');

  const { email, password } = user;

  const onClick = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  function makeRequest() {
    if (role === 'student') {
      axios
        .post(`http://be-beta.vidshala.com/api/v1/users/login/user`, {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(`console from the ${res.data}`);
          console.log(`status: ${res.data.status}`);
          console.log(`message: ${res.data.message}`);
          setResp(res.data);
          setFirst(false);
          setError('');
        })
        .catch((err) => {
          setFirst(false);
          console.log(err);
          console.log(err.data);
          setError(err.message);
        });
    } else {
      axios
        .post(`http://be-beta.vidshala.com/api/v1/users/login/teacher`, {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          setResp(res.data);
          setError('');
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
        });
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    makeRequest();
  };

  return (
    <div className='form-container'>
      {error ? (
        <div className='allertt'>Incorrect Email format/ Email not found</div>
      ) : first ? null : resp.message === 'Login Successful' ? null : (
        <div className='allertt'> Password mismatch </div>
      )}
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={onClick}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onClick}
            minLength='6'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Login'
            className='btn btn-primary btn-block'
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
