import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 32px;
  border-bottom-width: 1px;
  border-bottom-color: #d8d9db;
`;

export const HeaderDos = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 10px;
`;
export const Post = styled.TouchableOpacity`

background-color: #87d396;
padding: 10px;
padding-top: 7px;
padding-bottom: 7px;
border-radius: 4px;
opacity: 0.9px;

`;

export const Title = styled.Text`
font-size: 20px;
font-weight: 500;
color:#000

`;

export const TitleDos = styled.Text`
font-size: 15px;
font-weight: 500;
color:#fff

`;
export const Txt = styled.Text`
  font-weight: 500;
  font-size: 15;
  color:#000;

`;
export const BackButton = styled.TouchableOpacity``;

export const InputContainer = styled.View`
  margin: 12px;
  background-color: #FFF;
  flex-direction: row;
  border-width:2px;
  border-color: #2d2;
  border-bottom-start-radius:10px;
  border-bottom-end-radius:10px;
  border-top-end-radius:10px;
`;

export const Avatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;

  margin-left: 8px;
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const TextInputContainer = styled.TextInput`
  flex: 1;
  margin-left:12px
  
`;

export const Photo = styled.TouchableOpacity`
  align-items: flex-end;
  margin: 0 22px;
  position: relative;
  margin-top: 15px;
`;

export const ViewPhoto = styled.View`
  margin: 32px 32px 0;
  width: undefined;
  height: 450px;
`;

export const ImageState = styled.Image`
width: undefined;
height: 450px;
  /* background-color: #ccc; */
`;
export const Logo = styled.Image`
  width: 50px; 
  height: 50px;
  padding-right:130px
  margin:10px
  margin-top:30px
`;
