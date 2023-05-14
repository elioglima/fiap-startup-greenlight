import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  background-color: #fff;
  border-color: #7000ad;
  border-width: 1px;
`;

export const LabelBase = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Label = styled.Text`
  display: flex;
`;

export const InputBase = styled.Text`
  display: flex;
`;

export const Input = styled.TextInput`
  display: flex;
  font-size: 15px;
  padding: 15px;
`;
