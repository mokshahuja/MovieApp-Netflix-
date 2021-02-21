import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";

export default function Row({ navigation, id }) {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=02e1cbd849b17d1d2c35dcffede49fa3&language=en-US&sort_by=popularity.desc&with_genres=${id}`;
    const helper = async () => {
      await fetch(url)
        .then((data) => data.json())
        .then((data) => setMovies(data.results))
        .catch((err) => console.log(err.message));
    };
    helper();
  }, [id]);

  //   console.log(movies);

  return (
    <View>
      {movies && (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={{ marginHorizontal: 5 }}
                onPress={() => {
                  navigation.navigate("MovieInfo", {
                    movie: item,
                  });
                }}
              >
                <Image
                  source={{
                    uri: `http://image.tmdb.org/t/p/w500/${item.poster_path}`,
                  }}
                  style={{ height: 150, width: 100, borderRadius: 5 }}
                  resizeMode="cover"
                />
              </Pressable>
            );
          }}
        />
      )}
      {!movies && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: Dimensions.get("screen").height / 10,
          }}
        >
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </View>
  );
}
