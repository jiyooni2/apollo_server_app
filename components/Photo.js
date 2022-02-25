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

function Photo({ id, user, caption, file, isLiked, likes }) {
  const navigation = useNavigation();
  //get the devices's width
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(screenHeight - 450);

  // 원래 받아서 처리해야되느데 일단 이렇게 하자
  isLiked = true;

  useEffect(() => {
    Image.getSize(file, (width, height) => {
      if (height > screenHeight - 100) {
        setImageHeight(screenHeight - 200);
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
        <Action>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            color={isLiked ? "tomato" : "white"}
            size={22}
          ></Ionicons>
        </Action>
        <Action onPress={() => navigation.navigate("Comments")}>
          <Ionicons
            name="chatbubble-outline"
            color="white"
            size={22}
          ></Ionicons>
        </Action>
      </Actions>
      <TouchableOpacity onPress={() => navigation.navigate("LikesScreen")}>
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
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
  comments: PropTypes.number.isRequired,
};

export default Photo;
