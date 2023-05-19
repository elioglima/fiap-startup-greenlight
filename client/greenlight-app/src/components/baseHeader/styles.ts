import styled from 'styled-components/native';

export const BaseHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #cbcbcb;
  margin-bottom: 8px;
`;

export const BackRoute = styled.View`
  display: flex;
  flex-direction: row;
`;

export const BackRouteAction = styled.View`
  display: flex;
`;

export const BackRouteText = styled.Text`
  display: flex;
  font-size: 18px;
  font-weight: bold;
`;

export const Title = styled.Text`
  display: flex;
  font-size: 30px;
  font-weight: bold;
  margin-top: 5px;
`;

export const IconRight = styled.View`
  display: flex;
  margin: 5px;
`;
