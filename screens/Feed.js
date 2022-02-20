import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { logUserOut } from "../apollo";
import { ActivityIndicatorViewNativeComponent } from "react-native/Libraries/Components/ActivityIndicator/ActivityIndicatorViewNativeComponent";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragment";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";
import ScreenLayout from "../components/ScreenLayout";
import Photo from "./Photo";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: black;
`;

const Text = styled.Text`
  color: white;
  font-size: 50px;
`;

const FEED_QUERY = gql`
  query {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

function Feed({ navigation }) {
  const { data, loading, refetch } = useQuery(FEED_QUERY);

  //각각 하나씩 item을 인자로 줌
  const renderPhoto = ({ item }) => {
    return <Photo {...item} />;
  };

  const [refreshing, setRefreshing] = useState(false);

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        refreshing={refreshing}
        onFresh={refetch}
        style={{ width: "100%" }}
        data={data?.seeFeed}
        //to String
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderPhoto}
        showsVerticalScrollIndicator={false}
      />
    </ScreenLayout>
  );
}

export default Feed;
