import React from 'react';
import App from './App';
import store from './store';
import {Provider} from 'react-redux';

function RootApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default RootApp;
