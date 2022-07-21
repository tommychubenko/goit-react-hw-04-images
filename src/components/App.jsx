import { render } from '@testing-library/react';
import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

import Modal from './Modal';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export class App extends Component {
  state = {
    searchterm: '',
  };

  getSearchterm = searchterm => {
    this.setState({ searchterm });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.getSearchterm} />
        <ImageGallery searchterm={this.state.searchterm} />
      </div>
    );
  }
}
