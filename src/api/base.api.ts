import axios from 'axios';
import { BASE_URL } from '../common/constants/api.constant';
import { store } from '../store';

type StoreType = typeof store;

export class BaseApi {
  private appStore: StoreType | null = null;
  protected instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    maxRedirects: 0,
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
    this.instance.interceptors.response.use((response) => response.data);
  }

  setupInterceptors(appStore: StoreType) {
    this.appStore = appStore;
  }
}
