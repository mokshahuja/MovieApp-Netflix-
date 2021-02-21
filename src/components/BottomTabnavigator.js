import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const bottomTab = createBottomTabNavigator();

const BottomTabnavigator = () => {
  return (
    <bottomTab.Navigator initialRouteName="Home">
      <bottomTab.Screen name="Home" component={HomeScreen} />
    </bottomTab.Navigator>
  );
};

export default BottomTabnavigator;
