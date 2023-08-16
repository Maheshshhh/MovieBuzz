import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Button,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useState, useEffect} from 'react';
import Asset from '../assets/Asset';
import {useSelector, useDispatch} from 'react-redux';
import {serCurrentUser} from '../state/slice';
const Login = ({navigation}) => {
  const userData = useSelector(state => state.userDetails.users);
  const dispatch = useDispatch();

  const [logInDetails, setLogInDetails] = useState({
    userName: '',
    password: '',
  });

  const handleOnChange = (field, value) => {
    setLogInDetails(preState => ({
      ...preState,
      [field]: value,
    }));
  };
  const handleLogin = () => {
    isUserExist = userData.find(
      user =>
        user.email === logInDetails.userName &&
        user.password === logInDetails.password,
    );
    console.log('isUserExist--', isUserExist);
    console.log('userData--', userData);
    if (!logInDetails.userName || !logInDetails.password) {
      Alert.alert('Please enter details First');
    } else if (!isUserExist) {
      Alert.alert('Username or Password is incorrect');
    } else {
      dispatch(serCurrentUser(isUserExist.email));
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={Asset.bgImage1} style={styles.bgImage}>
        <View style={styles.headerLogin}>
          <Text style={styles.loginText}>Login</Text>
        </View>
        <View style={styles.loginData}>
          <Text style={styles.welcome}>Welcome to MovieBuzz</Text>
          <Text style={styles.loginAcc}>Login to your account</Text>
          <TextInput
            placeholder="Username as email"
            value={logInDetails.userName}
            onChangeText={text => handleOnChange('userName', text)}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            value={logInDetails.password}
            onChangeText={text => handleOnChange('password', text)}
            secureTextEntry={true}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={{color: 'purple', left: '25%'}}>
              Forgot Password ?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleLogin()}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                padding: 5,
              }}>
              Login
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', top: '80%'}}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{color: 'purple'}}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerLogin: {
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'purple',
  },
  loginData: {
    height: '85%',
    backgroundColor: 'white',
    padding:60,
    borderTopLeftRadius: 150,
    alignItems: 'center',
  },
  welcome: {
    color: 'purple',
    fontSize: 25,
    marginTop: '10%',
  },
  loginAcc: {
    fontSize: 16,
  },
  textInput: {
    borderRadius: 25,
    backgroundColor: 'lightgrey',
    width: '100%',
    marginTop: '5%',
    paddingLeft: 10,
    padding:10
  },
  loginButton: {
    top: '40%',
    width: '90%',
    backgroundColor: 'purple',
    borderRadius: 100,
  },
  bgImage: {
    resizeMode: 'contain',
    flex:1
  },
});

export default Login;
