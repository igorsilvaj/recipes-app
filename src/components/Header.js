import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import searchIcon from '../images/png/searchIcon.png';
import profileIcon from '../images/png/profileIcon.png';

function Header() {
  localStorage.getItem('user');

  const history = useHistory();
  const location = useLocation();
  const [hideBar, setHideBar] = useState(false);

  const redirectToProfile = () => {
    history.push('/profile');
  };

  const renderizeTittle = () => {
    let pageTittle = '';

    if (location.pathname === '/meals') {
      pageTittle = 'Meals';
      return pageTittle;
    } if (location.pathname === '/drinks') {
      pageTittle = 'Drinks';
      return pageTittle;
    } if (location.pathname === '/profile') {
      pageTittle = 'Profile';
      return pageTittle;
    } if (location.pathname === '/done-recipes') {
      pageTittle = 'Done Recipes';
      return pageTittle;
    } if (location.pathname === '/favorite-recipes') {
      pageTittle = 'Favorite Recipes';
      return pageTittle;
    }
  };

  const openSearchBar = () => {
    if (hideBar === true) {
      setHideBar(false);
    }
    if (hideBar === false) {
      setHideBar(true);
    }
  };

  return (
    <div className="headerContainer">
      <div className="headerTop">
        <div className="iconRecipesApp" />
        <div className="logoRecipesApp" />
        { (location.pathname !== '/profile'
              && location.pathname !== '/done-recipes'
              && location.pathname !== '/favorite-recipes')
          && (
            <button
              type="button"
              className="headerSearch"
              onClick={ openSearchBar }
            >
              <img alt="serachBarIcon" src={ searchIcon } data-testid="search-top-btn" />
            </button>
          )}
        <button
          type="button"
          className="headerProfile"
          onClick={ redirectToProfile }
        >
          <img alt="profileIcon" src={ profileIcon } data-testid="profile-top-btn" />
        </button>
      </div>
      <div className="pageTitle">
        <div className={ `headerIcon header${renderizeTittle().replace(' ', '')}Icon` } />
        <div className="headerFrontText" data-testid="page-title">
          {renderizeTittle()}
        </div>
      </div>
      {
        hideBar && <SearchBar />
      }
    </div>
  );
}

export default connect()(Header);
