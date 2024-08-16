import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { AntDesign, FontAwesome5, MaterialIcons, Octicons } from '@expo/vector-icons';

const Layout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarItemStyle:{},
        headerShown: false,
        tabBarStyle: styles.TabBar,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let icon
          let index

          switch (route.name) {
            case 'Home':
              icon = <Octicons  name="home" size={25} color={focused ? 'black' : 'white'} />
              index=1
              break;
            case 'Maps':
              icon = <FontAwesome5 name="map-pin" size={25} color={focused ? 'black' : 'white'} />
              index=2
              break;
            case 'Message':
              icon = <MaterialIcons name="message" size={25} color={focused ? 'black' : 'white'} />
              index=3
              break;
            case 'Team':
              icon = <MaterialIcons name="real-estate-agent" size={25} color={focused ? 'black' : 'white'} />
              index=4
              break;
            case 'Profile':
              icon = <AntDesign name="user" size={25} color={focused ? 'black' : 'white'} />
              index=5
              break;
            default:
              icon = null
              
          }
          
          return (
            <View style={[styles.TabBarIcon, focused && styles.TabBarIconActive]}>
              {icon}
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name='Home'  />
      <Tabs.Screen name='Maps' />
      <Tabs.Screen name='Message' />
      <Tabs.Screen name='Team' />
      <Tabs.Screen name='Profile' />

    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  TabBar: {
    position: 'absolute',
    height: '10%',
    bottom: '4%',
    width: '90%',
    backgroundColor: 'black',
    borderRadius: 50,
    marginHorizontal: '5%',
    paddingHorizontal: '4%',
    alignContent:'center',
    justifyContent:'center',
    zIndex:0

  },
  TabBarIcon: {
    width: '110%',
    height: '85%',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center'

  },
  TabBarIconActive: {
    backgroundColor: 'white'
  }
});
