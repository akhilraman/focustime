
import React from 'react';

import {Text,View,StyleSheet} from 'react-native';

import {RoundedButton} from '../../components/RoundedButton';
export const Timing=({onchangeTime})=>{


  return(
    < >
    <RoundedButton  size={75} title={'20'} onPress={()=>onchangeTime(20)}/>
    <RoundedButton  size={75} title={'15'} onPress={()=>onchangeTime(15)}/>
    <RoundedButton  size={75} title={'10'}onPress={()=>onchangeTime(10)}/>
    </>

  )
}