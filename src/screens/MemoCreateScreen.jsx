import React from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native';
import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboradSafeView';

export default function MemoCreateScreen(props) {
  const { navigation } = props;
  return (
    <KeyboardSafeView style={styles.container}>
      <View style={styles.inputContainer}>
          <TextInput value='' multiline style={styles.input} />
      </View>
      <CircleButton
        name='check'
        onPress={ () => { navigation.goBack();} }
      />
    </KeyboardSafeView>
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
