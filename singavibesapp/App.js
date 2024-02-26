//app.js
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';
import { LanguageProvider } from './LanguageContext';
import LanguageScreen from './LanguageScreen';
import MatchingGameScreen from './MatchingGame';
import TranslationScreen from './TranslationScreen';
import WordBookScreen from './WordBookScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <LanguageProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Language" component={LanguageScreen} />
            <Stack.Screen name="Game" component={MatchingGameScreen} />
            <Stack.Screen name="Translation" component={TranslationScreen} />
            <Stack.Screen name="WordBook" component={WordBookScreen} />
          </Stack.Navigator>
        </LanguageProvider>
    </NavigationContainer>
  );
}

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

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.title2}>SINGAVIBES</Text>
      <Text style={styles.title3}>Translation App</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          impactAsync('heavy');
          navigation.navigate('Language');
        }}>
        <Text style={styles.buttonText}>Start Translation</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2c3e50',
    paddingVertical: 12, // Increase button padding
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20, // Increase vertical margin
  },
  buttonText: {
    color: '#ecf0f1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    color: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 15,
  },
  title2: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 10,
  },
  title3: {
    fontSize: 18,
    color: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 30,
  },
});

