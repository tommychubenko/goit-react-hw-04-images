import { useEffect } from 'react';

export const Modal = ({ closeModal, bigImage, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        onClose();
      }
    });
  }, []);
  // class modal extends Component {
  // componentDidMount() {
  // window.addEventListener('keydown', e => {
  //   if (e.code === 'Escape') {
  //     this.props.onClose();
  //   }
  // });
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', e => {
  //     if (e.code === 'Escape') {
  //       this.props.onClose();
  //     }
  //   });
  // }

  // render() {
  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={bigImage} alt="" />
      </div>
    </div>
  );
  // }
};
