import { useState } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const App = () => {
  const [searchterm, setSearchterm] = useState('');

  const getSearchterm = searchterm => {
    setSearchterm(searchterm);
  };

  return (
    <div>
      <Searchbar onSubmit={getSearchterm} />
      <ImageGallery getSearchterm={searchterm} />
    </div>
  );
};
