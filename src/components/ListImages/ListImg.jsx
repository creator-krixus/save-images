import PropTypes from 'prop-types';
import "./ListImg.scss"

function ListImg({ imageList }) {
  return (
    <div className="imagesList">
      <section className="imagesList__wrapper">
        <div className="imagesList__masonry">
          <div className="imagesList__item">
            {imageList.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="image"
                className="imagesList__img"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Validación de props
ListImg.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListImg;

