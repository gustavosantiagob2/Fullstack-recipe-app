import { COLORS } from '@/constants/colors';
import { ClerkProvider } from '@clerk/expo'
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

if(!publishableKey){
  throw new Error('Add your Clerk PublishableKey key to the .env file')
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} >
      <SafeAreaProvider style={{ flex: 1, backgroundColor: COLORS.background }} >
          <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
