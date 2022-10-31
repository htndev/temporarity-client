import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../common/constants/api.constant';
import { LOGOUT } from '../store/actions/auth';
import { RootReducer, store } from './../store';

type StoreType = typeof store;

export class BaseApi {
  private appStore: StoreType | null = null;
  protected instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
  });

  constructor(path: string = '') {
    this.instance.defaults.baseURL += `/${path}`;
    this.instance.interceptors.request.use((config) => {
      const state = this.appStore?.getState();

      if (typeof config.headers === 'undefined') {
        config.headers = {};
      }

      if (state?.auth.tokens?.access) {
        config.headers.Authorization = `Bearer ${state.auth.tokens?.access}`;
      }

      return config;
    });
    this.instance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          this.appStore?.dispatch(LOGOUT());
          window.location.replace('/signin');
        }

        throw error;
      }
    );
  }

  setupInterceptors(appStore: StoreType) {
    this.appStore = appStore;
  }
}
