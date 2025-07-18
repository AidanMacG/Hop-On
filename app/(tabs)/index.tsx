import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const buttonSpacing = 200; // space between buttons

export default function HomeScreen() {


  const [fontsLoaded] = useFonts({
    'Rifton': require('../../assets/fonts/Rifton Norm.otf'),
    'Rifton Italic': require('../../assets/fonts/Rifton Italic.otf'),
    'Rifton Backslant': require('../../assets/fonts/Rifton Backslant.otf'),
  });

  if (!fontsLoaded) return null;

  return (
    
      
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('./host')}>
          <Text style={styles.buttonText}>Create a room</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('./join')}>
          <Text style={styles.buttonText}>Join a room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container
: {
    flex: 1,
    justifyContent: 'flex-end',   // push content to bottom
    gap: 8,
    marginBottom: 8,
    backgroundColor: "#161616"
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: buttonSpacing,
  },
  button: {
    width: (screenWidth - buttonSpacing * 3) / 2,
    height: (screenHeight / 4),
    backgroundColor: '#0bdd20',
    paddingVertical: 12,
    borderRadius: 8,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 40,
    color: "#FFF",
    fontFamily: "Rifton Italic",
  },
  label: {
    color: "#FFF",
  },
  textBox: {
    color: "#FFF",
  },
});
