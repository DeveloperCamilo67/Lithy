import styled from "styled-components/native";

export const FeedItem = styled.View`
  background-color: #fff ;
  border-radius: 10px;
  padding: 8px;
  margin: 2px 0;
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


export const ImagePost = styled.Image`
  width: 320px;
  height: 370px;
  border-radius: 5px;
  right:10
  margin: -12px 0;
`;

export const ViewPhoto = styled.View`
  margin: 32px 32px 0;
  width: undefined;
  height: 450px;
`;