import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
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
      <div className="profileContainer">
        <h4 data-testid="profile-email">
          { email }
        </h4>
        <div className="profileLinkContainer lineBottom">
          <div className="headerIcon headerDoneRecipesIcon" />
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ redirectToDoneRecipes }
            className="profileDoneRecipesLink"
          >
            Done Recipes
          </button>
        </div>
        <div className="profileLinkContainer">
          <div className="headerIcon headerFavoriteRecipesIcon" />
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ redirectToFavoriteRecipes }
            className="profileFavoriteRecipesLink"
          >
            Favorite Recipes
          </button>
        </div>
        <div className="profileLinkContainer lineTop">
          <div className="headerIcon headerLogoutIcon" />
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ logoutUser }
            className="profileLogoutLink"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  email: state.userInfo.email,
});

export default connect(mapStateToProps)(Profile);
