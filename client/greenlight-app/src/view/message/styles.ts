import styled from 'styled-components/native';

export const ContainerBase = styled.View`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(37, 10, 47, 1);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: -15px;
  background-color: #fff;
  width: 100%;
  z-index: 1001;
  border-width: 0;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-top-style: solid;
  border-top-color: #c7c7c7;
  border-top-width: 1px;
`;

export const TitleBase = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 50px;
`;

export const Title = styled.Text`
  color: #525252;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin: 30px 40px 0px 40px;
`;

export const Message = styled.Text`
  color: #525252;
  font-size: 20px;
  font-weight: 200;
  text-align: center;
  margin: 30px 40px 0px 40px;
`;

export const ButtonBase = styled.View`
  display: flex;
  margin: 10px 30px 40px 30px;
`;

export const Button = styled.View`
  display: flex;
  padding: 5px 5px 5px 5px;
`;

export const BaseClose = styled.View`
  display: flex;
  height: 2px;
  background-color: #8b8b8b;
  margin: 10px 30% 2px 30%;
`;

export const Forms = styled.View`
  display: flex;
  flex-direction: column;
  margin: 10px 40px 0 40px;
`;

export const FormRow = styled.View`
  display: flex;
  flex-direction: column;
  margin: 8px 0 8px 0;
`;
