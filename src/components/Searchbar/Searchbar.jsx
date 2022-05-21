import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { IoSearch, IoMoon, IoSunny } from 'react-icons/io5';

export function Searchbar({ onSubmit, changeTheme }) {
  const [searchQery, setSearchQery] = useState('');

  function handleSearchQuery(event) {
    setSearchQery(event.currentTarget.value.toLowerCase());
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (searchQery.trim() === '') {
      toast.error('The input field is empty!');
      return;
    }

    onSubmit(searchQery);
    setSearchQery('');
  }

  return (
    <header
      className={styles.Searchbar}
      id="search-bar"
      onSubmit={handleSubmit}
    >
      <form className={styles.SearchForm}>
        <button type="submit" className={styles['SearchForm-button']}>
          <span className={styles['SearchForm-button-label']}>Search</span>
          <IoSearch className={styles['SearchForm-icon']} />
        </button>

        <input
          className={styles['SearchForm-input']}
          type="text"
          name="searchQuery"
          value={searchQery}
          onChange={handleSearchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>

      <div className={styles.ThemeSwitcher}>
        <input
          className={styles['ThemeSwitcher-checkbox']}
          type="checkbox"
          onChange={changeTheme}
        />
        <IoSunny
          className={`${styles['SearchForm-icon']} ${styles['SearchForm-icon--sun']}`}
        />
        <IoMoon
          className={`${styles['SearchForm-icon']} ${styles['SearchForm-icon--moon']}`}
        />
      </div>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  changeTheme: PropTypes.func.isRequired,
};
