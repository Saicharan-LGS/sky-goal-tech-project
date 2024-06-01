import "./index.css";

import notfound from '../../Assets/img/notfound.jpg'

const NotFound = () => (
  <div className="not-found-container">
    <img src={notfound} alt="not found" className="not-found-img" />
  </div>
);

export default NotFound;
