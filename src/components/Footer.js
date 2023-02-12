import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/png/drinkIcon.png';
import mealIcon from '../images/png/mealIcon.png';

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
      <div className="footerBtnContainer">
        <button
          onClick={ redirectToDrinkList }
          className="btnFooterDrink"
          data-testid="drink-btn"
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
          data-testid="meals-btn"
        >
          <img
            alt="Meal"
            src={ mealIcon }
            data-testid="meals-bottom-btn"
            className="imgFooterMeal"
          />
        </button>
      </div>
    </footer>
  );
}
