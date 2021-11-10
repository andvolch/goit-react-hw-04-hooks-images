import {useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import getPicturesPixabayApi from '../../services/pixabay-api';

import s from './App.module.css';


const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tags, seTtags] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

   const handleFormSubmit = (query) => {
     setQuery(query);
     setPage(1);
     setImages([]);
  };

  const fetchApi = () => {
    
    // setStatus(Status.PENDING);
    getPicturesPixabayApi(query, page)
      .then(({ data: { hits } }) => {
        setImages(prevState => [...prevState, ...hits]);
        setPage(prevState => prevState + 1);
        setStatus(Status.RESOLVED);
      })
      
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  };

  const loadMore = () => {
    // console.log(page);
    fetchApi();
    
    
  };

  useEffect(() => {
    
    if (!query) {
      return;
    };
    setStatus(Status.PENDING);
    
    fetchApi();

  }, [query]);

  

  
  

  const pageScroll = () => {
    if (images.length < 12) {
      return;
    };
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  pageScroll();


  const toggleModal = () => {
    setShowModal(!showModal);
    
  };

  const onImageClick = (tags, largeImageURL) => {
    seTtags(tags);
    setLargeImageURL(largeImageURL);
    toggleModal();
  };

  if (status === Status.IDLE) {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} /> 
        <h2 className={s.title}>Enter name image</h2>
        <ToastContainer autoClose={5000} />
      </>
      )
  };

  if (status === Status.PENDING) {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <Loader />
        <ToastContainer autoClose={5000} />
      </>
    );
    
  };

  if (status === Status.REJECTED) {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <h2 className={s.error}>ERROR</h2>
        <ToastContainer autoClose={5000} />
      </>
    )
  };

  if (status === Status.RESOLVED) {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        {showModal && (
            <Modal
              onClose={toggleModal}
              tags={tags}
              largeImageURL={largeImageURL}
            />
        )}
        <ImageGallery
          images={images}
          onImageClick={onImageClick}
        />
        <Button loadMore={loadMore} />
        <ToastContainer autoClose={5000} />
      </>
    );
    
  };

  // return (
  //     <div>
  //       <Searchbar
  //         onSubmit={handleFormSubmit}
  //       />
        
  //       {showModal && (
  //           <Modal
  //             onClose={toggleModal}
  //             tags={tags}
  //             largeImageURL={largeImageURL}
  //           />
  //       )}
  //       <ToastContainer autoClose={5000} />
  //     </div>
  //   );

};


