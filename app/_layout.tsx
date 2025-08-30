import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  return (
    <Stack>
      {/* <Stack.Screen name='index' options={{title:'Home'}} />
      <Stack.Screen name='about' options={{title:'About'}} /> */}
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
    </Stack>
  );
}
