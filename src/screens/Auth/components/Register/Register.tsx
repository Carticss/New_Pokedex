import Animated, {SlideInRight, SlideOutLeft} from 'react-native-reanimated';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import React from 'react';

const Register = ({
  setEmail,
  email,
  setError,
  error,
  setPassword,
  password,
  handleRegister,
}: {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  handleRegister: () => void;
}): React.JSX.Element => {
  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutLeft}
      style={{
        alignItems: 'center',
      }}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={setEmail}
        onChange={() => {
          setError('');
        }}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        onChange={() => {
          setError('');
        }}
        value={password}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Register" onPress={handleRegister} />
    </Animated.View>
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
    width: wp('60%'),
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

export default Register;
