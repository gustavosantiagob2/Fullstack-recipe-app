import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import { useSignIn } from '@clerk/expo';
import { authStyles } from '../../assets/styles/auth.styles'
import { Image } from 'expo-image';
import { COLORS } from '@/constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from "expo-router";

const SignInScreen = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ showPassword, setShowPassword ] = useState("");
  const [ loading, setLoading ] = useState(false);

  const handleSignIn = async () => {
    if(!email || !password) {
      alert.alert("Error","Please fill in all fields.");
      return
    }

    if(!isLoaded) return;

    setLoading(true)

    try {
      const signInAttempt = await signIn.create({ identifier: email, password })

      if( signInAttempt.status === "complete" ) await setActive({session: signInAttempt.createdSessionId})
      else{
        alert.alert("Error","Sign in failed. Please try again.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }

    } catch (error) {
      Alert.alert("Error",error.errors?.[0]?.messsage || "Sign in failed.");
      console.error(JSON.stringify(error, null, 2));
    } finally{
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }} >

    <View style={authStyles.container}>
      <KeyboardAvoidingView style={authStyles.keyboardView} behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >

      <ScrollView contentContainerStyle={authStyles.scrollContent} showsVerticalScrollIndicator={false} >
        <View style={authStyles.imageContainer}>
          <Image
            source={require("../../assets/images/i1.png")}
            style={authStyles.image}
            contentFit='contain'
          />
        </View>

          <Text style={authStyles.title}>Welcome Back</Text>

          {/* Form Container */}
          <View style={authStyles.formContainer}>
            {/* Email Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder='Enter email'
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
              />
            </View>

            {/* Password Input */}
            <View style={authStyles.inputContainer}>
              <TextInput 
                style={authStyles.textInput}
                placeholder="Enter Password"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity style={authStyles.eyeButton} onPress={() => setShowPassword(!showPassword)} >
                <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={COLORS.textLight}
                />
              </TouchableOpacity>

            </View>

            {/* Button */}
            <TouchableOpacity
              style={[authStyles.authButton, loading && authStyles.buttonDisabled ]}
              onPress={handleSignIn}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={[authStyles.buttonText]}> {loading ? "Signing In..." : "Sign In"} </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <TouchableOpacity style={authStyles.linkContainer} onPress={() => router.push("/sign-up")}>
              <Text style={authStyles.linkText}> 
                Don&apos;t have an account?  
                <Text style={authStyles.link}>Sign up</Text>  
              </Text>
            </TouchableOpacity>

          </View>

        
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
    </SafeAreaView>
  )
}

export default SignInScreen