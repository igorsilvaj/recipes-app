import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { saveUser } from '../redux/actions';

function Login({ dispatch }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [willRedirect, setWillRedirect] = useState(false);
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const { email, password } = userLogin;
    const SIX = 6;
    const isEmailValid = email
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (isEmailValid && password.length > SIX) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [userLogin]);

  function handleChange({ target }) {
    const { value, name } = target;
    setUserLogin((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleClick() {
    const { email } = userLogin;
    localStorage.setItem('user', JSON.stringify({ email }));
    dispatch(saveUser(email));
    setWillRedirect(true);
  }

  return (
    <div>
      { willRedirect && <Redirect to="/meals" /> }
      <input
        onChange={ handleChange }
        name="email"
        type="text"
        data-testid="email-input"
        value={ userLogin.email }
      />
      <input
        onChange={ handleChange }
        name="password"
        type="password"
        data-testid="password-input"
        value={ userLogin.password }
      />
      <button
        disabled={ isButtonDisabled }
        onClick={ handleClick }
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
