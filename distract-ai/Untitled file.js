import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';

export default function App() {
  const [step, setStep] = useState(1);
  const [passion, setPassion] = useState('');
  const [noPassion, setNoPassion] = useState(false);
  const [selectedPassion, setSelectedPassion] = useState('');
  const [commitment, setCommitment] = useState(null);
  const [learningLevel, setLearningLevel] = useState('');
  const [goalDuration, setGoalDuration] = useState(null); // New state for goal duration
  const [startDate, setStartDate] = useState(null); // New state for start date
  const [endDate, setEndDate] = useState(null); // new state for end date
  const [activityLog, setActivityLog] = useState([]); // New state for activity log
  const [remainingDays, setRemainingDays] = useState(0); // new state for remaining days.

  const passionOptions = ['Coding', 'Photography', 'Writing', 'Fitness', 'Music'];
  const commitmentOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  const learningLevels = ['Basic', 'Intermediate', 'Advanced'];
  const goalDurationOptions = [1, 3, 6, 12]; // Goal duration options in months

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if(startDate && goalDuration){
      calculateEndDate();
    }
  }, [startDate, goalDuration])

  useEffect(() => {
    if(endDate){
      calculateRemainingDays();
    }
  }, [endDate])

  const calculateEndDate = () => {
    const start = new Date(startDate);
    start.setMonth(start.getMonth() + goalDuration);
    setEndDate(start);
  }

  const calculateRemainingDays = () => {
    const today = new Date();
    const difference = endDate - today;
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
    setRemainingDays(days);
  }

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify({
        passion: selectedPassion || passion,
        commitment,
        learningLevel,
        goalDuration,
        startDate,
        activityLog,
      }));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setSelectedPassion(parsedData.passion);
        setCommitment(parsedData.commitment);
        setLearningLevel(parsedData.learningLevel);
        setGoalDuration(parsedData.goalDuration);
        setStartDate(parsedData.startDate);
        setActivityLog(parsedData.activityLog);
        setStep(5);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const recordActivity = (committed) => {
    const newLog = [...activityLog, committed];
    setActivityLog(newLog);
    saveData();
    calculateRemainingDays();
    alert(committed ? "Great job!" : `You missed a day! ${remainingDays} days remaining.`);
  };

  // ... (rest of the code, including UI elements and styles)
}