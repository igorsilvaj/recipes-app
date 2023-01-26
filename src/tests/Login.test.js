import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';

describe('Testa a página de login', () => {
  test('Verifica se os inputs e o botão são renderizados', () => {
    render(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });
});
