import { useEffect } from 'react';

export const Modal = ({ closeModal, bigImage, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        onClose();
      }
    });
  }, []); //react-hooks/exhaustive-deps

  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={bigImage} alt="" />
      </div>
    </div>
  );
  // }
};
