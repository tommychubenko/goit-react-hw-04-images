import { render } from '@testing-library/react';
import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

import Modal from './Modal';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const PIXA_KEY = '28226957-200d43869ee80bd5ab4812e4f';
const URL = `https://pixabay.com/api/?key=${PIXA_KEY}`;

let page = 1;
let perPage = 10;

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
