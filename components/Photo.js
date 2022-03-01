import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  Touchable,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  padding: 7px;
  align-items: center;
`;
//Like and Comment
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Likes = styled.Text`
  color: white;
  margin: 0px 7px;
  font-weight: 600;
`;
const Caption = styled.View`
  padding: 7px;
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: white;
`;

const ExtractContainer = styled.View`
  padding: 10px;
`;

const TOGGLE_LIKE_MUTATION = gql`
  mutation ($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

function Photo({ id, user, caption, file, isLiked, likes }) {
  console.log(id, user, caption, isLiked, likes);
  const [liked, setLiked] = useState(isLiked);
  const [likesNumber, setLikesNumber] = useState(likes);

  const navigation = useNavigation();
  //get the devices's width
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(screenHeight - 450);

  const onCompleted = (data) => {
    const { ok } = data.toggleLike;
    if (ok) {
      setLiked((current) => !current);
      if (liked) {
        setLikesNumber((current) => current - 1);
      } else {
        setLikesNumber((current) => current + 1);
      }
    }
  };

  const [toggleLike, { data, loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    onCompleted,
  });

  useEffect(() => {
    Image.getSize(file, (width, height) => {
      if (height > screenHeight - 100) {
        setImageHeight(screenHeight - 300);
      } else {
        setImageHeight(height);
      }
    });
  });

  return (
    <Container>
      <Header onPress={() => navigation.navigate("ProfileScreen")}>
        <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
        <Username>{user.username}</Username>
      </Header>
      <File
        resizeMode="cover"
        style={{ width: screenWidth, height: imageHeight }}
        source={{ uri: file }}
      />
      <Actions>
        <Action onPress={() => toggleLike({ variables: { id } })}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            color={liked ? "tomato" : "white"}
            size={22}
          ></Ionicons>
        </Action>
        <Action onPress={() => navigation.navigate("CommentsScreen")}>
          <Ionicons
            name="chatbubble-outline"
            color="white"
            size={22}
          ></Ionicons>
        </Action>
      </Actions>
      <TouchableOpacity
        onPress={() => navigation.navigate("LikesScreen", { id })}
      >
        <Likes>
          {likesNumber <= 1 ? likesNumber + " like" : `${likesNumber} likes`}
        </Likes>
      </TouchableOpacity>
      <Caption>
        <CaptionText>{caption}</CaptionText>
      </Caption>

      <ExtractContainer></ExtractContainer>
    </Container>
  );
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  caption: PropTypes.string,
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool,
  likes: PropTypes.number.isRequired,
};

export default Photo;
