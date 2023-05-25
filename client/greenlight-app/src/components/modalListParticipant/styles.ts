import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fff;
  height: 100%;
  width: 100%;
`;

export const ListBase = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ListRow = styled.View`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #25a482;
  border-radius: 8px;
`;

export const PhotoBase64 = styled.View`
  display: flex;
  margin: 10px 10px;
`;

export const Title = styled.Text`
  display: flex;
  color: #fff;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  ${(p: any) => p.textTransform && `text-transform: ${p.textTransform};`}
`;
