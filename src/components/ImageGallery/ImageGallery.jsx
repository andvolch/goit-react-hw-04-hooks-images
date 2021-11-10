import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <>
      <ul className={s.imageGallery}>
        {images.map(({ id, tags, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            tags={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={onImageClick}
          />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};





