import { FC } from 'react';
import { WorkspaceMembershipUser } from '../../common/types/user.type';
import { WorkspaceMemberItem } from './WorkspaceMemberItem';

interface Props {
  memberships: WorkspaceMembershipUser[] | undefined | null;
}

export const WorkspaceMemberList: FC<Props> = ({ memberships }) => {
  const deleteUserFromWorkspace = (email: string) => {
    console.log(email);
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
