import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/expo';

const TabsLayout = () => {
  const { isSignedIn } = useAuth();

    if(!isSignedIn) return <Redirect href={"/(auth)/sign-in"}/>

  return <Stack screenOptions={{headerShown: false}}/>
}

export default TabsLayout;