import React from "react";
import { View, Text, Image, Pressable, ImageBackground } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Inonicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

export default function Header({ path, gNames }) {
  return (
    <View>
      <ImageBackground
        source={{
          uri: `http://image.tmdb.org/t/p/w500/${path}`,
        }}
        imageStyle={{ opacity: 0.8 }}
        style={{ height: 500, width: "100%" }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["transparent", "transparent", "rgba(0,0,0,0.9)"]}
          style={{ height: "100%", width: "100%" }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <Image
              source={require("../../assets/netflix-logo.png")}
              style={{ height: 50, width: 50, marginTop: 10 }}
              resizeMode="contain"
            />
            <View
              style={{
                paddingTop: 20,
                flexDirection: "row",
                justifyContent: "space-around",
                width: "20%",
              }}
            >
              <View>
                <FontAwesome name="search" size={25} color="white" />
              </View>
              <View>
                <MaterialCommunityIcon
                  name="account-circle"
                  size={25}
                  color="white"
                />
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: 300,
              }}
            >
              {gNames.map((name, index) => {
                return (
                  <Text
                    key={index}
                    style={{ fontWeight: "bold", color: "#fff" }}
                  >
                    {name}
                  </Text>
                );
              })}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <View style={{ marginLeft: 20 }}>
                <Inonicons name="add" size={25} color="#fff" />
                <Text style={{ color: "#fff" }}>My List</Text>
              </View>
              <Pressable
                style={{
                  backgroundColor: "white",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: 80,
                  borderRadius: 5,
                  height: 40,
                }}
              >
                <Inonicons name="play" size={25} />
                <Text>Play</Text>
              </Pressable>
              <View style={{ marginRight: 20 }}>
                <Inonicons
                  name="information-circle-outline"
                  size={25}
                  color="#fff"
                />
                <Text style={{ color: "#fff" }}>Info</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#fff",
          marginLeft: 10,
          marginBottom: 10,
        }}
      >
        Trending
      </Text>
    </View>
  );
}
