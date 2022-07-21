import { Grid } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const loading = () => {
  return (
    // <div className="Loading">
    <Grid
      height="80"
      width="80"
      radius="9"
      color="green"
      ariaLabel="three-dots-loading"
      wrapperStyle
      wrapperClass="Loading"
    />
    // </div>
  );
};

export default loading;
