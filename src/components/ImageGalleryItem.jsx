const imageItem = ({ webformatURL, id, largeImageURL }) => {
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
