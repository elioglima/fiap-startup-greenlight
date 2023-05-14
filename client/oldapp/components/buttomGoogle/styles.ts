import styled, {css} from 'styled-components/native';

const styleCenter = css`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  display: flex;
  background-color: #ffffff;
  border-radius: 20px;
  border-color: #a4a4a4;
  border-style: solid;
  border-width: 1px;
  ${(p: any) => p.textCenter === true && styleCenter}

`;

export const Title = styled.Text`
  display: flex;
  color: #7e7e7e;
  /* font-family: 'Nunito-Regular'; */
  font-size: 15px;
  font-weight: bold;
  margin: 20px 30px;
  ${(p: any) => p.textTransform && `text-transform: ${p.textTransform};`}
`;
