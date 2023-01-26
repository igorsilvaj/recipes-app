import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import footer from './Footer.css';

export default function Footer() {
  const history = useHistory();
  const redirectToMealList = () => {
    history.push('/meals');
  };

  const redirectToDrinkList = () => {
    history.push('/drinks');
  };

  return (
    <footer data-testid="footer" className={ footer }>
      <button
        onClick={ redirectToMealList }
      >
        <img alt="Meal" src={ mealIcon } data-testid="meals-bottom-btn" />
      </button>
      <button
        onClick={ redirectToDrinkList }
      >
        <img alt="Drink" src={ drinkIcon } data-testid="drinks-bottom-btn" />
      </button>
    </footer>
  );
}
