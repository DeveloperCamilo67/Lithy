import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f3f5f4;
`;
export const Header = styled.View.attrs({
  shadowColor: "#454d65",
  shadowOffset: { height: 5 },
  elevation: 5,
  shadowRadius: 5,
  shadowOpacity: 0.2,
  zIndex: 10
})`
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #ebecf4;
  border-bottom-start-radius:10px;
  border-bottom-end-radius:10px;

  
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
  width: undefined; 
  height: 100px;
  padding-right:130px
  margin:10px
  margin-top:30px
`;
export const LogoDos = styled.Image`
  width: 100px; 
  height: 100px;
  margin:30px

`;