import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
`;

export const ContainerBase = styled.View`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 10, 10, 0.7);
`;

export const Contents = styled.View`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  bottom: 0;
  width: 100%;
  z-index: 1001;
  border-width: 0;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-top-style: solid;
  border-top-color: #c7c7c7;
  border-top-width: 1px;
`;

export const BaseClose = styled.TouchableOpacity`
  display: flex;
  height: 2px;
  background-color: #8b8b8b;
  margin: 10px 30% 20px 30%;
`;

export const TitleBase = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Title = styled.Text`
  color: #202020;
  /* font-family: 'Nunito-Regular'; */
  font-size: 25px;
  font-weight: 800;
  text-align: center;
  margin: 30px 40px 0px 40px;
`;
export const Description = styled.Text`
  display: flex;
  color: #4f4f4f;
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 19px;
  margin: 20px 10px 10px 5px;
  text-align: center;
`;

export const BaseText = styled.View`
  display: flex;
  flex-direction: column;
`;

export const Col = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Buttons = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 0 40px;
`;
