import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchMovieDetails} from '../api/moviesApi';
import Asset from '../assets/Asset';
import {useRoute} from '@react-navigation/native';
import {image500} from '../api/moviesApi';
import { FavoriteContext } from '../state/favoriteContext';

var {width, height} = Dimensions.get('window');

const Details = ({navigation, route}) => {
   const {params: item} = useRoute();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFavorite = favorites && favorites.some((favMovie)=> favMovie,id === movie.id)
  // const [isFavorite, setIsFavorite] = useState(favorites.some((favMovie)=>favMovie.id === movie.id));

  const { movieName } = route.params;
  const { favorites, addToFavorites } = useContext(FavoriteContext);

  useEffect(() => {
    setLoading(true);
    getMovieDetials(item.id);
  }, [item]);

  const getMovieDetials = async id => {
    const data = await fetchMovieDetails(id);
    console.log('got movie details', data);
    setLoading(false);
    if (data) {
      setMovie({...movie, ...data});
    }
  };
  const addToFavorite = () => {
    if (!isFavorite){
      addToFavorites(movie);
      Alert.alert('Added to Favorite')
//setIsFavorite(true);
    } else {
      Alert.alert('Already added')
    }
   
  };

  const addToWatchList = () => {
    Alert.alert('Added to WatchList')
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
    <ScrollView style={{ height:'88%'}}>
      <Image
        source={{uri: image500(movie?.poster_path)}}
        style={{width: width, height: height * 0.66,resizeMode:'stretch'}}
      />
      <TouchableOpacity onPress={()=> navigation.goBack()} style={{position:'absolute'}}>
     <Image source={Asset.backButton} style={{resizeMode:'contain',}}/>
     </TouchableOpacity>
        <Text style={{fontSize:18, color:'black'}}>
            {
                movie?.title
            }
        </Text>
        {
            movie?.id? (
                <Text style={{fontSize:16, color:'black'}}>
                    {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
                </Text>
            ):null
        }
        <Text style={{fontSize:14}}>
            {
                movie?.overview
            }
        </Text>
      <View>
      </View>
    </ScrollView>
    <View style={{flexDirection:'row', height:'12%', justifyContent:'space-around', alignItems:'center'}}>
        <TouchableOpacity onPress={()=> addToFavorite()}>
          <Image source={Asset.favorite} style={{height:60, width:60}} />
          <Text style={{color:'black', textAlign:'center'}}>Favorite</Text>
        </TouchableOpacity>
     
        <TouchableOpacity onPress={()=> addToWatchList()}>
          <Image source={Asset.watchList} style={{height:60, width:60}} />
          <Text style={{color:'black', textAlign:'center'}}>WatchList</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default Details;
