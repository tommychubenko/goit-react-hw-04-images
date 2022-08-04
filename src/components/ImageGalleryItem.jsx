const imageItem = ({ images, openModal }) => {
  return images.map(image => {
    const { webformatURL, id, largeImageURL } = image;

    return (
      <li className="ImageGalleryItem" key={id}>
        <img
          src={webformatURL}
          alt={id}
          id={id}
          className="ImageGalleryItem-image"
          onClick={() => {
            openModal(largeImageURL);
          }}
        />
      </li>
    );
  });
};

export default imageItem;
