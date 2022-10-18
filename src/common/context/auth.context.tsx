import { createContext } from 'react';
import { AuthContextType } from '../types/auth.type';

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
