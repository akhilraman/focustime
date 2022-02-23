
import React ,{useState} from 'react';


import {Text,StyleSheet,View ,Vibration,Platform}from 'react-native';

import {colors} from '../../util/colors'

import {CountDown} from '../../components/CountDown'

import {spacing} from '../../util/size'

import {RoundedButton} from '../../components/RoundedButton'


import {ProgressBar} from 'react-native-paper';


import {Timing} from './Timing';

import {useKeepAwake} from 'expo-keep-awake';

export const Timer=({focusSubject,onTimerEnd,clearSubject})=>{

  useKeepAwake();

  const DEFAULT_TIME=0.1;
  const[minutes,setMinutes]=useState(DEFAULT_TIME);

  const [progress,setProgress]=useState(1);

  const[isStarted,setIsStarted]=useState(false);


  const onProgress=(progress)=>{
    setProgress(progress)

  }

  const changeTime=(mins)=>{

    setMinutes(mins)
    setProgress(1);
    setIsStarted(false);
  }


  const vibrate=()=>{
    if(Platform.OS=='ios'){
        const interval=setInterval(()=>Vibration.vibrate(),1000);
        setTimeout(()=>clearInterval(interval),10000);
    }else{
        Vibration.vibrate(10000);
    }
  }
  const onEnd=()=>{
    vibrate()
    setMinutes(DEFAULT_TIME)
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();

  }

  return (
    <View styles={styles.container}>
    <View style={styles.countdown}>
    <CountDown onEnd={onEnd} minutes={minutes} isPaused={isStarted} onProgress={onProgress}/>
    </View>
    <View style={{paddingTop:30}}>
    <Text style={styles.title}> Focusing on </Text>

    <Text style={styles.task}>{focusSubject}</Text>
    <View style={{padding:20}}>
    <ProgressBar  progress={progress} color='white' style={{ height:10}}/>
    </View>

    <View style={styles.buttonWrapper}>
    <Timing onchangeTime={changeTime}/>
    </View>


    <View style={styles.button}>
    {isStarted ? 
    <RoundedButton  title="Start" onPress={() => 
    setIsStarted(false)
  }/>:

    <RoundedButton  title="Pause"onPress={() => 
    setIsStarted(true)
  }/>
    }
    </View>
    <View style={styles.clearSubject}>
    <RoundedButton size={60}  title="-" onPress={()=>clearSubject()} />
    </View>
    </View>
    
    </View>
  )


}


const styles=StyleSheet.create({
  container:{
    flex:1,
  },

  title:{
    color: colors.white,
    textAlign:"center",
    fontSize:20
  },
  task:{
    color: colors.white,
    textAlign:"center",
    fontWeight:"bold",
    fontSize:20
  
  },
  countdown:{
    paddingTop:200,
    alignItems:'center',
    justifyContent:'center',


  },
  button:{
    flex:0.3,
    alignItems:"center",
    padding:20,


  },
  buttonWrapper:{
    flexDirection:'row'

  },

  clearSubject:{
    paddingRight:40,
  }

})
