import styled, {css} from 'styled-components/native';

export const Base = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const styleCenter = css`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  display: flex;
  background-color: #7000ad;
  border-radius: 20px;
  ${(p: any) => p.textCenter === true && styleCenter}
`;

export const Title = styled.Text`
  display: flex;
  color: #fff;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  margin: 20px 30px;
  ${(p: any) => p.textTransform && `text-transform: ${p.textTransform};`}
`;
