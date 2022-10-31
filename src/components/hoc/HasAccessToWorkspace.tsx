import { ComponentType, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { workspacesApi } from '../../api/workspaces.api';
import { useAppSelector } from '../../store/hooks';
import { tokensSelector } from '../../store/selectors/auth';
import { LoadingScreen } from '../common/LoadingScreen';
import { NotFound } from '../../pages/NotFound';

export const withHasAccessToWorkspace =
  (Component: ComponentType) =>
  (props: object): JSX.Element => {
    const [isFetchingWorkspaceAccess, setIsFetchingWorkspaceAccess] = useState(false);
    const [shouldRenderNotFound, setShouldRenderNotFound] = useState(false);
    const { slug } = useParams<'slug'>();
    const navigate = useNavigate();
    const tokens = useAppSelector(tokensSelector);

    useEffect(() => {
      if (!tokens?.access) {
        return;
      }
      setIsFetchingWorkspaceAccess(true);
      workspacesApi
        .hasAccess(String(slug))
        .then(({ hasAccess }) => {
          setShouldRenderNotFound(!hasAccess);
        })
        .catch((error) => navigate('/workspaces'))
        .finally(() => setIsFetchingWorkspaceAccess(false));
    }, [slug, tokens, navigate]);

    const renderPage = () => (shouldRenderNotFound ? <NotFound /> : <Component {...props} />);

    if (!slug) {
      navigate('/workspaces');
    }

    return isFetchingWorkspaceAccess ? <LoadingScreen /> : renderPage();
  };
