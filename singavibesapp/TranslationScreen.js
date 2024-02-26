//TranslationScreen.js
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  RefreshControl,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLanguageContext } from './LanguageContext';
import RNPickerSelect from 'react-native-picker-select';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';

export default function TranslationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);

  const { selectedLanguage } = route.params;
  const { translations } = useLanguageContext();

  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedWord, setTranslatedWord] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [selectedSourceLanguage, setSelectedSourceLanguage] = useState('');

  useEffect(() => {
    // Set the source language based on the language chosen on the LanguageScreen
    setSelectedSourceLanguage(selectedLanguage);
  }, [selectedLanguage]);

  const languageCodes = {
    Arabic: 'ar',
    Bengali: 'bn',
    Dutch: 'nl',
    English: 'en',
    French: 'fr',
    German: 'de',
    Hindi: 'hi',
    Italian: 'it',
    Indonesian: 'id',
    Japanese: 'ja',
    Korean: 'ko',
    Malayam: 'ml',
    Mandarin: 'zh-CN',
    Marathi: 'mr',
    Persian: 'fa',
    Polish: 'pl',
    Portugese: 'pt',
    Punjabi: 'pa',
    Russian: 'ru',
    Spanish: 'es',
    Swahili: 'sw',
    Tagalog: 'tl',
    Tamil: 'ta',
    Telugu: 'te',
    Thai: 'th',
    Turkish: 'tr',
    Vietnamese: 'vi',
  };

  const getDropdownItems = () => {
    const items = Object.keys(languageCodes)
      .filter((language) => language !== selectedSourceLanguage) // Exclude the selected source language
      .map((language) => ({
        label: language,
        value: languageCodes[language],
      }));
    return items;
  };

  const handleTranslate = async () => {
    try {
      console.log('Before API call');
      console.log('textToTranslate:', textToTranslate);
      console.log('selectedSourceLanguage:', selectedSourceLanguage);
      console.log('targetLanguage:', targetLanguage);

      const translationResult = await callTranslationAPI(
        textToTranslate,
        selectedSourceLanguage,
        targetLanguage
      );

      console.log('After API call');
      console.log('Translation Result:', translationResult);

      // Update the state with the translated result
      setTranslatedWord(translationResult);

    } catch (error) {
      console.error('Error translating text:', error);
      // Handle errors or show a user-friendly message
    }
  };

  const callTranslationAPI = async (
    input,
    selectedSourceLanguage,
    targetLanguage
  ) => {
    try {
      const response = await fetch(
        `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${selectedSourceLanguage}&to=${targetLanguage}&region=southeastasia`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': 'ed9c0b64e1934fa485cef51200d503ed',
            'Ocp-Apim-Subscription-Region': 'southeastasia',
          },
          body: JSON.stringify([{ text: input }]),
        }
      );

      console.log('Translation API Response:', response);

      if (!response.ok) {
        throw new Error('Failed to fetch translation');
      }

      const result = await response.json();

      console.log('Translation API Result:', result);

      
      const translatedText = result[0].translations[0].text;

      return translatedText;
    } catch (error) {
      console.error('Error calling translation API:', error);
      throw error;
    }
  };

  function impactAsync(style) {
    // Check if Haptics module is available
    if (Haptics && Haptics.impactAsync) {
      switch (style) {
        case 'light':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'medium':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        default:
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
      }
    } else {
      // Handle the case where Haptics module or impactAsync method is not available
      console.warn('Haptic feedback is not available on this platform.');
      
    }
  }

  // To refresh the search
  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      setTextToTranslate('');
      setTranslatedWord('');
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setRefreshing(false); // Set refreshing state back to false when done
  };

  const handleTextToSpeech = () => {
    // Ensure there is text to speak
    if (translatedWord.trim() !== '') {
      console.log('Text to be spoken:', translatedWord);

      Speech.speak(translatedWord, {
        language: targetLanguage, // Optional: Set the language for speech
        pitch: 1.0, // Optional: Set the pitch for speech
        rate: 0.8, // Optional: Set the rate for speech
      });

      console.log('Text-to-speech initiated successfully');
    } else {
      console.log('No text available for text-to-speech');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <View style={styles.container}>
          <Text style={styles.title}>
            {translations[selectedLanguage].translateLanguageTitle}
          </Text>

          <RNPickerSelect
            style={styles.dropdown}
            placeholder={{
              label: translations[selectedLanguage].selectTargetLang,
              value: null,
            }}
            onValueChange={(value) => setTargetLanguage(value)}
            items={getDropdownItems()} // Use the modified getDropdownItems function here
          />

          {/* First TextInput for text to be translated */}
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translations[selectedLanguage].enterTextPlaceholder}
              value={textToTranslate}
              onChangeText={(text) => setTextToTranslate(text)}
            />
          </View>

          {/* Second TextInput for the translated word */}
          <View style={styles.textInputContainer2}>
            <TextInput
              style={styles.input2}
              placeholder={translations[selectedLanguage].translatedText}
              value={translatedWord}
              onChangeText={(text) => setTranslatedWord(text)}
            />
            {/* Microphone button for text-to-speech */}
            <TouchableOpacity onPress={handleTextToSpeech}>
              <Image
                source={require('./assets/speaker.png')}
                style={styles.speakerIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Button to trigger translation */}
          <TouchableOpacity
            style={styles.translateButton}
            onPress={() => {
              handleTranslate();
            }}>
            <Text style={styles.buttonText}>
              {translations[selectedLanguage].translateButton}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Game', { selectedLanguage }),
              impactAsync('heavy');
          }}
          style={styles.button}>
          <Image
            source={require('./assets/Game.png')}
            style={styles.gameIcon}
          />
          <Text style={styles.buttonTextNav}>
            {translations[selectedLanguage].matchingGameTitle}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('WordBook', { selectedLanguage }),
              impactAsync('heavy');
          }}
          style={styles.button}>
          <Image
            source={require('./assets/WordBook.png')}
            style={styles.wordBookIcon}
          />
          <Text style={styles.buttonTextNav}>
            {translations[selectedLanguage].wordBookTitle}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  container: {
    flex: 1,
    width: '80%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    width: '80%',
    marginBottom: 30,
    color: '#2c3e50',
  },
  input: {
    width: '100%',
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    backgroundColor: '#ecf0f1',
  },
  input2: {
    width: '100%',
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 30,
    paddingTop: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    backgroundColor: '#ecf0f1',
  },
  translateButton: {
    backgroundColor: '#2c3e50',
    borderRadius: 10,
    padding: 5,
    width: '50%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ecf0f1',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#2c3e50',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  buttonTextNav: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 5,
  },
  gameIcon: {
    width: 30,
    height: 30,
  },
  wordBookIcon: {
    width: 30,
    height: 30,
  },
  speakerIcon: {
    width: 30,
    height: 30,
  },
  textInputContainer: {
    width: '100%',
  },
  textInputContainer2: {
    width: '100%',
    marginBottom: 10,
  },
});
