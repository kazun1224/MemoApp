import React from "react";
import { StyleSheet, ScrollView, View, Text} from 'react-native';
import AppBar from "../components/AppBar";
import CircleButton from "../components/CircleButton";

export default function MemoDetailScreen() {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle}>買い物リスト</Text>
        <Text tyle={styles.memoDate}>2020年12月24日 10:00</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
          買い物リスト
          書体やレイアウトなどを確認するのに用いります
          本文用なので使い方を間違えると不自然に見える
        </Text>
      </ScrollView>
      <CircleButton style={{top: 160,bottom: 'auto'}} name='edit-2' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
  },
  memoHeader: {
    backgroundColor:'#467FD3',
    height:96,
    justifyContent: 'center',
    paddingVertical:24,
    paddingHorizontal:19,
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
