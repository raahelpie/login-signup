import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const SignUp = ({ role }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    User: '',
    email: '',
    phoneNumber: '',
    targetClass: '',
    password: '',
  });

  const [first, setFirst] = useState(true);

  const [resp, setResp] = useState({});
  const [error, setError] = useState('');

  const {
    firstName,
    lastName,
    User,
    email,
    phoneNumber,
    targetClass,
    password,
  } = user;

  const onClick = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  function validNumber(phoneNumber) {
    const phoneno = /^[0-9]+$/;
    if (phoneno.test(phoneNumber)) {
      return true;
    } else {
      return false;
    }
  }

  function makeRequest() {
    if (role === 'student') {
      axios
        .post(`http://be-beta.vidshala.com/api/v1/users/sign-up/user`, {
          firstName: firstName,
          lastName: lastName,
          User: User,
          email: email,
          phoneNumber: phoneNumber,
          targetClass: targetClass,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          setResp(res.data);
          setFirst(false);
          setUser({
            firstName: '',
            lastName: '',
            User: '',
            email: '',
            phoneNumber: '',
            targetClass: '',
            password: '',
          });
          setError('');
        })
        .catch((err) => {
          setFirst(false);
          console.log(err);
          setError(err.message);
        });
    } else {
      axios
        .post(`http://be-beta.vidshala.com/api/v1/users/sign-up/teacher`, {
          firstName: firstName,
          lastName: lastName,
          User: User,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          setResp(res.data);
          setFirst(false);
          setUser({
            firstName: '',
            lastName: '',
            User: '',
            email: '',
            phoneNumber: '',
            targetClass: '',
            password: '',
          });
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
    if (validNumber(phoneNumber)) {
      makeRequest();
    } else {
      alert('Invalid phone number');
    }
  };

  return (
    <div className='form-container'>
      {error ? (
        <div className='allertt'>Email Format Error/Already A User</div>
      ) : first ? null : (
        <div className='goodreq'> Registration Successful </div>
      )}
      <h3>Register as a {role}</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onClick}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Last Name'
            name='lastName'
            value={lastName}
            onChange={onClick}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='User'
            name='User'
            value={User}
            onChange={onClick}
            required
          />
        </div>
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
            type='text'
            placeholder='Phone Number'
            name='phoneNumber'
            value={phoneNumber}
            onChange={onClick}
            maxLength='10'
            required
          />
        </div>
        {role === 'student' ? (
          <div className='form-group'>
            <input
              type='text'
              placeholder='Target Class'
              name='targetClass'
              value={targetClass}
              onChange={onClick}
              required
            />
          </div>
        ) : null}
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
            value='Register'
            className='btn btn-primary btn-block'
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
