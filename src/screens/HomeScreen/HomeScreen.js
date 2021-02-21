import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from "react-native";
import Header from "../../components/Header";
import { createStackNavigator } from "@react-navigation/stack";
import Row from "../../components/Row";
import MovieInfo from "../InfoScreen/Movie";

const Stack = createStackNavigator();
export default function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieInfo"
        component={MovieInfo}
        options={{
          headerStyle: { backgroundColor: "#000" },
          headerTitleStyle: { color: "#fff" },
        }}
      />
    </Stack.Navigator>
  );
}

function Home({ navigation }) {
  const [genres, setGenres] = useState(null);
  const [trending, setTrending] = useState(null);
  const [index, setIndex] = useState(0);
  const [gNames, setGnames] = useState([]);
  const API_KEY = "02e1cbd849b17d1d2c35dcffede49fa3";

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTrending(data.results);
        })
        .catch((err) => console.log(err.message));
      fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => {
          setGenres(data.genres);
        })
        .catch((err) => console.log(err.message));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (trending) {
      setIndex(Math.floor(Math.random() * trending.length));
    }
  }, [trending]);

  useEffect(() => {
    const helper = () => {
      if (genres && trending) {
        const arr = trending[index].genre_ids;
        const ans = [];
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < genres.length; j++) {
            if (genres[j].id === arr[i]) {
              ans.push(genres[j].name);
              break;
            }
          }
        }
        setGnames(ans);
      }
    };
    helper();
  }, [index]);

  console.log(index);
  console.log(gNames);
  return (
    <View style={{ backgroundColor: "#000", flex: 1 }}>
      {genres && trending && (
        <FlatList
          data={genres}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View>
              <Header path={trending[index].poster_path} gNames={gNames} />
              <FlatList
                data={trending}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      style={{ margin: 5 }}
                      onPress={() =>
                        navigation.navigate("MovieInfo", {
                          movie: item,
                        })
                      }
                    >
                      <Image
                        source={{
                          uri: `http://image.tmdb.org/t/p/w500/${item.poster_path}`,
                        }}
                        style={{ height: 300, width: 200, borderRadius: 5 }}
                        resizeMode="cover"
                      />
                    </Pressable>
                  );
                }}
              />
            </View>
          }
          renderItem={({ item }) => {
            return (
              <View style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#fff",
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  {item.name}
                </Text>
                <Row key={item.id} id={item.id} navigation={navigation} />
              </View>
            );
          }}
        />
      )}

      {(!genres || !trending) && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: Dimensions.get("screen").height / 10,
          }}
        >
          <ActivityIndicator size="large" color="lightblue" />
        </View>
      )}
    </View>
  );
}

// https://seeklogo.com/images/N/netflix-logo-6A5D357DF8-seeklogo.com.png
