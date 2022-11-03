import { ComponentType, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api';
import { SET_TOKENS } from '../../store/actions/auth';
import { useAppSelector } from '../../store/hooks';
import { LoadingScreen } from '../common/LoadingScreen';

export const withAuthGuardAuthorization = <P extends object>(WC: ComponentType<P>) => {
  const AuthGuard: FC<P> = (props) => {
    const tokens = useAppSelector((state) => state.auth.tokens);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isTokenFetched, setIsTokenFetched] = useState(false);

    useEffect(() => {
      if (tokens) {
        setIsLoading(false);
        return navigate('/dashboard');
      }

      if ((!isLoading && isTokenFetched) || isLoading) {
        return;
      }

      if (isTokenFetched && !tokens) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      authApi
        .getTokens()
        .then(({ tokens: newTokens }) => {
          dispatch(SET_TOKENS(newTokens));
        })
        .catch(() => {
          if (
            !window.location.pathname.includes('signin') &&
            !window.location.pathname.includes('signup')
          ) {
            navigate('/signin');
          }
        })
        .finally(() => {
          setIsLoading(false);
          setIsTokenFetched(true);
        });
    }, [tokens, isTokenFetched, isLoading]);

    return isLoading ? <LoadingScreen /> : <WC {...props} />;
  };

  return AuthGuard;
};
