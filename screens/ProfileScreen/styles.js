import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Profile = styled.View`
  margin: 64px 0;
  align-items: center;
  shadow-color: #151734;
  shadow-radius: 30px;
  shadow-opacity: 0.4;
  elevation: 4;
`;

export const Avatar = styled.Image`
  width: 136px;
  height: 136px;
  border-radius: 68px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 24px;
`;

export const LogoutButton = styled.TouchableOpacity`
  width: 90%;
  padding: 10px;
  margin: 10px 30px;
  background: #87d396;
  border-radius: 4px;
  height: 52px;
  align-items: center;
  justify-content: center;
`;

export const LogoutButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
`;

export const Feed = styled.FlatList`
  margin: 0 16px;

  margin-left: 10px;
  width: undefined;
  margin-top: 10px;
  height: 380px;
  

  
`;

export const ImageBack = styled.ImageBackground`

border-radius: 5px;

`;