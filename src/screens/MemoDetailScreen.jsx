import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text} from 'react-native';
import CircleButton from '../components/CircleButton';
//ファイルを参照するときindex.jsは省略できる
import {dateToString} from '../utils';
import { shape, string } from 'prop-types';
import firebase from 'firebase';

export default function MemoDetailScreen(props) {
  const { navigation, route } = props;
  const { id } = route.params;
  console.log(id);
  const [memo, setMemo] = useState(null);

  useEffect(() => {
    //ドキュメントの参照
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {}
    if(currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`user/${currentUser.uid}/memos`).doc(id);
      //データを取得
      unsubscribe = ref.onSnapshot((doc) => {
        console.log(doc.id,doc.data());
        const data = doc.data();
        setMemo({
          id: doc.id,
          bodyText: data.bodyText,
          updatedAT: data.updatedAT.toDate(),
        });
      });
    }
    return unsubscribe;
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>{memo && memo.bodyText}</Text>
        <Text tyle={styles.memoDate}>{memo && dateToString(memo.updatedAT)}</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
          {memo && memo.bodyText}
        </Text>
      </ScrollView>
      <CircleButton
        style={{ top: 60, bottom: 'auto' }}
        name='pen'
        onPress={() =>{ navigation.navigate('MemoEdit') }}
      />
    </View>
  );
}

MemoDetailScreen.propTypes = {
  route: shape({
    params: shape({ id: string }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  memoHeader: {
    backgroundColor: '#467FD3',
    height:96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  memoDate: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 19,
  },
  memoText: {
    color: '#000',
    fontSize: 16,
    lineHeight: 24,
  },
});
