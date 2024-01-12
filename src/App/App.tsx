import styles from './App.module.scss';
import { SpinnerContainer } from './SpinnerContainer';
import { Router } from '~/router';

export const App = () => {
  return (
    <>
      <SpinnerContainer />
      <div className={styles.App}>
        <Router />
      </div>
    </>
  );
};
