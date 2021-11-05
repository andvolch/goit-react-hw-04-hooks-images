import PropTypes from 'prop-types';

import s from './Button.module.css';

const Button = ({ loadMore }) => (
  <div className={s.container}>
    <button type="button" className={s.button} onClick={loadMore}>
      Load more
    </button>
  </div>
);

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
