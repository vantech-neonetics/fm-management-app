Import { showError } from './common';
import axios from 'axios';
Import { store } from 'store/index';
Import { LOGIN } from 'store/actions';
Import config from 'config';

Export constant API = axios.create({
  baseURL: process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : '/'
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    If (error.response?.status === 401) {
      localStorage.removeItem('user');
      store.dispatch({ type: LOGIN, payload: null });
      window.location.href = config.basename + 'login';
    }

    If (error.response?.data?.message) {
      error.message = error.response.data.message;
    }

    showError(error);
  }
);