import * as React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  SafeAreaView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useState, useEffect} from 'react';
import Asset from '../assets/Asset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetailsSelector} from '../selector/getUserDetailsSelector';
import {handleLogOut} from '../state/slice';

var {width, height} = Dimensions.get('window');

const Profile = ({navigation}) => {
  const userDetail = useSelector(getUserDetailsSelector);
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      dispatch(handleLogOut());
      Alert.alert('Logout Successful');
    } catch (error) {
      console.error('err', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!userDetail?.userName ? (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            source={Asset.notLoggedIn}
            style={{top: '10%', resizeMode: 'contain'}}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              top: '15%',
              backgroundColor: 'purple',
              width: '50%',
              alignItems: 'center',
              padding: 5,
              borderRadius: 20,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              Please Login
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.userDetails}>
            <Text style={styles.userInfo}>
              Username: {userDetail?.userName}
            </Text>
            <Text style={styles.userInfo}>Email: {userDetail?.email}</Text>
            <Text style={styles.userInfo}>Phone No: {userDetail?.phone}</Text>
            <View
              style={{
                width: '50%',
                backgroundColor: 'purple',
                padding: 3,
                alignItems: 'center',
                borderTopRightRadius: 30,
              }}>
              <TouchableOpacity>
                <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>
                  Update Details
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '50%',
                backgroundColor: 'purple',
                padding: 3,
                alignItems: 'center',
                borderTopRightRadius: 100,
                top: '1%',
              }}>
              <TouchableOpacity>
                <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>
                  Change Password
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderColor: 'grey',
                borderWidth: 0.5,
                marginTop: '2%',
              }}></View>
            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Favorite')}
                  style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    My Favorites{' '}
                  </Text>
                  <Image
                    source={Asset.favorite}
                    style={{height: 40, width: 40}}
                  />
                </TouchableOpacity>
              </View>
              <View style={{borderColor: 'grey', borderWidth: 0.5}}></View>
              <View
                onPress={() => navigation.navigate('WatchList')}
                style={{
                  flexDirection: 'row',

                  alignItems: 'center',
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('WatchList')}
                  style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    My WatchList{' '}
                  </Text>
                  <Image
                    source={Asset.watchList}
                    style={{height: 40, width: 40}}
                  />
                </TouchableOpacity>
              </View>
              <View style={{borderColor: 'grey', borderWidth: 0.5}}></View>
            </View>
          </View>
          <View
            style={{
              height: '20%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: '70%',
                borderRadius: 20,
                backgroundColor: 'purple',
              }}
              onPress={() => logout()}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: 'white',
                  padding: 5,
                  fontWeight: 'bold',
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'grey',
  },
  userDetails: {
    height: '80%',
    padding: 10,
  },
  userInfo: {
    fontSize: 18,
    color: 'black',
    marginBottom: '2%',
    fontWeight: '500',
  },
});
