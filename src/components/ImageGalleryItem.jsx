import { Component } from 'react';

const imageItem = ({ webformatURL, id, largeImageURL, tags }) => {
  return (
    <li className="ImageGalleryItem" key={id}>
      <img
        src={webformatURL}
        alt={id}
        id={id}
        className="ImageGalleryItem-image"
        data-source={largeImageURL}
      />
    </li>
  );
};

export default imageItem;
