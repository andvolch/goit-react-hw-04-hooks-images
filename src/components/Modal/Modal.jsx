import React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, tags, largeImageURL }) {
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return (
      () => window.removeEventListener('keydown', handleKeydown)
    )
  });

  const handleKeydown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleCloseClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  
  return createPortal(
      <div className={s.overlay} onClick={handleCloseClick}>
        <div className={s.modal}>
          {/* {this.props.children} */}
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot,
    );
};


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
