import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom'; // Import Router
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import history from './reducers/history'; // Import the history object


const store = createStore(rootReducer, composeWithDevTools());

const configureAxios = () => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const { status } = error.response;
      if (status === 401) {
        store.dispatch({ type: 'LOGOUT' });
        window.localStorage.removeItem('auth');
        history.push('/tst-admin'); // Use the history object
      }
      return Promise.reject(error);
    }
  );
};


configureAxios(); // Set up Axios interceptors before rendering the app

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router history={history}> {/* Wrap your app with Router and pass the history object */}
      <App />
    </Router>
  </Provider>
);

