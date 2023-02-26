import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import { saveUser } from '../redux/actions';
import logo from '../images/png/logoRecipesAppLogin.png';

function Login({ dispatch }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [willRedirect, setWillRedirect] = useState(false);
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const l1 = `Para efetuar login utilize qualquer email e senha.`;
    const l2 = `Ex: teste@teste.com 1234567`;
    const l3 = `Site desenvolvido durante curso de front-end com foco no mobile.`;
    const l4 = `Para o CSS foi utilizado o protótipo do figma com layout 360x640px.`;
    Swal.fire({
      title: 'Aproveite o App de Receitas',
      icon: 'success',
      html: `<div>${l1}</div>
             <br>
             <div><strong>${l2}</strong></div>
             <br>
             <div>${l3}</div>
             <br>
             <div>${l4}</div>`,
    });
  }, []);

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
    <div className="loginContainer">
      <div className="loginBox">
        <div>
          <img src={ logo } alt="logo" className="loginLogo" />
        </div>
        { willRedirect && <Redirect to="/meals" /> }
        <input
          onChange={ handleChange }
          className="inputEmail"
          name="email"
          type="text"
          data-testid="email-input"
          value={ userLogin.email }
          placeholder="Email"
        />
        <input
          onChange={ handleChange }
          className="inputPass"
          name="password"
          type="password"
          data-testid="password-input"
          value={ userLogin.password }
          placeholder="Password"
        />
        <button
          disabled={ isButtonDisabled }
          className="btnLogin"
          onClick={ handleClick }
          type="button"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
