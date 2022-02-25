import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Photo from "../screens/Photo";
import { Image } from "react-native";
import Likes from "./../screens/Likes";
import Comments from "./../screens/Comments";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      mode="card"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "black",
        },
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name="FeedScreen"
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  maxWidth: "100%",
                  maxHeight: 100,
                }}
                resizeMode="center"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="SearchScreen" component={Search} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name="NotificationsScreen" component={Notifications} />
      ) : null}
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="PhotoScreen" component={Photo} />
      <Stack.Screen name="LikesScreen" component={Likes} />
      <Stack.Screen name="CommentsScreen" component={Comments} />
    </Stack.Navigator>
  );
}
