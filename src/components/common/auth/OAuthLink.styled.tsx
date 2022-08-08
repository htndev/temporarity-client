import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { rgba } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import { buttonMixin } from '../../../common/themes/mixins/typography';
import { OAuth } from '../../../common/types/auth.type';
import { ExternalLink } from '../ExternalLink';

const OAuthLinkConfig = {
  [OAuth.Google]: {
    color: '#EA4335',
    icon: <GoogleIcon />
  },
  [OAuth.Facebook]: {
    color: '#4267B2',
    icon: <FacebookIcon />
  },
  [OAuth.Github]: {
    color: '#171515',
    icon: <GitHubIcon />
  }
};

const OAuthLinkWrapper = styled(ExternalLink)`
  ${buttonMixin}
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.general.spacing.spacing2}
    ${(props) => props.theme.general.spacing.spacing3};
  width: 100%;
  text-decoration: none;
  border: 1px solid ${(props: { color: string }) => props.color};
  border-radius: 4px;
  color: ${(props: { color: string }) => props.color};
  background: transparent;
  cursor: pointer;
  transition: 0.15s ease-in;
  will-change: background;
  text-transform: uppercase;

  &:not(:last-of-type) {
    margin-bottom: ${(props) => props.theme.general.spacing.spacing2};
  }

  &:hover {
    background: ${(props: { color: string }) => rgba(props.color, 0.05)};
  }

  &:active {
    background: ${(props: { color: string }) => rgba(props.color, 0.1)};
  }
`;

const OAuthIcon = styled.span`
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OAuthContentWrapper = styled.span`
  margin-right: auto;
`;

export const OAuthLink: FC<{ network: OAuth; to: string }> = ({ network, to, children }) => {
  const { color, icon } = OAuthLinkConfig[network];

  return (
    <OAuthLinkWrapper href={to} color={color}>
      <OAuthIcon>{icon}</OAuthIcon>
      <OAuthContentWrapper>{children}</OAuthContentWrapper>
    </OAuthLinkWrapper>
  );
};
