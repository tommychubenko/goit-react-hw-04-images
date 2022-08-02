import { Component } from 'react';

class modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.props.onClose();
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.props.onClose();
      }
    });
  }

  render() {
    return (
      <div className="Overlay" onClick={this.props.closeModal}>
        <div className="Modal">
          <img
            src={this.props.bigImage}
            alt=""
            // onClick={this.props.closeModal}
          />
        </div>
      </div>
    );
  }
}

export default modal;
