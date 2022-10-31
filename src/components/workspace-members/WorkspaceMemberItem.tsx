import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Avatar, Box, Menu, MenuItem, Tooltip } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WorkspaceMembershipUser } from '../../common/types/user.type';
import { WorkspaceRole } from '../../common/types/workspace.type';
import { useAppSelector } from '../../store/hooks';
import { userSelector } from '../../store/selectors/auth';
import { isOwnerSelector } from '../../store/selectors/current-workspace';
import { Button } from '../common/Button';
import { Text } from '../common/typography/Text';

interface Props extends WorkspaceMembershipUser {
  onDelete: (email: string) => void;
}

const spaceStyle = {
  marginRight: 2
};
const itemStyle = {
  ...spaceStyle,
  minWidth: '15em'
};
const roleI18n = {
  [WorkspaceRole.Owner]: 'role.owner',
  [WorkspaceRole.Editor]: 'role.editor'
};

export const WorkspaceMemberItem: FC<Props> = ({
  fullName,
  role,
  email,
  profilePicture,
  onDelete
}) => {
  const { t } = useTranslation();
  const firstLetters = useMemo(() => {
    const [firstName, lastName] = fullName.split(' ');

    return `${firstName[0]}${lastName[0]}`;
  }, [fullName]);
  const isWorkspaceOwner = useAppSelector(isOwnerSelector);
  const user = useAppSelector(userSelector);
  const shouldDisplayOwnerLabel = useMemo(() => role === WorkspaceRole.Owner, [role]);
  const avatar = useMemo(() => profilePicture ?? undefined, [profilePicture]);
  const isCurrentUser = useMemo(() => user?.email === email, [user, email]);
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);
  const [actionMenuRef, setActionMenuRef] = useState<null | HTMLElement>(null);

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionMenuRef(event.currentTarget);
    setIsOpenedMenu(true);
  };
  const onMenuClose = () => {
    setIsOpenedMenu(false);
    setActionMenuRef(null);
  };

  return (
    <Box
      sx={({ palette }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: 1,
        borderRadius: 1,
        '&:not(:last-child)': { marginBottom: 1 },
        '&:hover': {
          background: palette.grey[100]
        }
      })}
    >
      <Avatar sx={spaceStyle} src={avatar}>
        {firstLetters}
      </Avatar>
      <Text sx={itemStyle} isFluid>
        {fullName}
      </Text>
      <Text sx={itemStyle} isFluid>
        {email}
      </Text>
      <Box sx={itemStyle}>
        <Text sx={{ display: 'flex', alignItems: 'center' }} isFluid>
          {t(roleI18n[role])}
          <span style={{ display: 'flex', alignItems: 'center', marginLeft: '4px' }}>
            {shouldDisplayOwnerLabel ? (
              <Tooltip
                title={t(
                  isWorkspaceOwner
                    ? 'workspace.membership.owner-hint.you'
                    : 'workspace.membership.owner-hint.other',
                  { fullName }
                )}
              >
                <VerifiedUserIcon fontSize="small" />
              </Tooltip>
            ) : null}
          </span>
        </Text>
      </Box>
      {isWorkspaceOwner && !isCurrentUser && (
        <Box sx={{ marginLeft: 'auto' }}>
          <Button onClick={onButtonClick}>{t('common.action')}</Button>
          <Menu
            open={isOpenedMenu}
            anchorEl={actionMenuRef}
            onClose={onMenuClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'right'
            }}
          >
            <MenuItem onClick={() => onDelete(email)}>
              {t('workspace.membership.delete-member')}
            </MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  );
};
