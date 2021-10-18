import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { shape, string } from 'prop-types';
import firebase from 'firebase';
import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboradSafeView';

import { translateError } from '../utils';

export default function MemoEditScreen(props) {
  const { navigation, route } = props;
  // 上でrouteを定義しMemoDetailScreenから受け割ってきたid,bodyTextを引き出す
  const { id, bodyText } = route.params;
  // 渡ってきたメモデータを編集できるようuseStateを使う
  // 初期値に渡ってきたbodyTextにセット
  const [body, setBody] = useState(bodyText);
  function handlePress() {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`user/${currentUser.uid}/memos`).doc(id);
      ref.set({
        bodyText: body,
        updatedAT: new Date(),
      }, { merge: true })
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          const errorMes = translateError(error.code);
          Alert.alert(errorMes.title, errorMes.description);
        });
    }
  }
  return (
    <KeyboardSafeView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={body}
          multiline
          style={styles.input}
          onChangeText={(text) => {setBody(text);}}
        />
      </View>
      <CircleButton
        name="check"
        onPress={handlePress}
      />
    </KeyboardSafeView>
  );
}

MemoEditScreen.propTypes = {
  route: shape({
    params: shape({ id: string, bodyText: string }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  inputContainer: {
    flex: 1, // 画面いっぱいに表示
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 27,
  },
});
