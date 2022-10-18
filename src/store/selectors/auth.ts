import { RootReducer } from '../';

export const userSelector = (state: RootReducer) => state.auth.user;

export const isLoadingSelector = (state: RootReducer) => state.auth.isLoading;

export const tokensSelector = (state: RootReducer) => state.auth.tokens;
