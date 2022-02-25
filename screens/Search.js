import React, { useEffect } from "react";
import {
  Image,
  TextInput,
  useWindowDimensions,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import { useLazyQuery, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.7);
  width: ${(props) => props.width / 1.5 + "px"};
  color: black;
  padding: 3px 10px;
  border-radius: 10px;
`;

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

const SearchingContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`;
const SearchingText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const SEARCH_PHOTOS = gql`
  query searchPhotos($page: Int!, $keyword: String!) {
    searchPhotos(page: $page, keyword: $keyword) {
      id
      file
    }
  }
`;

function Search({ navigation }) {
  const numColumns = 3;
  const { width } = useWindowDimensions();
  const { register, setValue, watch, handleSubmit } = useForm();

  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTOS);

  //handleSubmit을 이용하지 않고, useLazyQuery에서 option을 주어서 실행하면,
  //watch의 값이 바뀔때마다 rerender, 성능 매우 떨어짐
  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: { keyword, page: 1 },
    });
  };

  const SearchBox = () => (
    <Input
      placeholderTextColor="rgba(0,0,0,0.8)"
      placeholder="Search Photos"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      onChangeText={(text) => setValue("keyword", text)}
      autoCorrect={false}
      onSubmitEditing={handleSubmit(onValid)}
      width={width}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", { required: true });
  }, []);

  const renderItem = ({ item: photo }) => (
    <TouchableOpacity>
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );

  return (
    <DismissKeyboard>
      <Container>
        {loading ? (
          <SearchingContainer>
            <ActivityIndicator color="white" size="large" />
            <SearchingText>Searching...</SearchingText>
          </SearchingContainer>
        ) : !called ? (
          <SearchingContainer>
            <SearchingText>Search by keyword</SearchingText>
          </SearchingContainer>
        ) : !data?.searchPhotos || data?.searchPhotos.length === 0 ? (
          <SearchingContainer>
            <SearchingText>Could not find anything</SearchingText>
          </SearchingContainer>
        ) : (
          <FlatList
            numColumns={numColumns}
            style={{ width: "100%" }}
            data={data?.searchPhotos}
            keyExtractor={(photo) => "" + photo.id}
            renderItem={renderItem}
          ></FlatList>
        )}
      </Container>
    </DismissKeyboard>
  );
}

export default Search;
