import PropTypes from "prop-types";
import React from "react";
import { ActivityIndicator, View } from "react-native";

function ScreenLayout({ loading, children }) {
  console.log(children);
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
}

ScreenLayout.PropTypes = {
  loading: PropTypes.bool.isRequired,
};

export default ScreenLayout;
