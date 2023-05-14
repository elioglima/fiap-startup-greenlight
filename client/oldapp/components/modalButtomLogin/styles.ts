import styled from 'styled-components/native';
export const ContainerBase = styled.View`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Title = styled.Text`
  color: #525252;
  /* font-family: 'Nunito-Regular'; */
  font-size: 15px;
  font-weight: 300;
  text-align: center;
  margin: 30px 40px 0px 40px;
`;

export const ButtonBase = styled.View`
  display: flex;
  margin: 30px 50px 30px 50px;
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
