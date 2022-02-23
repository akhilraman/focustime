import React, { useState ,useEffect} from 'react';
import { Text, View, StyleSheet ,Button,Platform } from 'react-native';

import {TextInput} from 'react-native-paper';

import {Focus} from './src/features/Focus/Focus';

import {Timer} from './src/features/timer/Timer';


import {CountDown} from './src/components/CountDown';

import {FocusHistory} from './src/features/Focus/FocusHistory';

import AsyncStorage from '@react-native-async-storage/async-storage';


import {spacing} from './src/util/size';


export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);

  const[focusHistory,setFocusHistory]=useState([]);

  const addFocusHistory=(subject,status)=>{
      setFocusHistory([...focusHistory,{subject,status}])

  }


  const saveFocusHistory= async()=>{
    try{
        await AsyncStorage.setItem('FocusHistory',JSON.stringify(focusHistory));

    }catch(e){
      console.log(e)
    }
  }

  const loadFocusHistory=async()=>{
    try{
        const history=await AsyncStorage.getItem('FocusHistory');

        if(history && JSON.parse(history).length){
          setFocusHistory(JSON.parse(history));
        }

    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{

    saveFocusHistory();

  },[focusHistory])

  const onClear=()=>{
    setFocusHistory([]);
  }

  console.log(focusHistory)

  const STATUS={
    COMPLETED:0,
    CANCELED:1,
  }

  return (
    <View style={styles.container}>
    {focusSubject ? (
      <View >
      <Timer  focusSubject={focusSubject} 
      onTimerEnd={()=>{
        addFocusHistory(focusSubject,STATUS.COMPLETED)
        setFocusSubject(null)
        } 
      }
      clearSubject={()=>{
          setFocusSubject(null)
          addFocusHistory(focusSubject,STATUS.CANCELED)
        }
      }/>
      </View>
    ) : (
      <>
      <Focus addSubject={setFocusSubject}/>
      <FocusHistory focusHistory={focusHistory} onClear={()=> {onClear()}} />
      </>
    
    )}

    <>
    
    </>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#004d4d',
    //backgroundColor: '#ecf0f1',
    paddingTop: spacing.lg
  },
});
