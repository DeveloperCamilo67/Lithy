import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
export const Header = styled.View.attrs({
  shadowColor: "#87d396",
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
  
  border-bottom-left-radius:15px;
  border-bottom-right-radius:15px;
border-color: #87d396;
  border-left-width: 1px;
  border-right-width: 1px;





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
export const Image = styled.Image`
  width: 62px; 
  height: 50px;
  margin-bottom: 10px;
  margin-right: 250px;
`;