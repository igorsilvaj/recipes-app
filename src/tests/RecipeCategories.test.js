import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testes do componente RecipeCategories', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });
    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => { });

    // renderWithRouterAndRedux(<App />, {}, '/meals');
    // const btnEnableSearch = screen.getByTestId(searchTopBtn);
    // expect(btnEnableSearch).toBeVisible();
    // userEvent.click(btnEnableSearch);
  });
  it('', () => {
    renderWithRouterAndRedux(<App />, {}, '/meals');
  });
});
