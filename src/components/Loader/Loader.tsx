import css from './Loader.module.css';
import { CircleLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className={css.loaderBackdrop}>
      <CircleLoader color='#D6CEDF' size={100} />
    </div>
  );
};

export default Loader;
