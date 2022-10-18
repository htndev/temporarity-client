import { ComponentType, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/auth.api';
import { SET_TOKENS } from '../../store/actions/auth';
import { useAppSelector } from '../../store/hooks';
import { LoadingScreen } from '../common/LoadingScreen';

export const withAuthGuardAuthorization = <P extends object>(WC: ComponentType<P>) => {
  const AuthGuard: FC<P> = (props) => {
    const tokens = useAppSelector((state) => state.auth.tokens);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (!tokens) {
        setIsLoading(false);
        return;
      }

      if (tokens) {
        setIsLoading(false);
        return navigate('/dashboard');
      }

      authApi
        .getTokens()
        .then(({ tokens: newTokens }) => {
          dispatch(SET_TOKENS(newTokens));
        })
        .catch((error) => {
          navigate('/signin');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [tokens, navigate, dispatch, isLoading]);

    return isLoading ? <LoadingScreen /> : <WC {...props} />;
  };

  return AuthGuard;
};
