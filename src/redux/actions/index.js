export const SAVE_USER = 'SAVE_USER';
export const DONE_RECIPE = 'DONE_RECIPE';
export const FAVORITE_RECIPE = 'FAVORITE_RECIPE';
export const IN_PROGRESS_MEALS = 'IN_PROGRESS_MEALS';
export const IN_PROGRESS_DRINKS = 'IN-PROGRESS_DRINKS';
export const SAVE_DETAILS = 'SAVE_DETAILS';
export const START_REQUEST = 'START_REQUEST';
export const SUCESSFUL_REQUEST = 'SUCESSFUL_REQUEST';
export const FAIL_REQUEST = 'FAIL_REQUEST';
export const SAVE_RECIPES = 'SAVE_RECIPES';
export const SAVE_CATEGORIES = 'SAVE_CATEGORIES';

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

export const startRequest = () => ({ type: START_REQUEST });
export const successfulRequest = () => ({ type: SUCESSFUL_REQUEST });
export const failedRequest = (error) => ({ type: FAIL_REQUEST, error });
export const saveRecipes = (recipes) => ({ type: SAVE_RECIPES, recipes });
export const saveCategories = (categories) => ({ type: SAVE_CATEGORIES, categories });
export const saveDetails = (recipes) => ({ type: SAVE_DETAILS, recipes });

export const fetchApi = (url) => (
  async (dispatch) => {
    dispatch(startRequest());
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(successfulRequest());
      if (url.includes('list')) {
        dispatch(saveCategories(data));
      } else {
        dispatch(saveRecipes(data));
      }
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error));
    }
  }
);

export const fetchApi2 = (url) => (
  async (dispatch) => {
    dispatch(startRequest());
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(successfulRequest());
      dispatch(saveDetails(data));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error));
    }
  }
);

export const FILTER_CATEGORY = 'FILTER_CATEGORY';
export const filterCategory = (category) => ({ type: FILTER_CATEGORY, category });
