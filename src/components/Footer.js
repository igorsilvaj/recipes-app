import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  const redirectToMealList = () => {
    history.push('/meals');
  };

  const redirectToDrinkList = () => {
    history.push('/drinks');
  };

  return (
    <footer data-testid="footer" className="footer">
      <button
        onClick={ redirectToDrinkList }
        className="btnFooterDrink"
      >
        <img
          alt="Drink"
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          className="imgFooterDrink"
        />
      </button>
      <button
        onClick={ redirectToMealList }
        className="btnFooterMeal"
      >
        <img
          alt="Meal"
          src={ mealIcon }
          data-testid="meals-bottom-btn"
          className="imgFooterMeal"
        />
      </button>
    </footer>
  );
}
