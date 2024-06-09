import React from 'react';
import Todo from 'modules/pages/Todo/Todo';
import { Provider } from 'react-redux';
import store from 'store/store';
import styles from './App.m.scss';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Provider store={store}>
        <Todo />
      </Provider>
    </div>
  );
};

export default App;
