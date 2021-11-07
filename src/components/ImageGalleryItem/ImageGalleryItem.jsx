import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ tags, webformatURL, largeImageURL, onClick, }) => (
  <li className={s.imageGalleryItem}>
    <img
      src={webformatURL}
      alt={tags}
      className={s.imageGalleryItem__image}
      onClick={() => onClick(tags, largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
