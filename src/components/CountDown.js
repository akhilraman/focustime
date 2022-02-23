import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, View } from 'react-native';

import { fontsizes } from '../util/size';

const minutesTomillis = (minutes) => {
  return minutes * 1000 * 60;
};

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({ onEnd,minutes, isPaused, onProgress }) => {
  const interval = React.useRef(null);

  const [millis, setMillis] = useState(null);

  useEffect(() => {
    setMillis(minutesTomillis(minutes));
  }, [minutes]);

  const countDown = () => {
    setMillis((time) => {
      if (time == 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }

      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesTomillis(minutes));
      return timeLeft;
    });
  };

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  
  
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(second)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#008080',
  },
  text: {
    textAlign: 'center',
    fontSize: fontsizes.xl,
    padding: 10,
  },
});
