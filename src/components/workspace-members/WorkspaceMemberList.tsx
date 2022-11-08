import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { WorkspaceMembershipUser } from '../../common/types/user.type';
import { EXCLUDE_MEMBER_FROM_WORKSPACE } from '../../store/actions/current-workspace';
import { useAppSelector } from '../../store/hooks';
import { currentWorkspaceSlugSelector } from '../../store/selectors/current-workspace';
import { useToast } from '../common/toastMessage';
import { WorkspaceMemberItem } from './WorkspaceMemberItem';

interface Props {
  memberships: WorkspaceMembershipUser[] | undefined | null;
}

export const WorkspaceMemberList: FC<Props> = ({ memberships }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { toast } = useToast();
  const slug = useAppSelector(currentWorkspaceSlugSelector);

  const deleteUserFromWorkspace = (email: string) => {
    dispatch(EXCLUDE_MEMBER_FROM_WORKSPACE({ email, slug: slug ?? '' }));
    toast(t('workspace.membership.member-excluded'));
  };

  return (
    <>
      {memberships
        ? memberships.map((membership) => (
            <WorkspaceMemberItem
              key={membership.email}
              onDelete={deleteUserFromWorkspace}
              {...membership}
            />
          ))
        : null}
    </>
  );
};
