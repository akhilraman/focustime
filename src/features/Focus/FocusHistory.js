import React from 'react';

import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  FlatList,
} from 'react-native';

import {RoundedButton} from '../../components/RoundedButton';

import { fontsize } from '../../util/size';

const HistoryItems = ({ item, index }) => {
  return <Text style={styles.historyitem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        
        {!!focusHistory.length && (
          <>
          <Text style={styles.title}> Thing you focused on </Text>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1, alignItems: 'center' ,size:20,padding:10}}
            data={focusHistory}
            renderItem={HistoryItems}
          />

          <RoundedButton  style={styles.button} size={100} title={'clear'} onPress={()=>clearHistory()}/>

          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

  button:{
    alignSelf:'center',

  },
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },

  historyitem:(status)=>({
     color: status>0 ?'red':'green'
  })
});
