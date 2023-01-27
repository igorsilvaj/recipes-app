import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import yellowCircleWithHeart from '../images/yellowCircleWithHeart.png';

function Header() {
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
      pageTittle = 'Done';
      return pageTittle;
    } if (location.pathname === '/favorite-recipes') {
      pageTittle = 'Favorites';
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
        <button
          onClick={ redirectToProfile }
          type="button"
        >
          <img alt="profileIcon" src={ profileIcon } data-testid="profile-top-btn" />
        </button>
        { (location.pathname !== '/profile'
              && location.pathname !== '/done-recipes'
              && location.pathname !== '/favorite-recipes')
          && (
            <button
              type="button"
              onClick={ openSearchBar }
            >
              <img alt="serachBarIcon" src={ searchIcon } data-testid="search-top-btn" />
            </button>
          )}
      </div>
      <img
        className="favoriteHeaderImg"
        src={ yellowCircleWithHeart }
        alt="checkMark"
      />
      <h2 data-testid="page-title">
        <div className="favoriteHeaderText">
          {renderizeTittle()}
        </div>
      </h2>
      {
        hideBar && <SearchBar />
      }
    </div>
  );
}

export default connect()(Header);
