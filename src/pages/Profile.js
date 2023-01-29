import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  // -- Inicialmente usei o Redux para pegar o e-mail do usuário.
  // -- Porem o requisito pede que seja do localStorage.
  const history = useHistory();
  // const { email } = JSON.parse(localStorage.getItem('user'));
  const storage = localStorage.getItem('user');
  const { email } = storage !== null && (JSON.parse(storage));

  const redirectToDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const redirectToFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('inProgressRecipes');

    history.push('/');
  };

  return (
    <>
      <Header />
      <Footer />
      <br />
      <br />
      <h4
        data-testid="profile-email"
      >
        { email }
      </h4>
      <br />
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ redirectToDoneRecipes }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ redirectToFavoriteRecipes }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logoutUser }
      >
        Logout
      </button>
    </>
  );
}

/* const mapDispatchToProps = (dispatch) => ({
  getData: (url) => dispatch(fetchApi(url)),
}); */

const mapStateToProps = (state) => ({
  email: state.userInfo.email,
});

export default connect(mapStateToProps)(Profile);
