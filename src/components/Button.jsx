import { Component } from 'react';

class loaderBtn extends Component {
  render() {
    return (
      <button
        className="Button"
        type="button"
        // style={{ visibility: this.props.info }}
        onClick={() => {
          this.props.addPage(1);
        }}
      >
        Load more
      </button>
    );
  }
}
export default loaderBtn;
