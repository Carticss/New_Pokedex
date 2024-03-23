import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import Animated, {SlideInRight, SlideOutLeft} from 'react-native-reanimated';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import useLogin from './hooks/useLogin';

const LoginScreen = ({navigation}: any) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    mode,
    handleLogin,
    handleRegister,
    toggleMode,
  } = useLogin(navigation);

  return (
    <View style={styles.loginContainer}>
      <ImageBackground
        style={StyleSheet.absoluteFill}
        source={require('../../common/assets/body_bg.png')}
      />
      <Animated.View
        entering={SlideInRight}
        exiting={SlideOutLeft}
        style={styles.container}>
        <Image
          style={{
            width: 100,
            height: 100,
            position: 'absolute',
            top: -50,
            zIndex: 3,
          }}
          source={require('../../common/assets/pokeball.png')}
        />
        {mode === 'login' ? (
          <>
            <Login
              error={error}
              handleLogin={handleLogin}
              password={password}
              setError={setError}
              setPassword={setPassword}
              setEmail={setEmail}
              email={email}
            />
            <Animated.View
              entering={SlideInRight}
              exiting={SlideOutLeft}
              style={styles.changeModule}>
              <Animated.Text entering={SlideInRight} exiting={SlideOutLeft}>
                Already have an account?
              </Animated.Text>
              <TouchableOpacity onPress={toggleMode}>
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </Animated.View>
          </>
        ) : (
          <>
            <Register
              error={error}
              handleRegister={handleRegister}
              password={password}
              setError={setError}
              setPassword={setPassword}
              setEmail={setEmail}
              email={email}
            />
            <Animated.View
              entering={SlideInRight}
              exiting={SlideOutLeft}
              style={styles.changeModule}>
              <Animated.Text entering={SlideInRight} exiting={SlideOutLeft}>
                Already have an account?
              </Animated.Text>
              <TouchableOpacity onPress={toggleMode}>
                <Text style={styles.registerText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>
          </>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  changeModule: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 15,
  },
  registerText: {
    color: 'rgb(33,150,243)',
  },
});

export default LoginScreen;
