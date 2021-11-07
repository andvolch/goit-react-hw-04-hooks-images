import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import getPicturesPixabayApi from '../../services/pixabay-api';

import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({ query, page, onImageClick, loadMore }) {
  
  const [images, setImages] = useState([]);
  
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!query) {
      return
    }
    setStatus(Status.PENDING);

    getPicturesPixabayApi(query, page)
      .then(({ data: { hits } }) => {
        setImages(hits);
        setStatus(Status.RESOLVED);
        
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
    
    if (page !== 1) {
      setStatus(Status.PENDING);
      getPicturesPixabayApi(query, page)
      .then(({ data: { hits } }) => {
        setImages(prevState => [...prevState, ...hits]);

        setStatus(Status.RESOLVED);

        
        
      })
      .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
      }
    
  }, [query, page]);

  useEffect(() => {
    if(page !==1) {
      return 
    };
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [page]);



  if (status === Status.IDLE) {
      return <h2 className={s.title}>Enter name image</h2>;
  };

  if (status === Status.PENDING) {
    return <Loader />;
  };

  if (status === Status.REJECTED) {
    return <h2 className={s.error}>ERROR</h2>;
  };

  if (status === Status.RESOLVED) {
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
        <Button loadMore={loadMore} />
      </>
    );
  };
};


ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,

  onImageClick: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
};


