import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f3f5f4;
`;
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 32px;
  border-bottom-width: 1px;
  border-bottom-color: #d8d9db;
`;

export const ImageBack = styled.ImageBackground`
flex:1;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;



export const Feed = styled.FlatList`
  margin: 0 16px;
  margin-left: 10px;
  width: undefined;

`;
export const Logo = styled.Image`
width: 150px; 
height: 150px;
margin:30px;
margin-left:68px;
`;
export const LogoDos = styled.Image`
  width: 100px; 
  height: 100px;
  margin:30px

`;

export const BackButton = styled.TouchableOpacity``;
