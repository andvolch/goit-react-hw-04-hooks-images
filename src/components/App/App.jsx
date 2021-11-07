import {useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';



export default function App() {
  
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tags, seTtags] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');

   const handleFormSubmit = query => {
    setQuery(query);
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


