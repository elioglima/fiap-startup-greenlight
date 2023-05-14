import styled from 'styled-components/native';

export const Title = styled.Text`
  width: 100%;
  text-align: center;
  color: #000;
  font-size: 24px;
  font-weight: 500;
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
  top: 200px;
  left: 30px;
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
  left: 15%;
  width: 70%;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ButtomStartText = styled.Text`
  color: #fff;
  font-size: 15px;
`;
