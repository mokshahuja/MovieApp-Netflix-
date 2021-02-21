import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Button } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import Inonicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { useScrollToTop } from "@react-navigation/native";

const Header = ({ movie }) => {
  return (
    <View style={{ backgroundColor: "#000" }}>
      <Image
        source={{
          uri: `http://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        }}
        style={{ width: "100%", height: 400 }}
        resizeMode="contain"
      />
      <View>
        <Text
          style={{
            fontSize: 20,
            color: "#fff",
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          {movie?.title || movie?.original_name || movie?.original_title}
        </Text>
        <View
          style={{
            width: "50%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginVertical: 11,
          }}
        >
          <Text style={{ color: "gray", fontWeight: "bold" }}>
            {movie?.release_date?.substr(0, 4) ||
              movie?.first_air_date?.substr(0, 4) ||
              "Unknown Year"}
          </Text>
          <Text
            style={{
              backgroundColor: "#6b6b6b",
              color: "#f0f0f0",
              width: 25,
              paddingLeft: 3,
              fontSize: 10,
              fontWeight: "bold",
            }}
          >
            {movie.adult ? "16+" : "10+"}
          </Text>
          <Text style={{ color: "green", fontWeight: "bold" }}>
            {movie.vote_average}
          </Text>
          <Text
            style={{
              backgroundColor: "#fff",
              color: "#000",
              width: 25,
              fontSize: 10,
              paddingLeft: 5,
              fontWeight: "bold",
            }}
          >
            HD
          </Text>
        </View>
      </View>
      <Button
        title="Play"
        icon={<Inonicons name="play" size={25} />}
        containerStyle={{
          width: "100%",
          backgroundColor: "#fff",
          height: 30,
          fontSize: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
        buttonStyle={{
          backgroundColor: "#fff",
          color: "#000",
        }}
        titleStyle={{ color: "#000", paddingLeft: 10 }}
      />
      <Text style={{ color: "#dedede", marginVertical: 10 }}>
        {movie.overview}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ marginLeft: 20, marginTop: 8 }}>
          <Inonicons name="add" size={25} color="#fff" />
          <Text style={{ color: "#fff" }}>My List</Text>
        </View>
        <View>
          <FontAwesome name="thumbs-o-up" size={25} color="#fff" />
          <Text style={{ color: "#fff" }}>Rate</Text>
        </View>
        <View style={{ marginRight: 20 }}>
          <Entypo name="share" size={25} color="#fff" />
          <Text style={{ color: "#fff" }}>Share</Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          height: 1,
          width: "100%",
          borderWidth: 1,
          borderColor: "lightgrey",
        }}
      ></View>
      <View>
        <Text
          style={{
            fontWeight: "bold",
            borderTopWidth: 3,
            borderTopColor: "red",
            color: "#fff",
            width: 110,
            marginTop: -5,
          }}
        >
          MORE LIKE THIS
        </Text>
      </View>
    </View>
  );
};

export default function Movie({ navigation, route }) {
  const { movie } = route.params;
  const [similar, setSimilar] = useState([]);
  useEffect(() => {
    // console.log(movie);
    const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=02e1cbd849b17d1d2c35dcffede49fa3&language=en-US&sort_by=popularity.desc&page=1&with_genres=`;
    const helper = async () => {
      const arr = movie.genre_ids;
      let query = "";

      query += arr[Math.floor(Math.random() * arr.length)].toString() + ",";

      const url = encodeURI(baseUrl + query);
      await fetch(url)
        .then((data) => data.json())
        .then((data) => setSimilar(data.results))
        .catch((err) => console.log(err.message));
    };
    helper();
  }, [movie]);

  return (
    <FlatList
      data={similar}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      ListHeaderComponent={<Header movie={movie} />}
      contentContainerStyle={{ backgroundColor: "#000" }}
      renderItem={({ item }) => {
        return (
          <Pressable
            style={{ width: "32%", backgroundColor: "#000" }}
            onPress={() => {
              navigation.push("MovieInfo", {
                movie: item,
              });
            }}
          >
            <Image
              source={{
                uri: `http://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
              resizeMode="cover"
              style={{
                width: "100%",
                marginHorizontal: 10,
                height: 200,
                marginVertical: 8,
              }}
            />
          </Pressable>
        );
      }}
    />
  );
}
