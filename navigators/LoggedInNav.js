import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import Upload from "./../screens/Upload";

const Stack = createStackNavigator();

function LoggedInNav() {
  return (
    <Stack.Navigator
      screenOptions={{ headerMode: "none", presentation: "modal" }}
    >
      <Stack.Screen name="Tabs" component={TabsNav} />
      <Stack.Screen name="Upload" component={Upload} />
    </Stack.Navigator>
  );
}

export default LoggedInNav;
