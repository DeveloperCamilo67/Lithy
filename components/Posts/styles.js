import styled from "styled-components/native";

export const FeedItem = styled.View.attrs({
  shadowColor: "#87d396",
  shadowOffset: { height: 5 },
  elevation: 5,
  shadowRadius: 5,
  shadowOpacity: 0.2,
  zIndex: 10
})
`
  background-color: #fff ;
 
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
export const Boton = styled.TouchableOpacity`

background-color: #87d396;
left:80px;
width:35;
height:35;
border-radius: 4px;


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
  width: 48px;
  height: 48px;

  margin-right: 4px;
  right:6px;
  bottom: 5px;
 
`;

export const DescriptionText = styled.Text`
  margin-top: 18px;
  font-size: 14px;
  color: #838899;
`;

export const ImagePost = styled.Image`
width: 315px;
height: 450px;
  border-radius: 10px;
  margin: 2px;
  right:  53
`;