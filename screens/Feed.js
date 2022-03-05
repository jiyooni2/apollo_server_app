import React, { useState } from "react";
import styled from "styled-components/native";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragment";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "./../components/ScreenLayout";
import { isLoggedInVar } from "./../apollo";

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

const SEE_FEED_QUERY = gql`
  query ($offset: Int!) {
    seeFeed(offset: $offset) {
      id
      file
      likes
      user {
        username
        avatar
      }
      isLiked
      caption
      comments {
        id
        user {
          username
          avatar
        }
        payload
        isMine
        createdAt
      }
      createdAt
      isMine
    }
  }
`;

function Feed({ navigation }) {
  const [offset, setOffset] = useState(0);

  const { data, loading, refetch, fetchMore } = useQuery(SEE_FEED_QUERY, {
    variables: { offset },
  });

  console.log(data);

  //각각 하나씩 item을 인자로 줌
  const renderPhoto = ({ item }) => {
    return <Photo {...item} />;
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          })
        }
        onEndReachedThreshold={0.05}
        onRefresh={onRefresh}
        refreshing={refreshing}
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
