//MatchingGame.js
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLanguageContext } from './LanguageContext';
import RNPickerSelect from 'react-native-picker-select';

export default function MatchingGame() {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedLanguage } = route.params;
  const { translations } = useLanguageContext();
  const [gameData, setGameData] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('');
  const [selectedSourceLanguage, setSelectedSourceLanguage] = useState('');

  const words = [
    {
      word: 'hello',
      translationsWords: [
        { language: 'ar', translation: 'مرحبا' },
        { language: 'bn', translation: 'হ্যালো' },
        { language: 'nl', translation: 'hallo' },
        { language: 'en', translation: 'hello' },
        { language: 'fr', translation: 'bonjour' },
        { language: 'de', translation: 'hallo' },
        { language: 'hi', translation: 'नमस्ते' },
        { language: 'it', translation: 'ciao' },
        { language: 'id', translation: 'halo' },
        { language: 'ja', translation: 'こんにちは' },
        { language: 'ko', translation: '안녕하세요' },
        { language: 'ml', translation: 'ഹലോ' },
        { language: 'zh-CN', translation: '你好' },
        { language: 'mr', translation: 'नमस्कार' },
        { language: 'fa', translation: 'سلام' },
        { language: 'pl', translation: 'cześć' },
        { language: 'pt', translation: 'olá' },
        { language: 'pa', translation: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ' },
        { language: 'ru', translation: 'привет' },
        { language: 'es', translation: 'hola' },
        { language: 'sw', translation: 'jambo' },
        { language: 'tl', translation: 'kamusta' },
        { language: 'ta', translation: 'வணக்கம்' },
        { language: 'te', translation: 'హలో' },
        { language: 'th', translation: 'สวัสดี' },
        { language: 'tr', translation: 'merhaba' },
        { language: 'vi', translation: 'xin chào' },
      ],
    },
    {
      word: 'thank you',
      translationsWords: [
        { language: 'ar', translation: 'شكرا لك' },
        { language: 'bn', translation: 'ধন্যবাদ' },
        { language: 'nl', translation: 'dank je' },
        { language: 'en', translation: 'thank you' },
        { language: 'fr', translation: 'merci' },
        { language: 'de', translation: 'danke' },
        { language: 'hi', translation: 'धन्यवाद' },
        { language: 'it', translation: 'grazie' },
        { language: 'id', translation: 'terima kasih' },
        { language: 'ja', translation: 'ありがとう' },
        { language: 'ko', translation: '감사합니다' },
        { language: 'ml', translation: 'നന്ദി' },
        { language: 'zh-CN', translation: '谢谢' },
        { language: 'mr', translation: 'धन्यवाद' },
        { language: 'fa', translation: 'ممنون' },
        { language: 'pl', translation: 'dziękuję' },
        { language: 'pt', translation: 'obrigado' },
        { language: 'pa', translation: 'ਧੰਨਵਾਦ' },
        { language: 'ru', translation: 'спасибо' },
        { language: 'es', translation: 'gracias' },
        { language: 'sw', translation: 'asante' },
        { language: 'tl', translation: 'salamat' },
        { language: 'ta', translation: 'நன்றி' },
        { language: 'te', translation: 'ధన్యవాదాలు' },
        { language: 'th', translation: 'ขอบคุณ' },
        { language: 'tr', translation: 'teşekkür ederim' },
        { language: 'vi', translation: 'cảm ơn' },
      ],
    },
    {
      word: 'welcome',
      translationsWords: [
        { language: 'ar', translation: 'مرحبا بك' },
        { language: 'bn', translation: 'স্বাগত' },
        { language: 'nl', translation: 'welkom' },
        { language: 'en', translation: 'welcome' },
        { language: 'fr', translation: 'bienvenue' },
        { language: 'de', translation: 'willkommen' },
        { language: 'hi', translation: 'स्वागत' },
        { language: 'it', translation: 'benvenuto' },
        { language: 'id', translation: 'selamat datang' },
        { language: 'ja', translation: 'ようこそ' },
        { language: 'ko', translation: '환영합니다' },
        { language: 'ml', translation: 'സ്വാഗതം' },
        { language: 'zh-CN', translation: '欢迎' },
        { language: 'mr', translation: 'स्वागत' },
        { language: 'fa', translation: 'خوش آمدید' },
        { language: 'pl', translation: 'witamy' },
        { language: 'pt', translation: 'bem-vindo' },
        { language: 'pa', translation: 'ਜੀ ਆਇਆ ਨੂੰ' },
        { language: 'ru', translation: 'добро пожаловать' },
        { language: 'es', translation: 'bienvenido' },
        { language: 'sw', translation: 'karibu' },
        { language: 'tl', translation: 'maligayang pagdating' },
        { language: 'ta', translation: 'வரவேற்கிறோம்' },
        { language: 'te', translation: 'స్వాగతం' },
        { language: 'th', translation: 'ยินดีต้อนรับ' },
        { language: 'tr', translation: 'hoş geldiniz' },
        { language: 'vi', translation: 'chào mừng' },
      ],
    },
    {
      word: 'please',
      translationsWords: [
        { language: 'ar', translation: 'رجاء' },
        { language: 'bn', translation: 'অনুগ্রহ করে' },
        { language: 'nl', translation: 'alsjeblieft' },
        { language: 'en', translation: 'please' },
        { language: 'fr', translation: "s'il vous plaît" },
        { language: 'de', translation: 'bitte' },
        { language: 'hi', translation: 'कृपया' },
        { language: 'it', translation: 'per favore' },
        { language: 'id', translation: 'tolong' },
        { language: 'ja', translation: 'お願いします' },
        { language: 'ko', translation: '제발' },
        { language: 'ml', translation: 'ദയവായി' },
        { language: 'zh-CN', translation: '请' },
        { language: 'mr', translation: 'कृपया' },
        { language: 'fa', translation: 'لطفا' },
        { language: 'pl', translation: 'proszę' },
        { language: 'pt', translation: 'por favor' },
        { language: 'pa', translation: 'ਕਿਰਪਾ ਕਰਕੇ' },
        { language: 'ru', translation: 'пожалуйста' },
        { language: 'es', translation: 'por favor' },
        { language: 'sw', translation: 'tafadhali' },
        { language: 'tl', translation: 'pakiusap' },
        { language: 'ta', translation: 'தயவுசெய்து' },
        { language: 'te', translation: 'దయచేసి' },
        { language: 'th', translation: 'โปรด' },
        { language: 'tr', translation: 'lütfen' },
        { language: 'vi', translation: 'làm ơn' },
      ],
    },
    {
      word: 'home',
      translationsWords: [
        { language: 'ar', translation: 'منزل' },
        { language: 'bn', translation: 'বাড়ি' },
        { language: 'nl', translation: 'huis' },
        { language: 'en', translation: 'home' },
        { language: 'fr', translation: 'maison' },
        { language: 'de', translation: 'Zuhause' },
        { language: 'hi', translation: 'घर' },
        { language: 'it', translation: 'casa' },
        { language: 'id', translation: 'rumah' },
        { language: 'ja', translation: '家' },
        { language: 'ko', translation: '집' },
        { language: 'ml', translation: 'വീട്' },
        { language: 'zh-CN', translation: '家' },
        { language: 'mr', translation: 'घर' },
        { language: 'fa', translation: 'خانه' },
        { language: 'pl', translation: 'dom' },
        { language: 'pt', translation: 'casa' },
        { language: 'pa', translation: 'ਘਰ' },
        { language: 'ru', translation: 'дом' },
        { language: 'es', translation: 'hogar' },
        { language: 'sw', translation: 'nyumbani' },
        { language: 'tl', translation: 'bahay' },
        { language: 'ta', translation: 'வீடு' },
        { language: 'te', translation: 'ఇల్లు' },
        { language: 'th', translation: 'บ้าน' },
        { language: 'tr', translation: 'ev' },
        { language: 'vi', translation: 'nhà' },
      ],
    },
    {
      word: 'school',
      translationsWords: [
        { language: 'ar', translation: 'مدرسة' },
        { language: 'bn', translation: 'স্কুল' },
        { language: 'nl', translation: 'school' },
        { language: 'en', translation: 'school' },
        { language: 'fr', translation: 'école' },
        { language: 'de', translation: 'Schule' },
        { language: 'hi', translation: 'स्कूल' },
        { language: 'it', translation: 'scuola' },
        { language: 'id', translation: 'sekolah' },
        { language: 'ja', translation: '学校' },
        { language: 'ko', translation: '학교' },
        { language: 'ml', translation: 'പള്ളി' },
        { language: 'zh-CN', translation: '学校' },
        { language: 'mr', translation: 'शाळा' },
        { language: 'fa', translation: 'مدرسه' },
        { language: 'pl', translation: 'szkoła' },
        { language: 'pt', translation: 'escola' },
        { language: 'pa', translation: 'ਸਕੂਲ' },
        { language: 'ru', translation: 'школа' },
        { language: 'es', translation: 'escuela' },
        { language: 'sw', translation: 'shule' },
        { language: 'tl', translation: 'paaralan' },
        { language: 'ta', translation: 'பள்ளி' },
        { language: 'te', translation: 'పాఠశాల' },
        { language: 'th', translation: 'โรงเรียน' },
        { language: 'tr', translation: 'okul' },
        { language: 'vi', translation: 'trường học' },
      ],
    },
  ];

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

  useEffect(() => {
    // Set the source language based on the language chosen on the LanguageScreen
    setSelectedSourceLanguage(selectedLanguage);
  }, [selectedLanguage]);

  const generateGameData = () => {
    // Shuffle the words array
    const shuffledWords = words.sort(() => Math.random() - 0.5);

    // Create an array of card objects with shuffled words and translations
    const initialGameData = shuffledWords.slice(0, 6).flatMap((word) => {
      const language = word.word;
      const translations = word.translationsWords.map(
        (translation) => translation.translation
      );

      // Find the translation for the target language or use the first translation as a fallback
      const targetTranslation =
        word.translationsWords.find(
          (translation) => translation.language === targetLanguage
        )?.translation || translations[0];

      //delete if want
      console.log('Word:', language);
      console.log('Translations:', translations);
      console.log('Target Translation:', targetTranslation);

      return [
        {
          language,
          translations,
          matched: false,
        },
        // Create a card for each word and its translation
        {
          language: targetTranslation,
          translations: [language],
          matched: false,
        },
      ];
    });

    console.log('Initial Game Data:', initialGameData);//delete if want

    // Shuffle the initial game data array
    const shuffledGameData = initialGameData.sort(() => Math.random() - 0.5);

    console.log('Shuffled Game Data:', shuffledGameData);//delete if want

    // Set the game data state
    setGameData(shuffledGameData);

    console.log('generateGameData completed!');//delete if want
  };

  useEffect(() => {
    generateGameData();
  }, [targetLanguage]);

  const handleRefresh = () => {
    setMatchedPairs([]);
    setSelectedPair([]);
    setGameOver(false);
    generateGameData();
  };

  const handleCardPress = (index) => {
    if (selectedPair.length < 2 && !selectedPair.includes(index)) {
      setSelectedPair([...selectedPair, index]);
    }

    if (selectedPair.length === 1 && !selectedPair.includes(index)) {
      const [firstIndex] = selectedPair;

      // Use the language code of the first card
      const languageOfFirstCard = gameData[firstIndex].language;
      const wordOfFirstCard = languageOfFirstCard;

      const displayedWord = gameData[index].translations[0];
      const comparisonValue = displayedWord;

      const languageOfFirstCard2 = gameData[firstIndex].translations[0];
      const wordOfFirstCard2 = languageOfFirstCard2;

      const displayedWord2 = gameData[index].language;
      const comparisonValue2 = displayedWord2;

      //delete if want
      console.log('Selected Pair:', selectedPair);
      console.log('Language of First Card:', languageOfFirstCard);
      console.log('Word of First Card:', wordOfFirstCard);
      console.log('Displayed Word:', displayedWord);
      console.log('Comparison Value:', comparisonValue);
      console.log('Displayed Word2:', displayedWord2);
      console.log('Comparison Value2:', comparisonValue2);

      const isMatch =
        comparisonValue === wordOfFirstCard ||
        comparisonValue2 === wordOfFirstCard2;

      console.log('Is Match:', isMatch);

      if (isMatch) {
        console.log('Matched Pairs:', [...matchedPairs, languageOfFirstCard]);
        setMatchedPairs([...matchedPairs, languageOfFirstCard]);
        if (matchedPairs.length === words.length - 1) {
          console.log('Game Over!');
          setGameOver(true);
          Alert.alert(
            translations[selectedLanguage].congratulationTitle,
            translations[selectedLanguage].congratulationTitle2,
            [{ text: translations[selectedLanguage].okTitle }]
          );
        }

        // Change the color of both matched cards
        setGameData((prevGameData) => {
          const updatedGameData = [...prevGameData];
          updatedGameData[firstIndex] = {
            ...updatedGameData[firstIndex],
            matched: true,
          };
          updatedGameData[index] = {
            ...updatedGameData[index],
            matched: true,
          };
          return updatedGameData;
        });
      }

      setTimeout(() => {
        console.log('Clearing Selected Pair...');
        setSelectedPair([]);
      }, 500);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {translations[selectedLanguage].matchingGameTitle}
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

          {targetLanguage && ( // Only render the game if targetLanguage is selected
            <View style={styles.cardsContainer}>
              {gameData.slice(0, 12).map((card, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.card,
                    selectedPair.includes(index) ? styles.selectedCard : null,
                    card.matched ? styles.matchedCard : null,
                  ]}
                  onPress={() =>
                    !card.matched && !gameOver && handleCardPress(index)
                  }
                  disabled={card.matched || gameOver}>
                  <Text style={styles.cardText}>
                    {translations[selectedLanguage][card.language] ||
                      card.language}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      {/* Refresh Icon */}
      <TouchableOpacity style={styles.refreshIcon} onPress={handleRefresh}>
        {/* Add your refresh icon component here (you can use an image or an icon library) */}
        <Text>🔄</Text>
      </TouchableOpacity>

      {/* Exit Button */}
      <TouchableOpacity
        style={styles.exitButton}
        onPress={() =>
          navigation.navigate('Translation', { selectedLanguage })
        }>
        <Text style={styles.exitButtonText}>
          {translations[selectedLanguage].exitTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  card: {
    width: 80,
    height: 80,
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCard: {
    backgroundColor: '#4CAF50',
  },
  matchedCard: {
    backgroundColor: '#A9A9A9',
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    height: 50,
    width: '80%',
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingLeft: 10,
  },
  refreshIcon: {
    position: 'absolute',
    bottom: 60,
    left: '50%',
    borderRadius: 10,
    padding: 10,
    color: '#2c3e50',
  },
  exitButton: {
    position: 'absolute',
    bottom: 60,
    right: '50%',
    borderRadius: 10,
    padding: 10,
  },
  exitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
});
