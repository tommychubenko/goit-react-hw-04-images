export const LoaderBtn = ({ addPage }) => {
  // render() {
  return (
    <button
      className="Button"
      type="button"
      onClick={() => {
        addPage(1);
      }}
    >
      Load more
    </button>
  );
};
