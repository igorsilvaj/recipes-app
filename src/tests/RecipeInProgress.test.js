import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
// import reduxState from './mocks/requestMeal';
import reduxState from './mocks/requestMeal';

describe('Testando componente <Header />', () => {
  it('', () => {
    renderWithRouterAndRedux(<App />, reduxState, '/meals/12345/in-progress');
    const init = screen.getByText(/recipeinprogress/i);
    expect(init).toBeInTheDocument();
  });
});
