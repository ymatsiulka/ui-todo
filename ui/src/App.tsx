import React from 'react';
import { Provider } from 'react-redux';
import store from 'store/store';
import styles from './App.m.scss';
import Todo from 'modules/pages/Todo/Todo';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <Todo />
      </div>
    </Provider>
  );
};

export default App;
