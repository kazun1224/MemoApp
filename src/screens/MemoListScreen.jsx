import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogoutButton from '../components/LogoutButton';
import Button from '../components/Button';
import Loading from '../components/Loading';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutButton />,
    });
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      setLoading(true);
      const ref = db.collection(`user/${currentUser.uid}/memos`).orderBy('updatedAT', 'desc');
      unsubscribe = ref.onSnapshot((snapshot) => {
        // カラの配列を準備
        const userMemos = [];
        snapshot.forEach((doc) => {
          // console.log(doc.id, doc.data());
          const data = doc.data();
          // pushで配列の中に下記のデータ(オブジェクトの情報)を入れてく
          userMemos.push({
            id: doc.id,
            bodyText: data.bodyText,
            // .toDateでタイムスタンプ型からjavascriptのデータ型に変換する
            updatedAT: data.updatedAT.toDate(),
          });
        });
        // 配列に入ったデータをuseStateでsetMemosにセットする
        setMemos(userMemos);
        setLoading(false);
      }, () => {
        // console.log(error);
        setLoading(false);
        Alert.alert('データの読み込みに失敗しました。');
      });
    }
    // 監視し続けるのでキャンセルするためにunsubscribeで定義して最後にunsubscribeを返す
    return unsubscribe;
  }, []);

  if (memos.length === 0) {
    return (
      <View style={emptyStyles.container}>
        <Loading isLoading={isLoading} />
        <View style={emptyStyles.inner}>
          <Text style={emptyStyles.title}>最初のメモを作成しよう！</Text>
          <Button
            style={emptyStyles.button}
            label="作成する"
            onPress={() => { navigation.navigate('MemoCreate'); }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
});

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    alignSelf: 'center',
  },
});
