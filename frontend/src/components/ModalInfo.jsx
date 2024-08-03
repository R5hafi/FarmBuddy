import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // This is to avoid screen readers issues

const ModalInfo = ({ isOpen, onRequestClose, title, content }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          borderRadius: '10px',
          width: '400px',
          textAlign: 'center'
        }
      }}
    >
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}

export default ModalInfo;
