import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import firebase from 'firebase';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { translateError } from '../utils';

export default function LogInScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setLoading] = useState(true);

  //ログイン状態を保持する記述
  useEffect(() => {
     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        navigation.reset({
          index: 0,
          routes:[{name: 'MemoList'}],
        });
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  },[]);//useEffectをオブジェクトにすることで一回のみの処理になる

  //submitを押された後の処理
  function handlePress() {
    setLoading(true);
    //ログインの実装(.thenと.catchまではワンセット)
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((userCredential) => {
      const { user } = userCredential;
      console.log(user.uid);
      navigation.reset({
        index: 0,
        routes: [{ name: 'MemoList' }],
      });
    })
    .catch((error) => {
      const errorMes = translateError(error.code);
      Alert.alert(errorMes.title, errorMes.description);
    })
    .then(() => {
      setLoading(false);
    });
  }

  return (
    <View style={StyleSheet.container}>
      <Loading isLoading={isLoading} />
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => { setEmail(text );}}
          autoCapitalize='none'
          keyboardType='email-address'
          placeholder='Email Address'
          textContentType='emailAddress'
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => { setPassword(text); }}
          autoCapitalize='none'
          placeholder='Password'
          secureTextEntry
          textContentType='password'
        />
        <Button
          label="Submit"
          onPress={handlePress}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registered?</Text>
          <TouchableOpacity
            onPress={() =>{
              navigation.reset({
                index: 0,
                routes: [{name: 'SignUp'}],
              });
            }}
          >
            <Text style={styles.footerLink}>Sign up here!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8'
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 48,
    color: '#000',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467FD3',
  },
  footer: {
    flexDirection: 'row',
  },
});
