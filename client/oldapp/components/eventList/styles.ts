import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const Base = styled.View`
  display: flex;
  flex-direction: column;
  background-color: #01b282;
  border-radius: 20px;
  margin-bottom: 18px;
`;

export const BaseRow = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 10px;
  align-items: center;
`;

export const Col = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ColPhoto = styled.View`
  display: flex;
  width: 30%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.View`
  display: flex;
  width: 70px;
  height: 70px;
  background-color: #24c69a;
  border-radius: 50px;
  margin: 10px;
`;

export const ColTitle = styled.View`
  display: flex;
  width: 70%;
  flex-direction: column;
`;

export const Title = styled.Text`
  display: flex;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 18px;
  padding: 10px 10px 0px 0px;
`;

export const TitleDate = styled.Text`
  display: flex;
  color: #fff;
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 15px;
  margin: 10px 10px 10px 5px;
`;

export const TitleTimeStart = styled.Text`
  display: flex;
  color: #fff;
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 15px;
  margin: 10px 10px 10px 3px;
`;

export const RowButtom = styled.View`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  align-items: center;
`;

export const Image = styled.Image`
  display: flex;
  margin-right: 3px;
`;

export const ImageTitle = styled.Text`
  display: flex;
  color: #fff;
  text-align: center;
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 15px;
`;
