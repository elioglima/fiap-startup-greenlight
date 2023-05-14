import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 25px;
`;

export const BaseText = styled.View`
  display: flex;
  flex-direction: column;
`;

export const BasePhoto = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 0 15px;
`;

export const h1 = styled.Text`
  font-size: 25px;
`;
export const h2 = styled.Text`
  font-size: 35px;
  font-weight: 600;
`;
export const h5 = styled.Text`
  font-size: 20px;
`;
