import React from 'react';
import Todo from './modules/pages/Todo/Todo';
import { Provider } from 'react-redux';
import store from 'store/store';

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Todo />
      </Provider>
    </div>
  );
};

export default App;
