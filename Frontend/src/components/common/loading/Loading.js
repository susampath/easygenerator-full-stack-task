import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div className="loading-indicator">
      <output className="spinner-output">
        <Spinner animation="border" />
      </output>
    </div>
  );
}

export default Loading;
