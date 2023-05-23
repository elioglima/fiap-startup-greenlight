import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background-color: #fff;
  border-color: #7000ad;
  border-width: 1px;
  width: 95px;
  height: 95px;
`;

export const LabelBase = styled.View`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: -5px;
  left: -30px;
  z-index: 100;
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
