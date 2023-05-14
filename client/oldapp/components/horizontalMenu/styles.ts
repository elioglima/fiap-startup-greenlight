import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
`;

export const HorizontalMenuItemBase = styled.View`
  display: flex;
  width: 130px;
  height: 190px;
  background-color: #01b282;
  margin: 10px 8px;
  border-radius: 20px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const HorizontalMenuItemTitle = styled.Text`
  display: flex;
  color: #fff;
  text-align: center;
  margin: 10px 10px;
  font-weight: 800;
  letter-spacing: 1px;
  font-size: 20px;
`;

export const HorizontalMenuItemLogo = styled.View`
  display: flex;
  width: 80%;
  height: 70%;
  background-color: #24c69a;
  border-radius: 50px;
`;
