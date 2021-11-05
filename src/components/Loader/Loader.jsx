import Loader from 'react-loader-spinner';

import s from './Loader.module.css';

const loader = () => (
  <div>
    {' '}
    <Loader
      className={s.loader}
      type="TailSpin"
      color="#3f51b5"
      height={80}
      width={80}
    />
    ; loading ...
  </div>
);

export default loader;
