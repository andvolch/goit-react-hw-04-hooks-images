import { Component } from 'react';

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

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const { page } = this.state;

    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING });

      getPicturesPixabayApi(nextQuery, page)
        .then(({ data: { hits } }) =>
          this.setState({ images: hits, status: Status.RESOLVED }),
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
      this.setState({ page: 1 });
    }
  }

  loadMore = () => {
    const { page } = this.state;

    getPicturesPixabayApi(this.props.query, page)
      .then(({ data: { hits } }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
          status: Status.RESOLVED,
        }));
        this.pageScroll();
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  pageScroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  render() {
    const { images } = this.state;
    const { onImageClick } = this.props;
    const { status } = this.state;

    if (status === Status.IDLE) {
      return <h2 className={s.title}>Enter name image</h2>;
    }

    if (status === Status.PENDING) {
      return <Loader />;
    }

    if (status === Status.REJECTED) {
      return <h2 className={s.error}>ERROR</h2>;
    }

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
          <Button loadMore={this.loadMore} />
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,

  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
