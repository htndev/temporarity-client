import { ComponentType, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FETCH_WORKSPACES } from '../../store/actions/workspaces';
import { useAppSelector } from '../../store/hooks';
import { tokensSelector } from '../../store/selectors/auth';
import { LoadingScreen } from '../common/LoadingScreen';

export const withFetchWorkspaces = <P extends object>(WC: ComponentType<P>) => {
  const FetchWorkspaces: ComponentType<P> = (props) => {
    const tokens = useAppSelector(tokensSelector);
    const isFetching = useAppSelector((state) => state.workspaces.isFetching);
    const isWorkspacesFetched = useAppSelector((state) => state.workspaces.isWorkspacesFetched);
    const dispatch = useDispatch();

    useEffect(() => {
      if (!tokens || isFetching || isWorkspacesFetched) {
        return;
      }

      dispatch(FETCH_WORKSPACES());
    }, [tokens, isFetching, isWorkspacesFetched]);

    return isFetching ? <LoadingScreen /> : <WC {...props} />;
  };

  return FetchWorkspaces;
};
