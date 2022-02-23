import React, { useState } from 'react';
import { Text, View, StyleSheet ,Button} from 'react-native';

import {TextInput} from 'react-native-paper';

import {RoundedButton} from '../../components/RoundedButton';


import {fontsizes , spacing} from '../../util/size'

import {colors} from '../../util/colors';

import {FocusHistory} from './FocusHistory';


export const Focus=({addSubject})=> {
  const [focusSubject, setFocusSubject] = useState(null);

  const [tempSubject, setTemp]=useState(null);

  return (
    <View style={styles.container}>
    <View style={styles.titlecontainer}>
    <Text style={styles.title}> what would you like to focus on</Text>
    <View style={styles.inputContainer}>
    <TextInput style={{flex:1,marginRight:20}}
    onSubmitEditing={
      ({nativeEvent})=>{
        setTemp(nativeEvent.text)
      }
    } />
    <RoundedButton size={65}  title="+" onPress={()=>{addSubject(tempSubject)}}/>
    </View>
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#008080",
    //backgroundColor: '#ecf0f1',
    paddingTop: spacing.md,
  },

  titlecontainer:{
    padding:spacing.md,
    justifyContent:"center",

  },
  title:{
    color:colors.white,
    fontWeight:"bold",
    fontSize:fontsizes.lg,
  },

  inputContainer:{
    paddingTop:spacing.md,
    flexDirection:"row",
    alignItems:"center",
  }
});