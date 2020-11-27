import styled from "styled-components/native";

export const FeedItem = styled.View`
  background-color: #FFF ;
  border-radius: 5px;
  padding: 8px;
  margin: 8px 0;
  flex-direction: row;
`;


export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: column;
  justify-content: space-between;
`;
export const Footer = styled.View`
  flex-direction: row;
`;
export const Directionrow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Name = styled.Text`
  font-size: 26px;
  font-weight: 500;
  color: #454d65;
`;

export const Pais = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #454d65;
`;

export const Time = styled.Text`
  font-size: 11px;
  color: #c4c6ce;
  margin-top: 4px;
`;

export const Etiquetas = styled.Text`
  font-size: 18px;
  color: #87d396;
  margin-top: 4px;
`;

export const Avatar = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 16px;
`;

export const DescriptionText = styled.Text`
  margin-top: 18px;
  font-size: 14px;
  color: #838899;
`;

export const ImagePost = styled.Image`
width: 315px;
height: 450px;
  border-radius: 5px;
  margin: 16px 0;
  right:  50
`;