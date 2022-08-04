import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const Searchbar = ({ onSubmit }) => {
  const [searchterm, setSearchterm] = useState('');

  // export default class Searchbar extends Component {
  //   state = {
  //     searchterm: '',
  //     images: '',
  //   };

  const onChange = e => {
    const { value } = e.currentTarget;
    setSearchterm(value);
  };

  const onSumbit = e => {
    e.preventDefault();
    if (searchterm.trim() === '') {
      Notify.failure('Введіть пошуковий запит');
      return;
    }
    onSubmit(searchterm);
    setSearchterm('');
  };

  // render() {
  return (
    <header className="Searchbar">
      <form
        className="SearchForm"
        onSubmit={e => {
          onSumbit(e);
        }}
      >
        <button type="submit" className="SearchForm-button">
          <span className="button-label"></span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          name="searchterm"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
          value={searchterm}
        />
      </form>
    </header>
  );
  // }
};
