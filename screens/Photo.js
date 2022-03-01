import React from "react";
import styled from "styled-components/native";
import { gql, useQuery } from "@apollo/client";
import { ScrollView } from "react-native";
import Photo from "../components/Photo";
import { isConstValueNode } from "graphql";

const Text = styled.Text`
  color: white;
  font-size: 50px;
`;

const SEE_PHOTO = gql`
  query ($id: Int!) {
    seePhoto(id: $id) {
      id
      file
      likes
      user {
        username
        avatar
      }
      caption
      commentNumber
      createdAt
      isMine
    }
  }
`;

function PhotoScreen({ route }) {
  console.log(route);
  const { data, loading, refetch } = useQuery(SEE_PHOTO, {
    variables: {
      id: route?.params?.photoId,
    },
  });

  console.log(route?.params?.photoId);
  console.log(loading, data);
  return (
    <ScrollView
      style={{ backgroundColor: "black" }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "black",
      }}
    >
      {loading ? null : <Photo {...data?.seePhoto} />}
    </ScrollView>
  );
}

export default PhotoScreen;
