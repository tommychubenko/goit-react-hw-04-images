import imageItem from './ImageGalleryItem';
import { Component } from 'react';
import LoaderBtn from './Button';
import Loading from './Loadmore';
import Modal from './Modal';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const PIXA_KEY = '28226957-200d43869ee80bd5ab4812e4f';
const URL = `https://pixabay.com/api/?key=${PIXA_KEY}`;

class ImageGallery extends Component {
  state = {
    page: 1,
    perPage: 30,
    images: [],
    error: null,
    btnVisible: 'hidden',
    status: 'idle',
    selectedImg: '',
    modalVisibility: 'hidden',
    // 'idle' 'pending' 'resolve' 'rejected'
  };

  fetchImg(whatToSearch) {
    return axios.get(
      `${URL}&q=${whatToSearch}&image_type=photo&safesearch=false&orientation=horizontal&per_page=${this.state.perPage}&page=${this.state.page}`
    );
  }

  renderImages = images => {
    return images.map(image => imageItem(image));
  };

  onClickLoadMore = number => {
    this.setState(prevState => ({ page: prevState.page + number }));
  };

  getBigImage = data => {
    console.log(data);
  };

  // componentDidMount() {

  // }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchterm !== this.props.searchterm) {
      try {
        this.setState({ status: 'pending' });
        this.setState({ btnVisible: 'hidden' });
        this.setState({ page: 1 });
        const r = await this.fetchImg(this.props.searchterm);
        console.log(r);
        r.data.totalHits > 0
          ? Notify.success(
              `Horrey! Found ${r.data.totalHits} images of "${this.props.searchterm}" reqest!`
            )
          : Notify.failure(
              `Ooops! We did not dound any images under receipt ${this.props.searchterm}`
            );
        this.setState({ status: 'resolve' });
        this.setState({ images: r.data.hits });
        if (r.data.totalHits > r.data.hits.length) {
          this.setState({ btnVisible: 'visible' });
        }
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
    if (prevState.page !== this.state.page) {
      try {
        const r = await this.fetchImg(this.props.searchterm);

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
          this.setState({ btnVisible: 'hidden' });
        }
      } catch (error) {
        Notify.failure(`No more images or error ${error}`);
      }
    }
  }

  openModal = e => {
    this.setState({ selectedImg: e.target.dataset.source });
    this.setState({ modalVisibility: 'visible' });
  };
  closeModal = e => {
    this.setState({ selectedImg: '' });
    this.setState({ modalVisibility: 'hidden' });
  };

  render() {
    const { status, error, btnVisible, images } = this.state;

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
          onClick={e => {
            console.log(e);

            if (e.target.classList.value === 'ImageGalleryItem-image') {
              this.openModal(e);
            }
            if (e.target.classList.value === 'Overlay') {
              this.closeModal(e);

              // this.setState({ selectedImg: '' });
              // this.setState({ modalVisibility: 'hidden' });
            }
          }}
        >
          <ul className="ImageGallery">{this.renderImages(images)}</ul>
          <LoaderBtn info={btnVisible} addPage={this.onClickLoadMore} />
          <Modal
            bigImage={this.state.selectedImg}
            visibility={this.state.modalVisibility}
            onClose={this.closeModal}
          />
        </div>
      );
    }
  }
}

export default ImageGallery;
