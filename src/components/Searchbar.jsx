import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class Searchbar extends Component {
  state = {
    searchterm: '',
    images: '',
  };

  onChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  onSumbit = e => {
    e.preventDefault();
    if (this.state.searchterm.trim() === '') {
      Notify.failure('Введіть пошуковий запит');
      return;
    }
    this.props.onSubmit(this.state.searchterm);
    this.setState({ searchterm: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form
          className="SearchForm"
          onSubmit={e => {
            this.onSumbit(e);
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
            onChange={this.onChange}
            value={this.state.searchterm}
          />
        </form>
      </header>
    );
  }
}
