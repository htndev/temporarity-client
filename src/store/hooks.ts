import { RootReducer } from './index';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector;
