import axios from 'axios';

const fetchImages = async (whatToSearch, a, b) => {
  const PIXA_KEY = '28226957-200d43869ee80bd5ab4812e4f';
  const URL = `https://pixabay.com/api/?key=${PIXA_KEY}`;

  return axios.get(
    `${URL}&q=${whatToSearch}&image_type=photo&safesearch=false&orientation=horizontal&per_page=${a}&page=${b}`
  );
};

export default fetchImages;
