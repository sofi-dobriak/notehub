import { useDebouncedCallback } from 'use-debounce';
import css from './SearchBox.module.css';
import { IoCloseCircleOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { useState } from 'react';

interface SearchBoxProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchBox = ({ query, setQuery }: SearchBoxProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
  }, 500);

  const handleClearInput = () => {
    setInputValue('');
    setQuery('');
  };

  return (
    <div className={css.searchInputButtonContainer}>
      <input
        className={css.searchInput}
        type='text'
        name='search notes'
        placeholder='Search notes'
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      <button
        onClick={handleClearInput}
        type='button'
        className={clsx(css.clearSearchButton, query && css.isVisible)}
      >
        <IoCloseCircleOutline className={css.clearSearchIcon} />
      </button>
    </div>
  );
};

export default SearchBox;
