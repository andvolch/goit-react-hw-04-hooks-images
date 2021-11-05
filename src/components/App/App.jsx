import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

class App extends Component {
  state = {
    query: '',
    showModal: false,
    tags: '',
    largeImageURL: '',
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = (tags, largeImageURL) => {
    this.setState({ tags, largeImageURL });
    this.toggleModal();
  };

  render() {
    const { showModal, tags, largeImageURL, query } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={query} onImageClick={this.onImageClick} />
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            tags={tags}
            largeImageURL={largeImageURL}
          />
        )}
        <ToastContainer autoClose={5000} />
      </div>
    );
  }
}

export default App;
