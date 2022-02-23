import React from "react";
import {TouchableOpacity,Text,StyleSheet } from "react-native";


export const RoundedButton=({
  style={},
  textStyle={},
  size=125,
  ...props
})=>{

  return(
    <TouchableOpacity style={[styles(size).radius,style]} onPress={props.onPress}>
    <Text style={[styles(size).text,textStyle]}>{props.title}</Text>
    </TouchableOpacity>

  )
};

const styles=(size)=>StyleSheet.create({
  radius:{
    boarderRadius:size/3,
    width:size,
    height:size/2,
    alignItems:"center",
    borderColor:"#fff",
    borderWidth:1,
    margin:30,

  },
  text:{
    color:"#fff",
    fontSize:size/4,
    textAlign:'center',
    justifyContent:'center',

  },
});