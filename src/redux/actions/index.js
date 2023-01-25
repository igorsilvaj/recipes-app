export const SAVE_USER = 'SAVE_USER';
export const DONE_RECIPE = 'DONE_RECIPE';
export const FAVORITE_RECIPE = 'FAVORITE_RECIPE';
export const IN_PROGRESS_MEALS = 'IN_PROGRESS_MEALS';
export const IN_PROGRESS_DRINKS = 'IN-PROGRESS_DRINKS';

export const saveUser = (email) => ({
  type: SAVE_USER,
  email,
});

export const doneRecipe = (recipe) => ({
  type: DONE_RECIPE,
  recipe,
});

export const favoriteRecipe = (recipe) => ({
  type: FAVORITE_RECIPE,
  recipe,
});

export const inProgressMeal = (ingredients, id) => ({
  type: IN_PROGRESS_MEALS,
  ingredients,
  id,
});

export const inProgressDrink = (ingredients, id) => ({
  type: IN_PROGRESS_DRINKS,
  ingredients,
  id,
});
