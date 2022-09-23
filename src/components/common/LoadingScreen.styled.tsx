import styled from 'styled-components';

export const LoadingScreenWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.general.color.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;
