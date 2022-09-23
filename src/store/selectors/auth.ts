import { RootReducer } from '../';

export const getUser = (state: RootReducer) => state.auth.user;
