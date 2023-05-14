import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const Content = styled.View`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;

export const Box = styled.View`
  display: flex;
  flex-direction: column;
  margin: 10px 8px 0 8px;
`;

export const BoxRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Title = styled.Text`
  display: flex;
  color: #000;
  font-size: 16px;
  font-weight: 500;
`;

export const MakerBase = styled.View`
  display: flex;
  background-color: #7000ad;
  margin-left: 5px;
  border-radius: 25px;
`;

export const Maker = styled.Text`
  display: flex;
  margin: 4px;
  color: #fff;
  font-weight: 900;
  font-size: 12px;
`;

export const ButtomRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 30px 0;
`;

export const ButtomBase = styled.View`
  display: flex;
  background-color: #7000ad;
  flex-direction: row;
  border-radius: 10px;
  justify-content: flex-start;
  align-items: center;
`;

export const ButtomLogo = styled.View`
  display: flex;
  width: 70px;
  height: 65px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtomText = styled.Text`
  display: flex;
  margin: 4px;
  color: #fff;
  font-weight: 600;
  font-size: 22px;
  word-wrap: break-word;
  width: 92px;
  letter-spacing: 1px;
`;


export const Description = styled.Text`
  width: 100%;
  text-align: center;
  padding: 10px 15px;
  color: #000;
  font-size: 18px;
  font-weight: 200;
  line-height: 30px;
`;

export const HomeHeader = styled.View`
  margin-bottom: 110px;
  width: 100%;
`;

export const Logo = styled.View`
  position: absolute;
  top: 250;
  left: 30;
  z-index: 1000;
  background-color: #01b282;
  padding: 30px;
  border-radius: 10px;
`;

export const LogoText = styled.Text`
  color: #fff;
  font-size: 25px;
`;

export const ButtomStart = styled.View`
  position: absolute;
  bottom: 15px;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ButtomStartText = styled.Text`
  color: #fff;
  font-size: 15px;
`;
