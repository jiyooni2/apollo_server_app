import React from "react";
import styled from "styled-components/native";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { Image, ScrollView } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Text = styled.Text`
  color: white;
  font-size: 30px;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;

const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 5px 15px;
`;

const SEE_PHOTO_LIKES = gql`
  query ($id: Int!) {
    seePhotoLikes(id: $id) {
      username
      avatar
    }
  }
`;

function Likes({ route }) {
  const { id } = route.params;

  const { data, loading } = useQuery(SEE_PHOTO_LIKES, { variables: { id } });

  return (
    <Container>
      {data?.seePhotoLikes.map((user) => (
        <UserContainer key={user.username}>
          <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
          <Text>{user.username}</Text>
        </UserContainer>
      ))}
    </Container>
  );
}

export default Likes;
