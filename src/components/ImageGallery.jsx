import ImageItem from './ImageGalleryItem';
import { Component } from 'react';
import LoaderBtn from './Button';
import Loading from './Loadmore';
import Modal from './Modal';
import fetchImg from '../api/GetImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class ImageGallery extends Component {
  state = {
    page: 1,
    perPage: 30,
    images: [],
    error: null,
    btn: false,
    modal: false,
    status: 'idle',
    selectedImg: '',

    // 'idle' 'pending' 'resolve' 'rejected'
  };

  onClickLoadMore = number => {
    this.setState(prevState => ({ page: prevState.page + number }));
  };

  getBigImage = data => {
    console.log(data);
  };

  toggleBtn = () => {
    this.setState(prevState => ({ btn: !prevState.btn }));
  };

  openModal = largeImageURL => {
    this.setState({ selectedImg: largeImageURL, modal: true });
    // this.setState({ modal: true });
  };
  closeModal = e => {
    if (e.target.classList.value === 'Overlay') {
      this.setState({ selectedImg: '', modal: false });
      // this.setState({ modal: false });
    }
  };

  closeModalByESC = e => {
    this.setState({ selectedImg: '', modal: false });
    // this.setState({ modal: false });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchterm !== this.props.searchterm) {
      try {
        this.setState({
          status: 'pending',
          btn: false,
          modal: false,
          page: 1,
        });
        const r = await fetchImg(
          this.props.searchterm,
          this.state.perPage,
          this.state.page
        );

        r.data.totalHits > 0
          ? Notify.success(
              `Horrey! Found ${r.data.totalHits} images of "${this.props.searchterm}" reqest!`
            )
          : Notify.failure(
              `Ooops! We did not dound any images under receipt ${this.props.searchterm}`
            );
        this.setState({ status: 'resolve', images: r.data.hits });
        // this.setState({ images: r.data.hits });
        if (r.data.totalHits > r.data.hits.length) {
          this.toggleBtn();
        }
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
    if (prevState.page !== this.state.page) {
      try {
        const r = await fetchImg(
          this.props.searchterm,
          this.state.perPage,
          this.state.page
        );

        this.setState(prevState => ({
          images: [...prevState.images, ...r.data.hits],
        }));
        Notify.success(
          `Succesfyly loaded ${r.data.hits.length} images.
          Total loaded ${this.state.images.length + r.data.hits.length} of ${
            r.data.totalHits
          } images`
        );

        if (this.state.images.length + this.state.perPage > r.data.totalHits) {
          this.toggleBtn();
        }
      } catch (error) {
        Notify.failure(`No more images or error ${error}`);
      }
    }
  }

  render() {
    const { status, error, images, btn, modal } = this.state;

    if (status === 'idle') {
      return;
    }

    if (status === 'pending') {
      return <Loading />;
    }

    if (status === 'rejected') {
      return <p>Виникла помилка {error.message}</p>;
    }

    if (status === 'resolve' && images.length > 0) {
      return (
        <div
          className="gallery-wrapper"
          onChange={e => {
            console.log(e);
          }}
        >
          <ul className="ImageGallery">
            <ImageItem images={this.state.images} openModal={this.openModal} />
          </ul>

          {btn && <LoaderBtn addPage={this.onClickLoadMore} />}

          {modal && (
            <Modal
              bigImage={this.state.selectedImg}
              onClose={this.closeModalByESC}
              closeModal={this.closeModal}
            />
          )}
        </div>
      );
    }
  }
}

export default ImageGallery;
