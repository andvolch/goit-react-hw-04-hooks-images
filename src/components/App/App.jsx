import {useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';



export default function App() {
  
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [tags, seTtags] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');

   const handleFormSubmit = (query, page) => {
     setQuery(query);
     setPage(1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    
  };

  const onImageClick = (tags, largeImageURL) => {
    seTtags(tags);
    setLargeImageURL(largeImageURL);

    toggleModal();
  };

  return (
      <div>
        <Searchbar
          onSubmit={handleFormSubmit}
        />
        <ImageGallery
          query={query}
        page={page}
        setPage={setPage}
          onImageClick={onImageClick}
        />
        {showModal && (
            <Modal
              onClose={toggleModal}
              tags={tags}
              largeImageURL={largeImageURL}
            />
        )}
        <ToastContainer autoClose={5000} />
      </div>
    );

};


