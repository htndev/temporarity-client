import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { AuthContextType } from '../types/auth.type';

export const useAuthContext = (): AuthContextType => useContext(AuthContext);
