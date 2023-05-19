import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 0 20px 0 20px;
  flex-direction: column;
  width: 90%;
`;

export const BaseTitle = styled.View`
  display: flex;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #cbcbcb;
  margin-bottom: 5px;
`;

export const Title = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: #1c70e5;
`;

export const EventList = styled.View`
  display: flex;
  margin-top: 10px;
`;
