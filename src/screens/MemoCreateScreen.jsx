import React from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native';
import AppBar from '../components/AppBar';
import CircleButton from '../components/CircleButton';
import Icon from '../components/Icon';

export default function MemoCreateScreen() {

  return (
    <KeyboardAvoidingView style={styles.container}>
      <AppBar />
      <View style={styles.inputContainer}>
          <TextInput value='' multiline style={styles.input} />
      </View>
      <CircleButton name='check' />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  inputContainer: {
    paddingVertical: 32, // 縦幅
    paddingHorizontal: 27, //横幅
    flex: 1, //画面いっぱいに表示
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  }
});
