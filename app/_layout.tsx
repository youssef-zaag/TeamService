import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { Modal, TouchableOpacity,StyleSheet } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export const unstable_settings = {
  // Ensure  reloading on `/modal` keeps a back button present.
  initialRouteName:'(tabs)',
};



export default function RootLayout() {
  const [loaded, error] = useFonts({
    'mon': require('../assets/fonts/JosefinSans-Medium.ttf'),
    'mon-s': require('../assets/fonts/Montserrat-Bold.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-ssb': require('../assets/fonts/Montserrat-SemiBoldItalic.ttf'),

    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <BottomSheetModalProvider>

    <Stack>
          <Stack.Screen name="Azerty"  options={{ headerShown: false,
            presentation:'transparentModal'
            
           }}  />
          <Stack.Screen name="(tabs)"  options={{ headerShown: false }}  />
          <Stack.Screen  name='affairs/[id]' options={{ headerTitle:'',
          headerTintColor:'transparent',
          headerTransparent:true,
          presentation:'modal',

          headerRight:()=>(
            <TouchableOpacity style={styles.head}><MaterialCommunityIcons name="cube-outline" size={40} color="white" /></TouchableOpacity>

          
          ),
          headerLeft:()=>(
            <TouchableOpacity onPress={()=>router.back()} style={styles.head}><Entypo name="chevron-left" size={40} color="white" /></TouchableOpacity>

          )



           } }/>
          <Stack.Screen name="sortBy/SortBy"  options={{ headerShown: false,
            presentation:'modal',
            animation:'slide_from_right'
           }}  />




    </Stack>
    </BottomSheetModalProvider>
  );
}


const styles = StyleSheet.create({
  head:{width:60,height:60,borderRadius:50,alignItems:'center',justifyContent:'center',marginTop:10},
  blurContainer: {
    borderRadius: 50,
  },
})