import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Animated } from 'react-native';

export default function App() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [selectedPassion, setSelectedPassion] = useState('');
  const [commitment, setCommitment] = useState(null);
  const [learningLevel, setLearningLevel] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];

  const passionOptions = ['Coding', 'Photography', 'Writing', 'Fitness', 'Music', 'Design', 'Cooking', 'Gaming'];
  const commitmentOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  const learningLevels = ['Beginner', 'Intermediate', 'Advanced'];

  const resourcesByPassion = {
    Coding: ['Laptop', 'Keyboard', 'IDE'],
    Photography: ['Camera', 'Tripod', 'Editing Software'],
    Writing: ['Laptop', 'Notebooks', 'Writing Software'],
    Fitness: ['Shoes', 'Gear', 'Diet'],
    Music: ['Instrument', 'Headphones', 'Sheet Music'],
    Design: ['Software', 'Drawing Tablet', 'Design Books'],
    Cooking: ['Cookbook', 'Utensils', 'Ingredients'],
    Gaming: ['Console', 'Games', 'Headset'],
  };

  const capitalizeFirstLetter = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [step]);

  const handleNextStep = (nextStep) => {
    setStep(nextStep);
    fadeAnim.setValue(0);
  };

  const handleRestart = () => {
    setName('');
    setSelectedPassion('');
    setCommitment(null);
    setLearningLevel('');
    setStep(0);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.appName}>Distract</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            {step === 0 && (
              <>
                <Text style={styles.question}>What is your name?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="#95a5a6"
                />
                <TouchableOpacity style={styles.button} onPress={() => handleNextStep(1)} disabled={!name}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </>
            )}

            {step === 1 && (
              <>
                <Text style={styles.question}>What is your passion, {capitalizeFirstLetter(name)}?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Type your passion here"
                  value={selectedPassion}
                  onChangeText={setSelectedPassion}
                  placeholderTextColor="#95a5a6"
                />
                <TouchableOpacity style={styles.button} onPress={() => handleNextStep(3)} disabled={!selectedPassion}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
                <Text style={styles.orText}>OR</Text>
                <TouchableOpacity style={styles.secondaryButton} onPress={() => handleNextStep(2)}>
                  <Text style={styles.secondaryButtonText}>I don't have one</Text>
                </TouchableOpacity>
              </>
            )}

            {step === 2 && (
              <>
                <Text style={styles.question}>Select a passion:</Text>
                {passionOptions.map((p) => (
                  <TouchableOpacity key={p} onPress={() => { setSelectedPassion(p); handleNextStep(3); }} style={styles.optionButton}>
                    <Text style={styles.optionButtonText}>{p}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}

            {step === 3 && (
              <>
                <Text style={styles.question}>How many hours per day can you commit?</Text>
                {commitmentOptions.map((hour) => (
                  <TouchableOpacity key={hour} onPress={() => { setCommitment(hour); handleNextStep(4); }} style={styles.optionButton}>
                    <Text style={styles.optionButtonText}>{hour} hrs</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}

            {step === 4 && (
              <>
                <Text style={styles.question}>Select your learning level:</Text>
                {learningLevels.map((level) => (
                  <TouchableOpacity key={level} onPress={() => { setLearningLevel(level); handleNextStep(5); }} style={styles.optionButton}>
                    <Text style={styles.optionButtonText}>{level}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}

            {step === 5 && (
              <>
                <View style={styles.summaryBox}>
                  <Text style={styles.summaryBoxText}>Summary</Text>
                  <Text style={styles.summaryParagraph}>
                    {capitalizeFirstLetter(name)}, you've committed {commitment} hours a day to {selectedPassion || passion} at the {learningLevel} level.
                  </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => handleNextStep(6)}>
                  <Text style={styles.buttonText}>See Resources</Text>
                </TouchableOpacity>
              </>
            )}

            {step === 6 && (
              <>
                <Text style={styles.question}>Resources for {selectedPassion || passion}:</Text>
                {resourcesByPassion[selectedPassion || passion].map((resource, index) => (
                  <Text key={index} style={styles.resourceText}>{resource}</Text>
                ))}
                <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
                  <Text style={styles.restartButtonText}>Restart</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2c3e50', 
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f39c12', 
    textAlign: 'center',
    marginVertical: 30,
    fontFamily: 'Roboto',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'stretch',
    paddingVertical: 30,
  },
  question: {
    fontSize: 24,
    fontWeight: '500',
    color: '#ecf0f1', 
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: 'Roboto',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#ecf0f1',
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#34495e',
    fontSize: 18,
    color: 'white',
    marginBottom: 25,
    fontFamily: 'Roboto',
  },
  button: {
    backgroundColor: '#3498db', 
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 15,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  secondaryButton: {
    backgroundColor: '#2ecc71', 
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 15,
    elevation: 5,
  },
  secondaryButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  optionButton: {
    backgroundColor: '#2980b9', 
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
    alignItems: 'center',
    elevation: 5,
  },
  optionButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  resourceText: {
    fontSize: 18,
    color: '#ecf0f1',
    marginVertical: 5,
    fontFamily: 'Roboto',
  },
  orText: {
    fontSize: 18,
    color: '#ecf0f1',
    textAlign: 'center',
    marginVertical: 15,
    fontFamily: 'Roboto',
  },
  summaryBox: {
    backgroundColor: '#34495e', 
    padding: 20,
    borderRadius: 12,
    marginVertical: 25,
  },
  summaryBoxText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f39c12', 
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Roboto',
  },
  summaryParagraph: {
    fontSize: 18,
    color: '#ecf0f1', 
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  restartButton: {
    backgroundColor: '#e74c3c', 
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 25,
    elevation: 5,
  },
  restartButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});
