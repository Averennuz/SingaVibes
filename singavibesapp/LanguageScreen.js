// LanguageScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLanguageContext } from './LanguageContext';

const LanguageScreen = ({ navigation }) => {
  const { setLanguage } = useLanguageContext();

  const handleLanguageSelection = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    navigation.navigate('Translation', { selectedLanguage });
  };

  const languageData = [
    { name: 'Arabic', code: 'ar' },
    { name: 'Bengali', code: 'bn' },
    { name: 'Dutch', code: 'nl' },
    { name: 'English', code: 'en' },
    { name: 'French', code: 'fr' },
    { name: 'German', code: 'de' },
    { name: 'Hindi', code: 'hi' },
    { name: 'Italian', code: 'it' },
    { name: 'Indonesian', code: 'id' },
    { name: 'Japanese', code: 'ja' },
    { name: 'Korean', code: 'ko' },
    { name: 'Malayam', code: 'ml' },
    { name: 'Mandarin', code: 'zh-CN' },
    { name: 'Marathi', code: 'mr' },
    { name: 'Persian', code: 'fa' },
    { name: 'Polish', code: 'pl' },
    { name: 'Portuguese', code: 'pt' },
    { name: 'Punjabi', code: 'pa' },
    { name: 'Russian', code: 'ru' },
    { name: 'Spanish', code: 'es' },
    { name: 'Swahili', code: 'sw' },
    { name: 'Tagalog', code: 'tl' },
    { name: 'Tamil', code: 'ta' },
    { name: 'Telugu', code: 'te' },
    { name: 'Thai', code: 'th' },
    { name: 'Turkish', code: 'tr' },
    { name: 'Vietnamese', code: 'vi' },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Choose Languages:</Text>
        {languageData.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={styles.languageButton}
            onPress={() => handleLanguageSelection(language.code)}>
            <Text style={styles.buttonText}>{language.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 20,
  },
  languageButton: {
    backgroundColor: '#2c3e50',
    borderRadius: 10,
    padding: 15,
    width: '80%',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ecf0f1',
    textAlign: 'center',
  },
});

export default LanguageScreen;
