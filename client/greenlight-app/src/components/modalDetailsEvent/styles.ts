import styled from 'styled-components/native';
export const ContainerBase = styled.View`
  display: flex;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  z-index: 1000;
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

export const Header = styled.View`
  display: flex;
  width: 85%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px;
`;

export const Map = styled.View`
  display: flex;
`;

export const BaseClose = styled.View`
  display: flex;
  height: 2px;
  background-color: #8b8b8b;
  margin: 10px 30% 20px 30%;
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TitleDate = styled.Text`
  display: flex;
  color: #000;
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 15px;
  margin: 10px 10px 10px 5px;
`;

export const TitleTimeStart = styled.Text`
  display: flex;
  color: #000;
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 15px;
  margin: 10px 10px 10px 3px;
`;

export const Col = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  display: flex;
  margin-right: 3px;
`;

export const ImageTitle = styled.Text`
  display: flex;
  color: #000;
  text-align: center;
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 15px;
`;

export const Maps = styled.View`
  display: flex;
  width: 88%;
  margin: 0 20px;
`;

export const Buttons = styled.View`
  display: flex;
  width: 94%;
  margin: 20px 10px 50px 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ImageDefault = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`;
