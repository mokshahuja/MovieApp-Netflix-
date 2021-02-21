import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ComingSoonScreen from "../screens/ComingSoonScreen/ComingSoonScreen";
import SeriesScreen from "../screens/SeriesScreen/SeiresScreen";
import MoreScreen from "../screens/MoreScreen/MoreScreen";
import Entypo from "react-native-vector-icons/Entypo";
import MCicon from "react-native-vector-icons/MaterialCommunityIcons";

const bottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <bottomTab.Navigator
      initialRouteName="Movie"
      tabBarOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: "gray",
        inactiveBackgroundColor: "#000",
        activeBackgroundColor: "#000",
      }}
    >
      <bottomTab.Screen
        name="Movie"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <MCicon name="movie" size={20} color={color} />;
          },
        }}
      />
      <bottomTab.Screen
        name="Series"
        component={SeriesScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <MCicon name="youtube-tv" size={20} color={color} />;
          },
        }}
      />
      <bottomTab.Screen
        name="Coming Soon"
        component={ComingSoonScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <MCicon name="clipboard-play-multiple" size={20} color={color} />
            );
          },
        }}
      />
      <bottomTab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Entypo name="menu" size={20} color={color} />;
          },
        }}
      />
    </bottomTab.Navigator>
  );
};

export default BottomTabNavigator;
