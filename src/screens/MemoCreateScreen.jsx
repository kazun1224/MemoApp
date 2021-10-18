import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  // KeyboardAvoidingView
} from 'react-native';
import firebase from 'firebase';
import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboradSafeView';

export default function MemoCreateScreen(props) {
  const { navigation } = props;
  // useStateを使ってテキストを反映させる処理を作る
  const [bodyText, setBodyText] = useState('');

  // データベースに保存する処理
  function handlePress() {
    // ログインしているをcurrentUserに定義
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    // コレクションを参照（現在ログインしているUSERのIDのデータを参照）
    const ref = db.collection(`user/${currentUser.uid}/memos`);
    // addはthen()とcatch()をつなぐことができる
    // データベースに保存する内容
    ref.add({
      bodyText,
      updatedAT: new Date(),
    })
      // 処理が成功したときの処理
      // ドキュメントを参照
      .then(() => { // docRef
        // ドキュメントにデータを出力
        // console.log('Created!', docRef.id);
        navigation.goBack();
      })
      // 処理が失敗したときの処理
      .catch((error) => {
        console.log('Error', error);
      });
  }

  return (
    <KeyboardSafeView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyText}
          multiline
          style={styles.input}
          onChangeText={(text) => { setBodyText(text); }}
          autoFocus// 画面遷移したらこのインプットに自動でFocusしてくれる
        />
      </View>
      <CircleButton
        name="check"
        onPress={handlePress}
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
    paddingHorizontal: 27, // 横幅
    flex: 1, // 画面いっぱいに表示
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});
