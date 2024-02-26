//WordBookScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
  FlatList,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useLanguageContext } from './LanguageContext';
import RNPickerSelect from 'react-native-picker-select';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';

export default function WordBookScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedLanguage } = route.params;
  const { translations } = useLanguageContext();
  const [refreshing, setRefreshing] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('');
  const [selectedSourceLanguage, setSelectedSourceLanguage] = useState('');
  const [selectedTargetLanguage, setSelectedTargetLanguage] = useState('');

  const commonPhrases = [
    {
      id: '1',
      source: 'thank you',
      target: [
        { language: 'ar', translation: 'شكراً' },
        { language: 'bn', translation: 'ধন্যবাদ' },
        { language: 'es', translation: 'gracias' },
        { language: 'fr', translation: 'merci' },
        { language: 'de', translation: 'danke' },
        { language: 'hi', translation: 'धन्यवाद' },
        { language: 'it', translation: 'grazie' },
        { language: 'ja', translation: 'ありがとう' },
        { language: 'ko', translation: '감사합니다' },
        { language: 'pt', translation: 'obrigado/a' },
        { language: 'ru', translation: 'спасибо' },
        { language: 'zh', translation: '谢谢' },
        { language: 'mr', translation: 'धन्यवाद' }, // Marathi
        { language: 'fa', translation: 'سپاسگزارم' }, // Persian
        { language: 'pl', translation: 'dziękuję' }, // Polish
        { language: 'pt', translation: 'obrigado/a' }, // Portugese
        { language: 'pa', translation: 'ਧੰਨਵਾਦ' }, // Punjabi
        { language: 'ru', translation: 'спасибо' }, // Russian
        { language: 'es', translation: 'gracias' }, // Spanish
        { language: 'sw', translation: 'asante' }, // Swahili
        { language: 'tl', translation: 'salamat' }, // Tagalog
        { language: 'ta', translation: 'நன்றி' }, // Tamil
        { language: 'te', translation: 'ధన్యవాదాలు' }, // Telugu
        { language: 'th', translation: 'ขอบคุณ' }, // Thai
        { language: 'tr', translation: 'teşekkür ederim' }, // Turkish
        { language: 'vi', translation: 'cảm ơn' }, // Vietnamese
        { language: 'id', translation: 'terima kasih' }, // Indonesian
      ],
    },
    {
      id: '2',
      source: 'good morning',
      target: [
        { language: 'ar', translation: 'صباح الخير' },
        { language: 'bn', translation: 'সুপ্রভাত' },
        { language: 'es', translation: 'buenos días' },
        { language: 'fr', translation: 'bonjour' },
        { language: 'de', translation: 'guten Morgen' },
        { language: 'hi', translation: 'सुप्रभात' },
        { language: 'it', translation: 'buongiorno' },
        { language: 'ja', translation: 'おはようございます' },
        { language: 'ko', translation: '안녕하세요' },
        { language: 'pt', translation: 'bom dia' },
        { language: 'ru', translation: 'доброе утро' },
        { language: 'zh', translation: '早上好' },
        { language: 'mr', translation: 'सुप्रभात' }, // Marathi
        { language: 'fa', translation: 'صبح بخیر' }, // Persian
        { language: 'pl', translation: 'dzień dobry' }, // Polish
        { language: 'pt', translation: 'bom dia' }, // Portugese
        { language: 'pa', translation: 'ਸ਼ੁਭ ਸਵੇਰ' }, // Punjabi
        { language: 'ru', translation: 'доброе утро' }, // Russian
        { language: 'es', translation: 'buenos días' }, // Spanish
        { language: 'sw', translation: 'habari ya asubuhi' }, // Swahili
        { language: 'tl', translation: 'magandang umaga' }, // Tagalog
        { language: 'ta', translation: 'காலை வணக்கம்' }, // Tamil
        { language: 'te', translation: 'శుభోదయం' }, // Telugu
        { language: 'th', translation: 'สวัสดีตอนเช้า' }, // Thai
        { language: 'tr', translation: 'günaydın' }, // Turkish
        { language: 'vi', translation: 'chào buổi sáng' }, // Vietnamese
        { language: 'id', translation: 'selamat pagi' }, // Indonesian
      ],
    },
    {
      id: '3',
      source: 'goodbye',
      target: [
        { language: 'ar', translation: 'وداعا' },
        { language: 'bn', translation: 'বিদায়' },
        { language: 'es', translation: 'adiós' },
        { language: 'fr', translation: 'au revoir' },
        { language: 'de', translation: 'auf Wiedersehen' },
        { language: 'hi', translation: 'अलविदा' },
        { language: 'it', translation: 'arrivederci' },
        { language: 'ja', translation: 'さようなら' },
        { language: 'ko', translation: '안녕히 가세요' },
        { language: 'pt', translation: 'adeus' },
        { language: 'ru', translation: 'до свидания' },
        { language: 'zh', translation: '再见' },
        { language: 'mr', translation: 'पुन्हा मिळवा' }, // Marathi
        { language: 'fa', translation: 'خداحافظ' }, // Persian
        { language: 'pl', translation: 'do widzenia' }, // Polish
        { language: 'pt', translation: 'adeus' }, // Portugese
        { language: 'pa', translation: 'ਅਲਵਿਦਾ' }, // Punjabi
        { language: 'ru', translation: 'до свидания' }, // Russian
        { language: 'es', translation: 'adiós' }, // Spanish
        { language: 'sw', translation: 'kwaheri' }, // Swahili
        { language: 'tl', translation: 'paalam' }, // Tagalog
        { language: 'ta', translation: 'குடியுரிமை வாழ்த்துக்கள்' }, // Tamil
        { language: 'te', translation: 'విదాయ' }, // Telugu
        { language: 'th', translation: 'ลาก่อน' }, // Thai
        { language: 'tr', translation: 'hoşça kal' }, // Turkish
        { language: 'vi', translation: 'tạm biệt' }, // Vietnamese
        { language: 'id', translation: 'selamat tinggal' }, // Indonesian
      ],
    },
    // ... other common phrases
  ];

  const emergencyPhrases = [
    {
      id: '1',
      source: 'call for help',
      target: [
        { language: 'ar', translation: 'استدعاء المساعدة' },
        { language: 'bn', translation: 'সাহায্যের জন্য ডাক' },
        { language: 'es', translation: 'llamar a ayuda' },
        { language: 'fr', translation: 'appeler à l aide' },
        { language: 'de', translation: 'um Hilfe rufen' },
        { language: 'hi', translation: 'मदद के लिए कहें' },
        { language: 'it', translation: 'chiamare aiuto' },
        { language: 'ja', translation: '助けを呼ぶ' },
        { language: 'ko', translation: '도움을 요청하다' },
        { language: 'pt', translation: 'pedir ajuda' },
        { language: 'ru', translation: 'позвать на помощь' },
        { language: 'zh', translation: '寻求帮助' },
        { language: 'mr', translation: 'मदत करा' },
        { language: 'fa', translation: 'خواهش کمک' },
        { language: 'pl', translation: 'wezwać o pomoc' },
        { language: 'pt', translation: 'pedir ajuda' },
        { language: 'pa', translation: 'ਮਦਦ ਬੁਲਾਓ' },
        { language: 'ru', translation: 'позвать на помощь' },
        { language: 'es', translation: 'llamar a ayuda' },
        { language: 'sw', translation: 'itaarifu msaada' },
        { language: 'tl', translation: 'tumawag para sa tulong' },
        { language: 'ta', translation: 'உதவி கேட்கிறேன்' },
        { language: 'te', translation: 'సహాయానికి అడ్డుకో' },
        { language: 'th', translation: 'เรียกขอความช่วยเหลือ' },
        { language: 'tr', translation: 'yardım çağrısı yap' },
        { language: 'vi', translation: 'gọi cứu thương' },
        { language: 'id', translation: 'memanggil bantuan' }, // Indonesian
      ],
    },
    {
      id: '2',
      source: 'I need assistance',
      target: [
        { language: 'ar', translation: 'أحتاج مساعدة' },
        { language: 'bn', translation: 'আমি সাহায্য চাই' },
        { language: 'es', translation: 'necesito ayuda' },
        { language: 'fr', translation: 'j ai besoin d aide' },
        { language: 'de', translation: 'ich brauche Hilfe' },
        { language: 'hi', translation: 'मुझे सहायता चाहिए' },
        { language: 'it', translation: 'ho bisogno di assistenza' },
        { language: 'ja', translation: '助けが必要です' },
        { language: 'ko', translation: '도움이 필요해요' },
        { language: 'pt', translation: 'preciso de assistência' },
        { language: 'ru', translation: 'мне нужна помощь' },
        { language: 'zh', translation: '我需要帮助' },
        { language: 'mr', translation: 'मला मदतीची आवड आहे' },
        { language: 'fa', translation: 'نیاز به کمک دارم' },
        { language: 'pl', translation: 'potrzebuję pomocy' },
        { language: 'pt', translation: 'preciso de assistência' },
        { language: 'pa', translation: 'ਮੈਨੂੰ ਸਹਾਇਤਾ ਚਾਹੀਦੀ ਹੈ' },
        { language: 'ru', translation: 'мне нужна помощь' },
        { language: 'es', translation: 'necesito ayuda' },
        { language: 'sw', translation: 'nahitaji msaada' },
        { language: 'tl', translation: 'kailangan ko ng tulong' },
        { language: 'ta', translation: 'எனக்கு உதவி தேவை' },
        { language: 'te', translation: 'నాకు సహాయం కావాలి' },
        { language: 'th', translation: 'ฉันต้องการความช่วยเหลือ' },
        { language: 'tr', translation: 'yardıma ihtiyacım var' },
        { language: 'vi', translation: 'tôi cần sự hỗ trợ' },
        { language: 'id', translation: 'saya butuh bantuan' }, // Indonesian
      ],
    },
    {
      id: '3',
      source: "I'm in danger",
      target: [
        { language: 'ar', translation: 'أنا في خطر' },
        { language: 'bn', translation: 'আমি ঝুঁকিতে আছি' },
        { language: 'es', translation: 'estoy en peligro' },
        { language: 'fr', translation: 'je suis en danger' },
        { language: 'de', translation: 'ich bin in Gefahr' },
        { language: 'hi', translation: 'मैं खतरे में हूँ' },
        { language: 'it', translation: 'sono in pericolo' },
        { language: 'ja', translation: '危険です' },
        { language: 'ko', translation: '위험에 처했습니다' },
        { language: 'pt', translation: 'estou em perigo' },
        { language: 'ru', translation: 'я в опасности' },
        { language: 'zh', translation: '我有危险' },
        { language: 'mr', translation: 'माझ्याकडून धोका आहे' },
        { language: 'fa', translation: 'من در خطر هستم' },
        { language: 'pl', translation: 'jestem w niebezpieczeństwie' },
        { language: 'pt', translation: 'estou em perigo' },
        { language: 'pa', translation: 'ਮੈਨੂੰ ਖਤਰਾ ਹੈ' },
        { language: 'ru', translation: 'я в опасности' },
        { language: 'es', translation: 'estoy en peligro' },
        { language: 'sw', translation: 'najisikia hatari' },
        { language: 'tl', translation: 'nasa panganib ako' },
        { language: 'ta', translation: 'எனக்கு ஆபத்து' },
        { language: 'te', translation: 'నాకు ఆపదలో ఉన్నాను' },
        { language: 'th', translation: 'ฉันอยู่ในอันตราย' },
        { language: 'tr', translation: 'tehlikede olduğumu söylüyorum' },
        { language: 'vi', translation: 'tôi đang gặp nguy hiểm' },
        { language: 'id', translation: 'saya dalam bahaya' }, // Indonesian
      ],
    },
  ];

  const travelPhrases = [
    {
      id: '1',
      source: 'I need a taxi.',
      target: [
        { language: 'ar', translation: 'أحتاج تاكسي' },
        { language: 'bn', translation: 'আমার একটি ট্যাক্সি দরকার' },
        { language: 'es', translation: 'Necesito un taxi' },
        { language: 'fr', translation: 'J ai besoin d un taxi' },
        { language: 'de', translation: 'Ich brauche ein Taxi' },
        { language: 'hi', translation: 'मुझे एक टैक्सी चाहिए' },
        { language: 'it', translation: 'Ho bisogno di un taxi' },
        { language: 'ja', translation: 'タクシーが必要です' },
        { language: 'ko', translation: '택시가 필요해요' },
        { language: 'pt', translation: 'Preciso de um táxi' },
        { language: 'ru', translation: 'Мне нужно такси' },
        { language: 'zh', translation: '我需要出租车' },
        { language: 'mr', translation: 'मला टॅक्सी हवी आहे' },
        { language: 'fa', translation: 'من یک تاکسی نیاز دارم' },
        { language: 'pl', translation: 'Potrzebuję taksówki' },
        { language: 'pt', translation: 'Preciso de um táxi' },
        { language: 'pa', translation: 'ਮੈਨੂੰ ਟੈਕਸੀ ਦੀ ਲੋੜ ਹੈ' },
        { language: 'ru', translation: 'Мне нужно такси' },
        { language: 'es', translation: 'Necesito un taxi' },
        { language: 'sw', translation: 'Nahitaji teksi' },
        { language: 'tl', translation: 'Kailangan ko ng taxi' },
        { language: 'ta', translation: 'எனக்கு டாக்ஸி வேண்டும்' },
        { language: 'te', translation: 'నాకు ఒక టాక్సీ కావాలి' },
        { language: 'th', translation: 'ฉันต้องการแท็กซี่' },
        { language: 'tr', translation: 'Bir taksiye ihtiyacım var' },
        { language: 'vi', translation: 'Tôi cần một chiếc taxi' },
        { language: 'id', translation: 'Saya butuh taksi' }, // Indonesian
      ],
    },
    {
      id: '2',
      source: 'I would like to order food.',
      target: [
        { language: 'ar', translation: 'أود أن أطلب الطعام' },
        { language: 'bn', translation: 'আমি খাবার অর্ডার করতে চাই' },
        { language: 'es', translation: 'Me gustaría pedir comida' },
        {
          language: 'fr',
          translation: 'Je voudrais commander de la nourriture',
        },
        { language: 'de', translation: 'Ich möchte Essen bestellen' },
        { language: 'hi', translation: 'मुझे खाना आर्डर करना है' },
        { language: 'it', translation: 'Vorrei ordinare del cibo' },
        { language: 'ja', translation: '食べ物を注文したいです' },
        { language: 'ko', translation: '음식을 주문하고 싶어요' },
        { language: 'pt', translation: 'Eu gostaria de pedir comida' },
        { language: 'ru', translation: 'Я бы хотел заказать еду' },
        { language: 'zh', translation: '我想订餐' },
        { language: 'mr', translation: 'मला आहार ऑर्डर करायचं आहे' },
        { language: 'fa', translation: 'من می‌خواهم غذا بخواهم' },
        { language: 'pl', translation: 'Chciałbym zamówić jedzenie' },
        { language: 'pt', translation: 'Eu gostaria de pedir comida' },
        { language: 'pa', translation: 'ਮੈਨੂੰ ਖਾਣਾ ਆਰਡਰ ਕਰਨਾ ਹੈ' },
        { language: 'ru', translation: 'Я бы хотел заказать еду' },
        { language: 'es', translation: 'Me gustaría pedir comida' },
        { language: 'sw', translation: 'Ninapenda kuagiza chakula' },
        { language: 'tl', translation: 'Gusto ko mag-order ng pagkain' },
        { language: 'ta', translation: 'நான் உணவு வாங்க விரும்புகிறேன்' },
        { language: 'te', translation: 'నాకు ఆకలి ఆహారం అవసరం' },
        { language: 'th', translation: 'ฉันอยากสั่งอาหาร' },
        { language: 'tr', translation: 'Yemek siparişi vermek istiyorum' },
        { language: 'vi', translation: 'Tôi muốn đặt món' },
        { language: 'id', translation: 'Saya ingin memesan makanan' }, // Indonesian
      ],
    },
    {
      id: '3',
      source: 'Where is the nearest toilet?',
      target: [
        { language: 'ar', translation: 'أين هو أقرب مرحاض؟' },
        { language: 'bn', translation: 'নিকটতম শৌচাগার কোথায়?' },
        { language: 'es', translation: '¿Dónde está el baño más cercano?' },
        {
          language: 'fr',
          translation: 'Où sont les toilettes les plus proches?',
        },
        { language: 'de', translation: 'Wo ist die nächste Toilette?' },
        { language: 'hi', translation: 'सबसे निकट सौचालय कहाँ है?' },
        { language: 'it', translation: 'Dov è il bagno più vicino?' },
        { language: 'ja', translation: '最寄りのトイレはどこですか？' },
        { language: 'ko', translation: '가장 가까운 화장실은 어디에요?' },
        { language: 'pt', translation: 'Onde fica o banheiro mais próximo?' },
        { language: 'ru', translation: 'Где ближайший туалет?' },
        { language: 'zh', translation: '最近的厕所在哪里？' },
        { language: 'mr', translation: 'सर्वात जवळचं शौचालय कुठलं आहे?' },
        { language: 'fa', translation: 'توالت نزدیکترین کجاست؟' },
        { language: 'pl', translation: 'Gdzie jest najbliższa toaleta?' },
        { language: 'pt', translation: 'Onde fica o banheiro mais próximo?' },
        { language: 'pa', translation: 'ਸਭ ਤੋਂ ਨੇੜਲਾ ਸੌਚਾਲਯ ਕਿੱਥੇ ਹੈ?' },
        { language: 'ru', translation: 'Где ближайший туалет?' },
        { language: 'es', translation: '¿Dónde está el baño más cercano?' },
        {
          language: 'sw',
          translation: 'Mahali pa choo kilicho karibu ni wapi?',
        },
        { language: 'tl', translation: 'Saan ang pinakamalapit na CR?' },
        { language: 'ta', translation: 'எங்கு எருவாயில் குளியேற வேண்டும்?' },
        { language: 'te', translation: 'అంగడి ఎక్కడ ఉంది?' },
        { language: 'th', translation: 'ห้องน้ำที่ใกล้ที่สุดอยู่ที่ไหน?' },
        { language: 'tr', translation: 'En yakın tuvalet nerede?' },
        { language: 'vi', translation: 'Nhà vệ sinh gần nhất ở đâu?' },
        { language: 'id', translation: 'Di mana toilet terdekat?' }, // Indonesian
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
    Mandarin: 'zh',
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

  // For the button when it pressed
  function impactAsync(style) {
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
  }

  // To refresh the search IMPORTANT EDIT THIS
  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      // Replace the following line with your actual data fetching logic
      await fetchData(selectedSourceLanguage, selectedTargetLanguage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setRefreshing(false);
  };

  const speakTranslation = async (text) => {
    console.log(`Speaking: ${text}`);

    try {
      await Speech.speak(text, {
        language: targetLanguage,
        pitch: 1.0,
        rate: 0.8,
      });
      console.log('Speech successful');
    } catch (error) {
      console.error('Error during speech:', error);
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
            {translations[selectedLanguage].wordBookTitle}
          </Text>

          <RNPickerSelect
            style={styles.dropdown}
            placeholder={{
              label: translations[selectedLanguage].selectTargetLang,
              value: null,
            }}
            onValueChange={(value) => {
              console.log('Selected Target Language:', value);
              setTargetLanguage(value);
              setSelectedTargetLanguage(value);
              
            }}
            items={getDropdownItems()}
          />

          {/* Common Phrases List */}
          <Text style={styles.commonTitle}>
            {translations[selectedLanguage].commonPhrasesTitle}
          </Text>
          <View style={styles.phraseTextContainer}>
            <FlatList
              data={commonPhrases}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.phraseContainer}>
                  <View style={styles.phraseTextContainer}>
                    <Text style={styles.phraseText}>{item.source}</Text>
                  </View>
                  {/* Map over the target translations based on the selected language */}
                  {item.target.map(
                    (translation) =>
                      translation.language === targetLanguage && (
                        <View
                          style={styles.phraseText2Container}
                          key={translation.language}>
                          <Text style={styles.phraseText2}>
                            {translation.translation}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              speakTranslation(translation.translation);
                              console.log(
                                'Speaker icon pressed for:',
                                translation.translation
                              );
                            }}>
                            <Image
                              source={require('./assets/speaker.png')}
                              style={styles.speakerIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      )
                  )}
                </View>
              )}
            />
          </View>

          {/* Emergency Phrases List */}
          <Text style={styles.emergencyTitle}>
            {translations[selectedLanguage].emergencyPhrasesTitle}
          </Text>
          <View style={styles.phraseTextContainer}>
            <FlatList
              data={emergencyPhrases}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.phraseContainer}>
                  <View style={styles.phraseTextContainer}>
                    <Text style={styles.phraseText}>{item.source}</Text>
                  </View>
                  {/* Map over the target translations based on the selected language */}
                  {item.target.map(
                    (translation) =>
                      translation.language === targetLanguage && (
                        <View
                          style={styles.phraseText2Container}
                          key={translation.language}>
                          <Text style={styles.phraseText2}>
                            {translation.translation}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              speakTranslation(translation.translation);
                              console.log(
                                'Speaker icon pressed for:',
                                translation.translation
                              );
                            }}>
                            <Image
                              source={require('./assets/speaker.png')}
                              style={styles.speakerIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      )
                  )}
                </View>
              )}
            />
          </View>

          {/* Travel Phrases List */}
          <Text style={styles.travelTitle}>
            {translations[selectedLanguage].travelPhrasesTitle}
          </Text>
          <View style={styles.phraseTextContainer}>
            <FlatList
              data={travelPhrases}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.phraseContainer}>
                  <View style={styles.phraseTextContainer}>
                    <Text style={styles.phraseText}>{item.source}</Text>
                  </View>
                  {/* Map over the target translations based on the selected language */}
                  {item.target.map(
                    (translation) =>
                      translation.language === targetLanguage && (
                        <View
                          style={styles.phraseText2Container}
                          key={translation.language}>
                          <Text style={styles.phraseText2}>
                            {translation.translation}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              speakTranslation(translation.translation);
                              console.log(
                                'Speaker icon pressed for:',
                                translation.translation
                              );
                            }}>
                            <Image
                              source={require('./assets/speaker.png')}
                              style={styles.speakerIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      )
                  )}
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>

      {/* Navigation Bar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Translation', { selectedLanguage }),
              impactAsync('heavy');
          }}
          style={styles.button}>
          <Image
            source={require('./assets/Translate.png')}
            style={styles.translateIcon}
          />
          <Text style={styles.buttonTextNav}>
            {translations[selectedLanguage].translationTitle}
          </Text>
        </TouchableOpacity>
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
    paddingTop: 10,
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
    marginBottom: 20,
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

  translateIcon: {
    width: 30,
    height: 30,
  },

  speakerIcon: {
    width: 30,
    height: 30,
  },

  dropdown: {
    height: 50,
    width: '80%',
    marginBottom: 10,
  },

  commonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#2c3e50',
    color: '#ffffff',
    width: '100%',
    textAlign: 'center',
  },

  emergencyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#2c3e50',
    color: '#ffffff',
    width: '100%',
    textAlign: 'center',
  },

  travelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#2c3e50',
    color: '#ffffff',
    width: '100%',
    textAlign: 'center',
  },

  phraseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 15,
  },

  phraseTextContainer: {
    flex: 1,
    width: '100%',
  },

  phraseText2Container: {
    flex: 1,
    width: '48%',
    alignItems: 'flex-end',
    paddingLeft: 10,
  },

  phraseText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
  },

  phraseText2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'right',
    marginBottom: 5,
  },
});
