import PropTypes from 'prop-types';
import './Form.scss'

const Form = ({ subirImagen }) => {
  return (
    <>
      <div className="form">
        <form onSubmit={subirImagen}>
          <div className="form__container">
            <label htmlFor="exampleFormControlInput1" className="form__label">
              Seleccione la imagen
            </label>
            <input
              type="file"
              accept="image/*"
              className="form__input"
            />
          </div>
          <button className="form__btn">
            Subir imagen
          </button>
        </form>
      </div>
    </>
  );
};

// Validación de props
Form.propTypes = {
  subirImagen: PropTypes.func.isRequired,
};

export default Form;
