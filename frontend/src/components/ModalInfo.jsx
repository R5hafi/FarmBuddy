import React from 'react';
import Modal from 'react-modal';
import "../styles/Modal.css";

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
          padding: '0px',
          borderRadius: '10px',
          width: '400px',
          height: '20%',
          textAlign: 'center'
        }
      }}
    >
      <div className="modal-container">
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClick={onRequestClose}>Close</button>
      </div>
    </Modal>
  );
}

export default ModalInfo;
