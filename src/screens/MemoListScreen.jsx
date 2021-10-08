import React, {useEffect, useState} from "react";
import { StyleSheet, View, Alert } from 'react-native';
import firebase from "firebase";

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogoutButton from "../components/LogoutButton";

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutButton />,
    });
  },[]);

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if(currentUser) {
      const ref = db.collection(`user/${currentUser.uid}/memos`).orderBy('updatedAT','desc');
      unsubscribe = ref.onSnapshot((snapshot) => {
        //カラの配列を準備
        const userMemos = [];
        snapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
          const data = doc.data();
          //pushで配列の中に下記のデータ(オブジェクトの情報)を入れてく
          userMemos.push({
            id: doc.id,
            bodyText: data.bodyText,
            //.toDateでタイムスタンプ型からjavascriptのデータ型に変換する
            updatedAT: data.updatedAT.toDate(),
          });
        });
        //配列に入ったデータをuseStateでsetMemosにセットする
        setMemos(userMemos);
      },(error) => {
        console.log(error);
        Alert.alert('データの読み込みに失敗しました。');
      });
    }
    //監視し続けるのでキャンセルするためにunsubscribeで定義して最後にunsubscribeを返す
    return unsubscribe;
  },[]);

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton name='plus'
        onPress={() => {navigation.navigate('MemoCreate');}}
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
