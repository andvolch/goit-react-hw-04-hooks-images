import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import s from './Searchbar.module.css';


export default function Searchbar({ onSubmit }) {
  
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return toast.error('Enter a normal query!');
    }
    onSubmit(query);
    setQuery('');
  };

  const handlEqueryChange = e => {
    setQuery(e.target.value.toLowerCase());
  };


  return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.searchForm__button}>
            <span className={s.searchForm__label}>Search images and fotos</span>
          </button>
          <input
            className={s.searchForm__input}
            type="text"
            name="search"
            value={query}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            onChange={handlEqueryChange}
          />
        </form>
      </header>
    );
  
};


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


