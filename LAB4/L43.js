import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import TrackPlayer, { Capability, State } from 'react-native-track-player'
import Slider from '@react-native-community/slider';

const L43 = () => {
  const [playlist, setPlaylist] = useState([
    { id: 1, title: 'Rồi em sẽ gặp một chàng trai khác', url: require('./audio/audio1.mp3') },
    { id: 2, title: 'Duyên do trời phận do ta', url: require('./audio/audio2.mp3') },
    { id: 3, title: 'Hoàng hôn nhớ', url: require('./audio/audio3.mp3') },
    { id: 4, title: 'Khóa ly biệt', url: require('./audio/audio4.mp3') },
    { id: 5, title: 'Ngày mai người ta lấy chồng', url: require('./audio/audio5.mp3') },
  ]);
  
  const [isPlayerInitialized, setIsPlayerInitialized] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(playlist);
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.SeekTo,
          Capability.SkipToNext,
          Capability.SkipToPrevious
        ]
      });
      setIsPlayerInitialized(true);
    };

    setupPlayer();

    return () => TrackPlayer.destroy();
  }, []);

  useEffect(() => {
    const updatePosition = async () => {
      if (isPlayerInitialized) {
        const newPosition = await TrackPlayer.getPosition();
        const newDuration = await TrackPlayer.getDuration();
        setPosition(newPosition);
        setDuration(newDuration);
      }
    };

    updatePosition();

    const interval = setInterval(updatePosition, 1000);

    return () => clearInterval(interval);
  }, [isPlayerInitialized]);

  const onTogglePlayTrack = async () => {
    if (isPlayerInitialized) {
      const state = await TrackPlayer.getState();

      if (state === State.Playing) {
        await TrackPlayer.pause();
        console.log('Paused playback');
      } else {
        await TrackPlayer.play();
        console.log('Play playback');
      }
    }
  };

  const onSkipToNext = () => {
    if (isPlayerInitialized) {
      TrackPlayer.skipToNext();
    }
  };

  const onSkipToPrevious = () => {
    if (isPlayerInitialized) {
      TrackPlayer.skipToPrevious();
    }
  };

  const onSliderValueChange = async (value) => {
    if (isPlayerInitialized && !isSeeking) {
      setIsSeeking(true);
      await TrackPlayer.seekTo(value);
      setIsSeeking(false);
    }
  };

  return (
    <View style={styles.container}>
       <FlatList
       style={styles.list}
        data={playlist}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => TrackPlayer.skip(item.id)}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
       <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="lightblue"
        maximumTrackTintColor="grey"
        thumbTintColor="lightblue"
        onSlidingStart={() => setIsSeeking(true)}
        onSlidingComplete={() => setIsSeeking(false)}
        onValueChange={onSliderValueChange}
      />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={onSkipToPrevious}>
          <Text>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={onTogglePlayTrack}>
          <Text>Play/Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={onSkipToNext}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default L43

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  list:{
    marginTop:30,

  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20
  },
  controlButton: {
    padding: 10,
    backgroundColor: 'lightblue'
  },
  slider: {
    width: '80%',
    marginTop: 20
  }
})
